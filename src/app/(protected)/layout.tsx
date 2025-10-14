"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.replace("/login");
  }, [router]);
  const pathname = usePathname();

  // 🔹 Break the path into parts → ["protected","MasterData","Industries"]
  const segments = pathname
    .split("/")
    .filter((seg) => seg && seg !== "(protected)" && seg !== "(auth)");

  return (
    <SidebarProvider>
      {/* ✅ Sidebar stays fixed */}
      <AppSidebar />

      {/* ✅ Main content area */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 text-[#cc951f] hover:bg-[#cc951f]" />
          <Separator
            orientation="vertical"
            className="mr-2 bg-white/50 data-[orientation=vertical]:h-4"
          />

          {/* 🔹 Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              {segments
                // ✅ keep only alphabetic segments (letters only)
                .filter((seg) => /^[A-Za-z]+$/.test(seg))
                .map((segment, index, filteredSegments) => {
                  const href =
                    "/" + filteredSegments.slice(0, index + 1).join("/");
                  const label =
                    segment.charAt(0).toUpperCase() + segment.slice(1);
                  const isLast = index === filteredSegments.length - 1;

                  return (
                    <BreadcrumbItem key={href}>
                      <BreadcrumbLink asChild>
                        <Link href={href}>
                          <span
                            className={
                              isLast ? "font-semibold" : "text-muted-foreground"
                            }
                          >
                            {label}
                          </span>
                        </Link>
                      </BreadcrumbLink>
                      {!isLast && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                  );
                })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ✅ Dynamic page content gets injected here */}
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
