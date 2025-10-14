"use client";

import * as React from "react";
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile, open } = useSidebar(); // make sure sidebar exposes `open`
  const [activeTeam] = React.useState(teams[0]);

  if (!activeTeam) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div
          className={`flex gap-2 items-center transition-all duration-300 ease-in-out ${
            open ? "px-3 py-2 w-[200px]" : "px-1 py-1 w-[60px]"
          }`}
        >
          {open === true ? (
            <span className="p-2 border border-white/50 rounded-sm bg-accent/50">
              <img
                src="/favicon.svg"
                alt="logo"
                className={`transition-all duration-300 ${
                  open ? "w-25 h-auto" : "w-10 h-auto"
                }`}
              />
            </span>
          ) : (
            <span className="rounded-sm ">
              <img
                src="/logo-solo.svg"
                alt="logo"
                className={`transition-all duration-300 ${
                  open ? "w-10 h-auto" : "w-5 h-auto"
                }`}
              />
            </span>
          )}
          {open && (
            <span>
              <h1 className="text"></h1>
              <p className="mt-[-2] text-sm"></p>
            </span>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
