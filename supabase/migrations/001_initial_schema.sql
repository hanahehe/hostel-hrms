-- Hostel HRMS - Initial Database Schema
-- Run in Supabase SQL Editor or via CLI

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM (
  'super_admin', 'admin', 'warden', 'staff', 'student', 'parent'
);

CREATE TYPE complaint_status AS ENUM (
  'open', 'in_progress', 'resolved', 'closed', 'escalated'
);

CREATE TYPE complaint_priority AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TYPE complaint_category AS ENUM (
  'infrastructure', 'water', 'electricity', 'maintenance', 'room', 'mess', 'other'
);

CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');

CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue', 'partial');

CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'on_leave');

-- Hostels
CREATE TABLE hostels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  address TEXT,
  total_blocks INT DEFAULT 1,
  curfew_time TIME DEFAULT '22:00',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocks
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hostel_id UUID NOT NULL REFERENCES hostels(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  floors INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
  room_number VARCHAR(20) NOT NULL,
  floor INT NOT NULL,
  capacity INT DEFAULT 2,
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(block_id, room_number)
);

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  phone VARCHAR(20),
  hostel_id UUID REFERENCES hostels(id),
  block_id UUID REFERENCES blocks(id),
  room_id UUID REFERENCES rooms(id),
  student_id VARCHAR(50),
  parent_of_student_id UUID REFERENCES profiles(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff profiles
CREATE TABLE staff_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  designation VARCHAR(100),
  joining_date DATE,
  emergency_contact JSONB,
  salary_base DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance
CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id),
  hostel_id UUID REFERENCES hostels(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIMESTAMPTZ,
  check_out TIMESTAMPTZ,
  status attendance_status DEFAULT 'absent',
  is_late_entry BOOLEAN DEFAULT FALSE,
  qr_scan_id VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- Fees
CREATE TABLE fee_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id),
  type VARCHAR(50) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  due_date DATE NOT NULL,
  status payment_status DEFAULT 'pending',
  invoice_number VARCHAR(50) UNIQUE,
  paid_at TIMESTAMPTZ,
  payment_reference VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leave requests
CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status leave_status DEFAULT 'pending',
  is_emergency BOOLEAN DEFAULT FALSE,
  parent_consent_url TEXT,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complaints
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category complaint_category NOT NULL,
  status complaint_status DEFAULT 'open',
  priority complaint_priority DEFAULT 'medium',
  hostel_id UUID REFERENCES hostels(id),
  block_id UUID REFERENCES blocks(id),
  floor INT,
  room_id UUID REFERENCES rooms(id),
  reported_by UUID NOT NULL REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id),
  image_urls TEXT[],
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complaint history
CREATE TABLE complaint_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  performed_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calendar events
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) NOT NULL,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  hostel_id UUID REFERENCES hostels(id),
  created_by UUID REFERENCES profiles(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff shifts
CREATE TABLE staff_shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID NOT NULL REFERENCES profiles(id),
  shift_date DATE NOT NULL,
  shift_type VARCHAR(50) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payroll
CREATE TABLE payroll_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID NOT NULL REFERENCES profiles(id),
  month INT NOT NULL,
  year INT NOT NULL,
  base_salary DECIMAL(12,2) NOT NULL,
  overtime_hours DECIMAL(6,2) DEFAULT 0,
  deductions DECIMAL(12,2) DEFAULT 0,
  net_salary DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payslip_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(staff_id, month, year)
);

-- Mess meals
CREATE TABLE meal_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hostel_id UUID REFERENCES hostels(id),
  meal_type VARCHAR(50) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  day_of_week INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE meal_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id),
  meal_schedule_id UUID REFERENCES meal_schedules(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  attended BOOLEAN DEFAULT FALSE,
  feedback_rating INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visitors
CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  id_proof VARCHAR(100),
  visiting_student_id UUID REFERENCES profiles(id),
  room_id UUID REFERENCES rooms(id),
  purpose TEXT,
  otp_code VARCHAR(6),
  otp_verified BOOLEAN DEFAULT FALSE,
  check_in TIMESTAMPTZ,
  check_out TIMESTAMPTZ,
  pass_code VARCHAR(20),
  registered_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emergency incidents
CREATE TABLE emergency_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reported_by UUID REFERENCES profiles(id),
  incident_type VARCHAR(50) NOT NULL,
  location TEXT,
  description TEXT,
  severity VARCHAR(20) DEFAULT 'high',
  status VARCHAR(20) DEFAULT 'active',
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  metadata JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_attendance_date ON attendance_records(date);
CREATE INDEX idx_attendance_student ON attendance_records(student_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_block ON complaints(block_id);
CREATE INDEX idx_fee_status ON fee_records(status);
CREATE INDEX idx_leave_status ON leave_requests(status);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

-- Policies (basic - extend per role in production)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('super_admin', 'admin', 'warden')
    )
  );

CREATE POLICY "Students view own attendance"
  ON attendance_records FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Students view own fees"
  ON fee_records FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Anyone authenticated can create complaints"
  ON complaints FOR INSERT
  WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "View complaints based on role"
  ON complaints FOR SELECT
  USING (
    reported_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('super_admin', 'admin', 'warden', 'staff')
    )
  );
