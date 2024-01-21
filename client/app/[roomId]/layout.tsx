import CopyRoomId from "@/components/copy-roomId";
import { MemberList } from "@/components/member-list";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const containerRef = React.useRef<HTMLDivElement>(null);

  // const [adjustedScale, setAdjustedScale] = React.useState<number>(1);

  // React.useEffect(() => {
  //   const setTransform = () => {
  //     if (!containerRef.current) {
  //       return;
  //     }

  //     const newScale = calculateNewScale();

  //     setAdjustedScale(newScale);

  //     containerRef.current.style.transform = `scale(${newScale})`;
  //   };

  //   const calculateNewScale = () => {
  //     const windowWidth = window.innerWidth;
  //     const newScale = windowWidth / 1000;
  //     return Math.max(Math.min(newScale, 1), 0.1);
  //   };

  //   window.addEventListener("resize", setTransform);

  //   return () => {
  //     window.removeEventListener("resize", setTransform);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (containerRef.current) {
  //     const scale = Math.max(adjustedScale, 0.1); // Garantiza que el valor no sea menor a 0.1
  //     containerRef.current.style.transition = "transform 0.2s ease-in-out"; // Ajusta la duración de la transición
  //     containerRef.current.style.transform = `scale(${scale})`;
  //   }
  // }, [adjustedScale]);
  return (
    <>
      <div
        // ref={containerRef}
        className="h-[calc(100dvh)] lg:p-6 grid  w-full place-items-center"
      >
        <main className="h-[40rem] my-auto w-full xl:min-w-[900px] flex-shrink flex-grow flex flex-col gap-2 relative">
          {children}
        </main>

        <CopyRoomId />
      </div>
    </>
  );
}
