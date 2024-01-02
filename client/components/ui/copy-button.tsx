import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: React.ReactNode;
  // Otras props personalizadas que puedas necesitar
}

export default function CopyButton({ value, children, className }: Props) {
  const [hasCopied, setHasCopied] = React.useState(false);

  function copyToClipboar(value: string) {
    navigator.clipboard.writeText(value);
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => setHasCopied(false), 1000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);
  return (
    <Button
      type="button"
      variant={"default"}
      className={cn("h-fit rounded-sm p-0 bg-transparent", className)}
      onClick={() => {
        copyToClipboar(value);
        setHasCopied(true);
      }}
    >
      {children}
      {hasCopied ? (
        <Check className="size-4 mx-2" />
      ) : (
        <Copy className="size-4 mx-2" />
      )}
    </Button>
  );
}
