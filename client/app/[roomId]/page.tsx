import DisconnectedDialog from "@/components/disconnected-dialog";
import DrawingCanvas from "@/components/canvas";

import React from "react";

export default function page() {
  return (
    <>
      <DisconnectedDialog />
      <DrawingCanvas />
    </>
  );
}
