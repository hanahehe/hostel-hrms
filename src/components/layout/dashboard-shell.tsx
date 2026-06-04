"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveNavigation } from "@/lib/navigation";
import type { UserRole } from "@/types";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardShellProps {
  children: React.ReactNode;
  role: UserRole;
  userName: string;
  title: string;
  subtitle?: string;
}

export function DashboardShell({
  children,
  role,
  userName,
  title,
  subtitle,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = resolveNavigation(role);

  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          "fixed inset-0 z-20 bg-black/50 lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <div className={cn("lg:block", mobileOpen ? "block" : "hidden lg:block")}>
        <Sidebar
          navItems={navItems}
          role={role}
          userName={userName}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
