"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  ClipboardList,
  CreditCard,
  Clock,
  MessageSquareWarning,
  QrCode,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatsCardIcon =
  | "users"
  | "user-check"
  | "credit-card"
  | "message-square-warning"
  | "clock"
  | "user-x"
  | "qr-code"
  | "clipboard-list"
  | "brain"
  | "trending-up"
  | "alert-triangle";

const ICON_MAP: Record<StatsCardIcon, LucideIcon> = {
  users: Users,
  "user-check": UserCheck,
  "credit-card": CreditCard,
  "message-square-warning": MessageSquareWarning,
  clock: Clock,
  "user-x": UserX,
  "qr-code": QrCode,
  "clipboard-list": ClipboardList,
  brain: Brain,
  "trending-up": TrendingUp,
  "alert-triangle": AlertTriangle,
};

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: StatsCardIcon;
  trend?: { value: number; label: string };
  className?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  delay = 0,
}: StatsCardProps) {
  const Icon = ICON_MAP[icon];
  const isPositive = trend && trend.value >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {subtitle ? (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
          {trend ? (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                isPositive ? "text-emerald-600" : "text-red-500"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {trend.value}% {trend.label}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-80" />
    </motion.div>
  );
}
