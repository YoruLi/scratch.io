import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: React.ReactNode;
}

export default function CopyButton({ value, children, className }: Props) {
  const [hasCopied, setHasCopied] = React.useState(false);

  async function copyToClipboar(value: string) {
    try {
      const clipItem = new ClipboardItem({
        "text/plan": new Blob([value], { type: "text/plain" }),
      });
      await window.navigator.clipboard.write([clipItem]);
    } catch (error) {
      await window.navigator.clipboard.writeText(value);
    }
    toast.success("Copied succesfully");
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => setHasCopied(false), 1000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);
  return (
    <Button
      type="button"
      variant={"default"}
      className={cn("h-fit rounded-sm p-0 bg-transparent ", className)}
      onClick={() => {
        copyToClipboar(value);
        setHasCopied(true);
      }}
    >
      {children}
      {hasCopied ? <Check className="size-4 mx-2" /> : <Copy className="size-4 mx-2" />}
    </Button>
  );
}
