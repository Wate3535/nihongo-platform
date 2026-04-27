"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import CoinReward from "@/components/coin-reward";
import useIdleLogout from "@/hooks/useIdleLogout";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useIdleLogout();

  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const checkingRef = useRef(false);

  useEffect(() => {
    // ⏳ Birinchi check biroz kechroq
    const firstTimer = setTimeout(() => {
      checkSession();
    }, 1200);

    // 🔄 Keyin har 5 sekund tekshiradi
    const interval = setInterval(() => {
      checkSession();
    }, 5000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  async function checkSession() {
    if (checkingRef.current) return;
    checkingRef.current = true;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const storageKey = `active_session_${user.id}`;

      const localToken =
        localStorage.getItem(storageKey);

      // ⏳ Agar yangi login bo‘lsa localStorage hali yozilmagan bo‘lishi mumkin
     if (!localToken) {
  setTimeout(() => {
    checkingRef.current = false
    checkSession()
  }, 1500)
  return
}
      const { data: profile } =
        await supabase
          .from("profiles")
          .select("active_session")
          .eq("id", user.id)
          .maybeSingle();

      const dbToken =
        profile?.active_session;

      // ❌ Faqat token mismatch bo‘lsa logout
      if (
        dbToken &&
        localToken !== dbToken
      ) {
        await supabase.auth.signOut();

        localStorage.removeItem(
          storageKey
        );

        alert(
          "Sizning hisobingiz boshqa qurilmada ochildi."
        );

        router.push("/login");
      }
    } finally {
      checkingRef.current = false;
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CoinReward />

      <DashboardSidebar
        hovered={hovered}
        setHovered={setHovered}
      />

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          hovered
            ? "lg:ml-64"
            : "lg:ml-16"
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