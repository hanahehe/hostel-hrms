import type { UserRole } from "@/types";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calendar,
  ClipboardList,
  CreditCard,
  Home,
  MessageSquareWarning,
  Settings,
  Shield,
  Soup,
  UserCheck,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import type { Permission } from "@/lib/permissions";
import { hasPermission } from "@/lib/permissions";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  permission?: Permission;
  roles?: UserRole[];
}

const ALL_NAV: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: Home },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: UserCheck,
    permission: "attendance.view",
  },
  {
    title: "Fees & Rent",
    href: "/dashboard/fees",
    icon: CreditCard,
    permission: "fees.view",
  },
  {
    title: "Leave",
    href: "/dashboard/leaves",
    icon: ClipboardList,
    permission: "leaves.view",
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
    permission: "calendar.manage",
  },
  {
    title: "Complaints",
    href: "/dashboard/complaints",
    icon: MessageSquareWarning,
    permission: "complaints.view",
  },
  {
    title: "Staff",
    href: "/dashboard/staff-management",
    icon: Users,
    permission: "staff.manage",
  },
  {
    title: "Payroll",
    href: "/dashboard/payroll",
    icon: Wallet,
    permission: "payroll.manage",
  },
  {
    title: "Mess",
    href: "/dashboard/mess",
    icon: UtensilsCrossed,
    permission: "mess.manage",
  },
  {
    title: "Rooms",
    href: "/dashboard/rooms",
    icon: Building2,
    permission: "rooms.manage",
  },
  {
    title: "Visitors",
    href: "/dashboard/visitors",
    icon: Shield,
    permission: "visitors.manage",
  },
  {
    title: "Emergency",
    href: "/dashboard/emergency",
    icon: AlertTriangle,
    permission: "emergency.manage",
  },
  {
    title: "AI Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    permission: "analytics.view",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["super_admin", "admin"],
  },
];

export function getNavItemsForRole(role: UserRole): NavItem[] {
  return ALL_NAV.filter((item) => {
    if (item.roles && !item.roles.includes(role)) return false;
    if (item.permission && !hasPermission(role, item.permission)) {
      if (role === "student" && item.href === "/dashboard/leaves") {
        return hasPermission(role, "leaves.request");
      }
      if (role === "student" && item.href === "/dashboard/complaints") {
        return hasPermission(role, "complaints.create");
      }
      return false;
    }
    return true;
  });
}

export const STUDENT_NAV: NavItem[] = [
  { title: "My Dashboard", href: "/dashboard/student", icon: Home },
  { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck },
  { title: "Fees", href: "/dashboard/fees", icon: CreditCard },
  { title: "Leave", href: "/dashboard/leaves", icon: ClipboardList },
  { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { title: "Complaints", href: "/dashboard/complaints", icon: MessageSquareWarning },
  { title: "Mess", href: "/dashboard/mess", icon: Soup },
];

export const PARENT_NAV: NavItem[] = [
  { title: "Parent Portal", href: "/dashboard/parent", icon: Home },
  { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck },
  { title: "Fees", href: "/dashboard/fees", icon: CreditCard },
  { title: "Leave Approvals", href: "/dashboard/leaves", icon: ClipboardList },
];

export const WARDEN_NAV: NavItem[] = [
  { title: "Warden Desk", href: "/dashboard/warden", icon: Home },
  { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck },
  { title: "Leave", href: "/dashboard/leaves", icon: ClipboardList },
  { title: "Complaints", href: "/dashboard/complaints", icon: MessageSquareWarning },
  { title: "Rooms", href: "/dashboard/rooms", icon: Building2 },
  { title: "Visitors", href: "/dashboard/visitors", icon: Shield },
  { title: "Emergency", href: "/dashboard/emergency", icon: AlertTriangle },
  { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
];

export const STAFF_NAV: NavItem[] = [
  { title: "Staff Desk", href: "/dashboard/staff", icon: Home },
  { title: "Complaints", href: "/dashboard/complaints", icon: MessageSquareWarning },
  { title: "Mess", href: "/dashboard/mess", icon: UtensilsCrossed },
  { title: "Visitors", href: "/dashboard/visitors", icon: Shield },
  { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
];

export function resolveNavigation(role: UserRole): NavItem[] {
  switch (role) {
    case "student":
      return STUDENT_NAV;
    case "parent":
      return PARENT_NAV;
    case "warden":
      return WARDEN_NAV;
    case "staff":
      return STAFF_NAV;
    default:
      return getNavItemsForRole(role);
  }
}
