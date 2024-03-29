import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden overflow-y-auto scroll-smooth`}>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "linear-gradient(128deg, #171927 46%, #0f0d13 78%)",
              color: "#3ecb8f",
            },
          }}
        />
      </body>
    </html>
  );
}
