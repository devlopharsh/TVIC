"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API } from "@/utils/api";

export function NavUser({
  user,
  loading = false,
}: {
  user: {
    username: string;
    email: string;
    avatar?: string;
  } | null;
  loading?: boolean;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  async function logout() {
    try {
      const response = await API.post("/auth/admin/logout");
      if (!response) {
        console.log("error", response);
        toast.error("something went wrong");
      } else {
        toast.success("logged out successfully");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in logging out");
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar */}
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.avatar ? (
                  <AvatarImage
                    src={user.avatar}
                    alt={user.username || "User"}
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* User Info */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                {loading ? (
                  <>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </>
                ) : user ? (
                  <>
                    <span className="truncate font-medium">
                      {user.username}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">Guest</span>
                    <span className="truncate text-xs">guest@example.com</span>
                  </>
                )}
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.avatar ? (
                    <AvatarImage
                      src={user.avatar}
                      alt={user.username || "User"}
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {loading ? (
                    <>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </>
                  ) : user ? (
                    <>
                      <span className="truncate font-medium">
                        {user.username}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </>
                  ) : (
                    <>
                      <span className="truncate font-medium">Guest</span>
                      <span className="truncate text-xs">
                        guest@example.com
                      </span>
                    </>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer" >
                <LogOut />
                Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
