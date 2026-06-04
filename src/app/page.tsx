"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

const features = [
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Six dedicated portals for admins, wardens, staff, students, and parents.",
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    description: "Predictive insights for attendance, fees, complaints, and occupancy.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "JWT sessions, RBAC, audit logs, and encrypted sensitive operations.",
  },
  {
    icon: Sparkles,
    title: "Modern UX",
    description: "Linear-inspired interface with real-time updates and smooth animations.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="font-semibold">{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/login">
              <Button>
                Get started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative overflow-hidden px-4 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Production-Ready Hostel HRMS
              </span>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Manage your hostel
                <br />
                <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  like a modern SaaS
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                {APP_DESCRIPTION}. Attendance, fees, complaints, payroll, mess, rooms,
                visitors, and emergency — unified in one platform.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/login">
                  <Button size="lg">
                    Launch dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    View demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 px-4 py-20">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <feature.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME}. Built for scalable hostel operations.
      </footer>
    </div>
  );
}
