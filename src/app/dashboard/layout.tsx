import React from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar className="border-r">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
