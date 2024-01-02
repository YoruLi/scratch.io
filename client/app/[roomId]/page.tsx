import DisconnectedDialog from "@/components/ui/disconnected-dialog";
import DrawingCanvas from "@/components/ui/canvas";

import React from "react";

export default function page() {
  return (
    <>
      <DisconnectedDialog />
      <DrawingCanvas />
    </>
  );
}
