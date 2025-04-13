"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/voice-assistant";

  return (
    <div className="relative min-h-screen flex flex-col">
      {!hideNavbar && (
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b sm:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold flex items-center">
              <span className="text-primary">Groq</span>It
            </span>
          </div>
        </div>
      )}
      {!hideNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
