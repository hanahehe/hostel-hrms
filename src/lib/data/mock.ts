import type {
  AttendanceRecord,
  Complaint,
  DashboardStats,
  FeeRecord,
  LeaveRequest,
} from "@/types";

export const mockDashboardStats: DashboardStats = {
  totalStudents: 1248,
  presentToday: 1189,
  occupancyRate: 94.2,
  pendingFees: 342000,
  openComplaints: 23,
  pendingLeaves: 12,
  lateEntriesToday: 8,
  staffOnDuty: 45,
};

export const mockAttendanceTrend = [
  { date: "Mon", present: 1180, absent: 68, late: 12 },
  { date: "Tue", present: 1195, absent: 53, late: 8 },
  { date: "Wed", present: 1178, absent: 70, late: 15 },
  { date: "Thu", present: 1201, absent: 47, late: 6 },
  { date: "Fri", present: 1189, absent: 59, late: 8 },
  { date: "Sat", present: 1156, absent: 92, late: 4 },
  { date: "Sun", present: 1142, absent: 106, late: 2 },
];

export const mockOccupancyByBlock = [
  { block: "Block A", occupied: 312, capacity: 320 },
  { block: "Block B", occupied: 298, capacity: 320 },
  { block: "Block C", occupied: 305, capacity: 320 },
  { block: "Block D", occupied: 274, capacity: 288 },
];

export const mockFeeAnalytics = [
  { month: "Jan", collected: 4200000, pending: 180000 },
  { month: "Feb", collected: 4350000, pending: 220000 },
  { month: "Mar", collected: 4100000, pending: 342000 },
  { month: "Apr", collected: 4480000, pending: 95000 },
];

export const mockComplaintAnalytics = [
  { category: "Water", count: 45 },
  { category: "Electricity", count: 32 },
  { category: "Room", count: 28 },
  { category: "Mess", count: 18 },
  { category: "Maintenance", count: 52 },
];

export const mockComplaints: Complaint[] = [
  {
    id: "cmp-001",
    title: "Water leakage in Block B - Floor 3",
    description: "Continuous leakage near bathroom 3B-12 since morning.",
    category: "water",
    status: "open",
    priority: "high",
    block_id: "block-b",
    floor: 3,
    reported_by: "student-001",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "cmp-002",
    title: "AC not working in Room 2A-08",
    description: "Air conditioning unit stopped working yesterday evening.",
    category: "maintenance",
    status: "in_progress",
    priority: "medium",
    block_id: "block-a",
    floor: 2,
    reported_by: "student-002",
    assigned_to: "staff-001",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "cmp-003",
    title: "Mess food quality issue",
    description: "Multiple students reported stale food during dinner.",
    category: "mess",
    status: "escalated",
    priority: "critical",
    reported_by: "student-003",
    assigned_to: "staff-002",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "cmp-004",
    title: "Broken window latch - Room 4C-15",
    description: "Window latch broken, security concern.",
    category: "room",
    status: "resolved",
    priority: "medium",
    block_id: "block-c",
    floor: 4,
    reported_by: "student-004",
    assigned_to: "staff-001",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    resolved_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "lv-001",
    student_id: "stu-001",
    start_date: "2026-06-10",
    end_date: "2026-06-12",
    reason: "Family function",
    status: "pending",
    is_emergency: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "lv-002",
    student_id: "stu-002",
    start_date: "2026-06-05",
    end_date: "2026-06-05",
    reason: "Medical emergency",
    status: "approved",
    is_emergency: true,
    approved_by: "warden-001",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const mockFees: FeeRecord[] = [
  {
    id: "fee-001",
    student_id: "stu-001",
    type: "hostel_rent",
    amount: 15000,
    due_date: "2026-06-15",
    status: "pending",
    invoice_number: "INV-2026-0342",
  },
  {
    id: "fee-002",
    student_id: "stu-001",
    type: "mess_fee",
    amount: 4500,
    due_date: "2026-06-10",
    status: "overdue",
    invoice_number: "INV-2026-0341",
  },
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: "att-001",
    student_id: "stu-001",
    check_in: "2026-06-03T18:45:00Z",
    status: "present",
    is_late_entry: false,
    date: "2026-06-03",
  },
  {
    id: "att-002",
    student_id: "stu-002",
    check_in: "2026-06-03T22:35:00Z",
    status: "late",
    is_late_entry: true,
    date: "2026-06-03",
  },
];

export const mockCalendarEvents = [
  {
    id: "evt-1",
    title: "Hostel Fee Due",
    type: "fee",
    date: "2026-06-15",
    color: "#f59e0b",
  },
  {
    id: "evt-2",
    title: "Block A Maintenance",
    type: "maintenance",
    date: "2026-06-08",
    color: "#3b82f6",
  },
  {
    id: "evt-3",
    title: "Annual Sports Day",
    type: "event",
    date: "2026-06-20",
    color: "#10b981",
  },
  {
    id: "evt-4",
    title: "Curfew Extension - Exam Week",
    type: "announcement",
    date: "2026-06-12",
    color: "#8b5cf6",
  },
];

export const mockStaff = [
  {
    id: "staff-001",
    name: "Rajesh Kumar",
    role: "Maintenance",
    shift: "Morning",
    status: "on_duty",
    department: "Infrastructure",
  },
  {
    id: "staff-002",
    name: "Priya Nair",
    role: "Mess Supervisor",
    shift: "Evening",
    status: "on_duty",
    department: "Mess",
  },
  {
    id: "staff-003",
    name: "Amit Singh",
    role: "Security",
    shift: "Night",
    status: "off_duty",
    department: "Security",
  },
];

export const mockMealSchedule = [
  { meal: "Breakfast", time: "7:00 AM - 9:00 AM", attendance: 892 },
  { meal: "Lunch", time: "12:00 PM - 2:00 PM", attendance: 1104 },
  { meal: "Snacks", time: "4:30 PM - 5:30 PM", attendance: 756 },
  { meal: "Dinner", time: "7:30 PM - 9:30 PM", attendance: 1189 },
];

export const mockRooms = [
  {
    id: "room-001",
    number: "3B-12",
    block: "Block B",
    floor: 3,
    capacity: 2,
    occupied: 2,
    status: "full",
  },
  {
    id: "room-002",
    number: "2A-08",
    block: "Block A",
    floor: 2,
    capacity: 2,
    occupied: 1,
    status: "partial",
  },
  {
    id: "room-003",
    number: "4C-15",
    block: "Block C",
    floor: 4,
    capacity: 3,
    occupied: 0,
    status: "vacant",
  },
];

export const mockVisitors = [
  {
    id: "vis-001",
    name: "Mrs. Sharma",
    visiting: "Rahul Sharma",
    room: "3B-12",
    check_in: "2026-06-03T10:00:00Z",
    status: "checked_in",
    otp_verified: true,
  },
];

export const mockAIInsights = [
  {
    title: "Curfew Violation Trend",
    insight:
      "Late entries increased 23% in Block B this week. Consider additional warden patrols after 10 PM.",
    severity: "warning",
  },
  {
    title: "Fee Collection Forecast",
    insight:
      "Predicted 89% on-time payment rate for June. 142 students likely to need reminders by June 12.",
    severity: "info",
  },
  {
    title: "Complaint Hotspot",
    insight:
      "Block B Floor 3 accounts for 34% of water-related complaints. Preventive plumbing audit recommended.",
    severity: "critical",
  },
];
