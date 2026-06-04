"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, ChevronLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { ROLE_LABELS } from "@/lib/permissions";
import type { NavItem } from "@/lib/navigation";
import type { UserRole } from "@/types";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  navItems: NavItem[];
  role: UserRole;
  userName: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  navItems,
  role,
  userName,
  collapsed = false,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full flex-col border-r border-border bg-card/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{APP_NAME}</p>
            <p className="truncate text-xs text-muted-foreground">{ROLE_LABELS[role]}</p>
          </div>
        ) : null}
        {onToggle ? (
          <Button variant="ghost" size="icon" className="shrink-0" onClick={onToggle}>
            <ChevronLeft
              className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
            />
          </Button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.span
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed ? <span className="truncate">{item.title}</span> : null}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        {!collapsed ? (
          <div className="mb-3 rounded-lg bg-muted/50 px-3 py-2">
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{ROLE_LABELS[role]}</p>
          </div>
        ) : null}
        <form action="/api/auth/logout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className={cn("w-full justify-start gap-3", collapsed && "justify-center px-0")}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed ? "Sign out" : null}
          </Button>
        </form>
      </div>
    </aside>
  );
}
