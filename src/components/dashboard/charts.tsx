"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartColors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface ChartProps {
  data: Record<string, unknown>[];
}

export function AttendanceAreaChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="date" className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
        <YAxis className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="present"
          stroke="#6366f1"
          fill="url(#presentGrad)"
          strokeWidth={2}
        />
        <Area type="monotone" dataKey="late" stroke="#f59e0b" fill="transparent" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OccupancyBarChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="block" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="occupied" fill="#6366f1" radius={[4, 4, 0, 0]} />
        <Bar dataKey="capacity" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComplaintPieChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function FeeBarChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
              Number(value ?? 0)
            )
          }
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="collected" fill="#10b981" radius={[4, 4, 0, 0]} name="Collected" />
        <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
      </BarChart>
    </ResponsiveContainer>
  );
}
