export type UserRole =
  | "super_admin"
  | "admin"
  | "warden"
  | "staff"
  | "student"
  | "parent";

export type ComplaintStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed"
  | "escalated";

export type ComplaintPriority = "low" | "medium" | "high" | "critical";

export type ComplaintCategory =
  | "infrastructure"
  | "water"
  | "electricity"
  | "maintenance"
  | "room"
  | "mess"
  | "other";

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "overdue" | "partial";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string | null;
  phone?: string | null;
  hostel_id?: string | null;
  block_id?: string | null;
  room_id?: string | null;
  student_id?: string | null;
  parent_of_student_id?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Hostel {
  id: string;
  name: string;
  code: string;
  address?: string;
  total_blocks: number;
  curfew_time: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  check_in?: string;
  check_out?: string;
  status: "present" | "absent" | "late" | "on_leave";
  is_late_entry: boolean;
  date: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  block_id?: string;
  floor?: number;
  room_id?: string;
  reported_by: string;
  assigned_to?: string;
  image_urls?: string[];
  created_at: string;
  resolved_at?: string;
}

export interface LeaveRequest {
  id: string;
  student_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: LeaveStatus;
  is_emergency: boolean;
  parent_consent_url?: string;
  approved_by?: string;
  created_at: string;
}

export interface FeeRecord {
  id: string;
  student_id: string;
  type: "hostel_rent" | "mess_fee" | "security_deposit" | "other";
  amount: number;
  due_date: string;
  status: PaymentStatus;
  invoice_number?: string;
  paid_at?: string;
}

export interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  occupancyRate: number;
  pendingFees: number;
  openComplaints: number;
  pendingLeaves: number;
  lateEntriesToday: number;
  staffOnDuty: number;
}
