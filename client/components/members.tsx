import React from "react";
import { Sheet, SheetHeader, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Palette, User } from "lucide-react";
import { MemberList } from "./member-list";

export default function Members() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open right panel" className="z-20">
          <User size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent className="lg:w-[20rem] w-[80%] p-0 bg-slate-800 border-none !text-muted">
        <div className="p-4 space-y-2  relative w-full">
          <span className="text-white">Members list</span>
          <MemberList />
        </div>
      </SheetContent>
    </Sheet>
  );
}
