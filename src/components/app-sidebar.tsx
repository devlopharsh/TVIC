"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  NotepadText,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  DatabaseZap,
  LayoutDashboard,
  UserStar,
  Users,
  Cog,
  Newspaper,
  SquarePen,
  ServerCog,
  ScrollText,
  MessageCircleMore,
  BellRing,
  ScanLine,
  Database,
  ClipboardPlus,
  OctagonAlert,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    username: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Inspection",
      url: "/Inspection",
      icon: ScanLine,
      items: [],
    },
    {
      title: "Database",
      url: "/Database",
      icon: Database,
      items: [],
    },
    {
      title: "Teams",
      url: "/Teams",
      icon: Users,
      items: [],
    },
    {
      title: "Alerts",
      url: "/WhatsappReply",
      icon: OctagonAlert ,
      items: [],
    },
    {
      title: "Reports",
      url: "/Reports",
      icon: ClipboardPlus,
      items: [],
    },
    {
      title: "Settings",
      url: "/Settings",
      icon: Cog,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="text-[#fff2d5]" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
