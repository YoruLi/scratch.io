import React from "react";
import Badge from "./ui/badge";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { Trash, Trash2 } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

interface Props {
  clear: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}
export default function ClearButton({ clear, canvasRef }: Props) {
  const { roomId } = useParams();
  const handleClearCanvas = () => {
    socket.emit("client:add-undo-point-canvas", {
      roomId,
      undoPoint: canvasRef.current?.toDataURL(),
    });
    clear();
    socket.emit("client:clear", roomId);
  };

  useHotkeys("c", handleClearCanvas);

  React.useEffect(() => {
    socket.on("server:clear", clear);

    return () => {
      socket.off("server:clear");
    };
  }, [clear]);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded focus-within:z-10 p-2"
              onClick={handleClearCanvas}
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <Badge className="keyboard">C</Badge>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
