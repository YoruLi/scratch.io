import { Undo2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Badge from "./ui/badge";
import { socket } from "@/lib/socket";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useHotkeys } from "react-hotkeys-hook";
interface UndoButtonProps {
  undo: (lastUndoPoint: string) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function UndoButton({ undo, canvasRef }: UndoButtonProps) {
  const { roomId } = useParams();

  const undoCanvas = () => {
    socket.emit("client:get-last-undo-point-canvas", roomId);
  };

  useHotkeys("ctrl + z", undoCanvas);

  React.useEffect(() => {
    socket.on("server:last-undo-point-canvas", (lastUndoPoint: string) => {
      undo(lastUndoPoint);
      socket.emit("client:undo-canvas", {
        canvasState: lastUndoPoint,
        roomId,
      });
      socket.emit("client:add-redo-point-canvas", {
        roomId,
        redoPoint: canvasRef.current?.toDataURL(),
      });

      socket.emit("client:delete-last-undo-point-canvas", roomId);
    });
    //  ! i forgot remove the useEffect clear outside of the function xd
    return () => {
      socket.off("server:last-undo-point-canvas");
    };
  }, [roomId, undo, canvasRef]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded focus-within:z-10 p-2"
              onClick={undoCanvas}
            >
              <Undo2 />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <Badge className=" keyboard">Ctrl + z</Badge>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
