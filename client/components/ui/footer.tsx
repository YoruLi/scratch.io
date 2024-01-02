import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 mx-auto py-5  w-full">
      <p className="text-sm text-muted-foreground text-center ">
        Crafted by{" "}
        <a
          href="https://twitter.com"
          target="__blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          YoruLi
        </a>
        . The source code is on{" "}
        <a
          href="https://github.com/yoruLi/pixel-app"
          target="__blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
