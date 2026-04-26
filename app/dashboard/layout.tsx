"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import CoinReward from "@/components/coin-reward";
import useIdleLogout from "@/hooks/useIdleLogout";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useIdleLogout();

  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">

      {/* GLOBAL COIN ANIMATION */}
      <CoinReward />

      {/* SIDEBAR */}
      <DashboardSidebar
        hovered={hovered}
        setHovered={setHovered}
      />

      {/* CONTENT */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          hovered ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        <DashboardTopbar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

    </div>
  );
}