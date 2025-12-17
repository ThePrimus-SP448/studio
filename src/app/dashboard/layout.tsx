import React from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { PortfolioProvider } from "@/context/portfolio-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </PortfolioProvider>
  );
}
