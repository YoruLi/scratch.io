import { Redo2 } from "lucide-react";
import React from "react";
import Badge from "./badge";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "./button";
import { useHotkeys } from "react-hotkeys-hook";

export default function RedoButton({
  redo,
}: {
  redo: (lastRedoPoint: string) => void;
}) {
  const { roomId } = useParams();

  const redoCanvas = () => {
    socket.emit("client:get-last-redo-point-canvas", roomId);
  };

  useHotkeys("ctrl + x", redoCanvas);

  React.useEffect(() => {
    socket.on("server:last-redo-point-canvas", (lastRedoPoint: string) => {
      if (!lastRedoPoint) return;

      redo(lastRedoPoint);
      socket.emit("client:redo-canvas", {
        canvasState: lastRedoPoint,
        roomId,
      });

      socket.emit("client:delete-last-redo-point-canvas", roomId);
    });

    return () => {
      socket.off("server:last-redo-point-canvas");
    };
  }, [roomId, redo]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded focus-within:z-10 p-2"
              onClick={redoCanvas}
            >
              <Redo2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Badge className="keyboard">Ctrl + x</Badge>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
