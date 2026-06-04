import type { UserRole } from "@/types";

export const APP_NAME = "HostelHR";
export const APP_DESCRIPTION =
  "Enterprise Hostel Human Resource Management System";

export const CURFEW_DEFAULT = "22:00";

export const COMPLAINT_CATEGORIES = [
  { value: "infrastructure", label: "Infrastructure" },
  { value: "water", label: "Water" },
  { value: "electricity", label: "Electricity" },
  { value: "maintenance", label: "Maintenance" },
  { value: "room", label: "Room" },
  { value: "mess", label: "Mess" },
  { value: "other", label: "Other" },
] as const;

export const COMPLAINT_STATUSES = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "escalated", label: "Escalated" },
] as const;

export const COMPLAINT_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
] as const;

export const DEMO_USERS: Array<{
  email: string;
  password: string;
  role: UserRole;
  name: string;
}> = [
  {
    email: "superadmin@hostelhr.com",
    password: "demo1234",
    role: "super_admin",
    name: "Super Admin",
  },
  {
    email: "admin@hostelhr.com",
    password: "demo1234",
    role: "admin",
    name: "Hostel Admin",
  },
  {
    email: "warden@hostelhr.com",
    password: "demo1234",
    role: "warden",
    name: "Chief Warden",
  },
  {
    email: "staff@hostelhr.com",
    password: "demo1234",
    role: "staff",
    name: "Maintenance Staff",
  },
  {
    email: "student@hostelhr.com",
    password: "demo1234",
    role: "student",
    name: "Rahul Sharma",
  },
  {
    email: "parent@hostelhr.com",
    password: "demo1234",
    role: "parent",
    name: "Mr. Sharma",
  },
];
