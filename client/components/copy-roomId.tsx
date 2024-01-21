"use client";
import React from "react";

import { useParams } from "next/navigation";
import CopyButton from "./copy-button";

export default function CopyRoomId() {
  const { roomId } = useParams();

  return (
    <div className="fixed bottom-2 right-4">
      <CopyButton
        className="text-white hover:bg-blend-multiply  py-1.5 px-2  bg-main rounded"
        value={roomId as string}
      >
        Copy RoomId
      </CopyButton>
    </div>
  );
}
