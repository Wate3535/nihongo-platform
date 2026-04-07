"use client";

import React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import useIdleLogout from "@/hooks/useIdleLogout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useIdleLogout(); 

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:ml-64">
        <DashboardTopbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}