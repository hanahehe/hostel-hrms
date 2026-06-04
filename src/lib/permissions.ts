import type { UserRole } from "@/types";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 100,
  admin: 80,
  warden: 60,
  staff: 40,
  parent: 20,
  student: 10,
};

export type Permission =
  | "users.manage"
  | "hostels.manage"
  | "attendance.view"
  | "attendance.manage"
  | "fees.view"
  | "fees.manage"
  | "leaves.view"
  | "leaves.approve"
  | "leaves.request"
  | "complaints.view"
  | "complaints.manage"
  | "complaints.create"
  | "staff.manage"
  | "payroll.manage"
  | "mess.manage"
  | "rooms.manage"
  | "visitors.manage"
  | "emergency.manage"
  | "analytics.view"
  | "calendar.manage"
  | "audit.view";

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    "users.manage",
    "hostels.manage",
    "attendance.view",
    "attendance.manage",
    "fees.view",
    "fees.manage",
    "leaves.view",
    "leaves.approve",
    "complaints.view",
    "complaints.manage",
    "staff.manage",
    "payroll.manage",
    "mess.manage",
    "rooms.manage",
    "visitors.manage",
    "emergency.manage",
    "analytics.view",
    "calendar.manage",
    "audit.view",
  ],
  admin: [
    "hostels.manage",
    "attendance.view",
    "attendance.manage",
    "fees.view",
    "fees.manage",
    "leaves.view",
    "leaves.approve",
    "complaints.view",
    "complaints.manage",
    "staff.manage",
    "payroll.manage",
    "mess.manage",
    "rooms.manage",
    "visitors.manage",
    "emergency.manage",
    "analytics.view",
    "calendar.manage",
  ],
  warden: [
    "attendance.view",
    "attendance.manage",
    "leaves.view",
    "leaves.approve",
    "complaints.view",
    "complaints.manage",
    "rooms.manage",
    "visitors.manage",
    "emergency.manage",
    "calendar.manage",
    "mess.manage",
  ],
  staff: [
    "attendance.view",
    "complaints.view",
    "complaints.manage",
    "mess.manage",
    "visitors.manage",
    "calendar.manage",
  ],
  student: [
    "attendance.view",
    "fees.view",
    "leaves.request",
    "complaints.create",
    "complaints.view",
    "calendar.manage",
  ],
  parent: [
    "attendance.view",
    "fees.view",
    "leaves.view",
    "leaves.approve",
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canAccessRoute(role: UserRole, path: string): boolean {
  const routePermissions: Record<string, Permission[]> = {
    "/dashboard/users": ["users.manage"],
    "/dashboard/payroll": ["payroll.manage"],
    "/dashboard/staff": ["staff.manage"],
    "/dashboard/analytics": ["analytics.view"],
    "/dashboard/audit": ["audit.view"],
    "/dashboard/complaints": ["complaints.view", "complaints.create"],
    "/dashboard/leaves": ["leaves.view", "leaves.request"],
    "/dashboard/fees": ["fees.view"],
    "/dashboard/attendance": ["attendance.view"],
    "/dashboard/rooms": ["rooms.manage"],
    "/dashboard/mess": ["mess.manage"],
    "/dashboard/visitors": ["visitors.manage"],
    "/dashboard/emergency": ["emergency.manage"],
    "/dashboard/calendar": ["calendar.manage"],
  };

  for (const [route, perms] of Object.entries(routePermissions)) {
    if (path.startsWith(route)) {
      return perms.some((p) => hasPermission(role, p));
    }
  }
  return true;
}

export function getDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    super_admin: "/dashboard",
    admin: "/dashboard",
    warden: "/dashboard/warden",
    staff: "/dashboard/staff",
    student: "/dashboard/student",
    parent: "/dashboard/parent",
  };
  return paths[role];
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  warden: "Warden",
  staff: "Staff",
  student: "Student",
  parent: "Parent",
};
