"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { ProfileCard } from "@/components/profile/profile-card";
import { SkillProgress } from "@/components/profile/skill-progress";
import { Certificates } from "@/components/profile/certificates";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [tangalar, setTangalar] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage();

    const refreshCoins = () => loadPage();

    window.addEventListener("coinsUpdated", refreshCoins);

    return () => {
      window.removeEventListener(
        "coinsUpdated",
        refreshCoins
      );
    };
  }, []);

  function formatReason(
    item: any,
    lessonMap: any
  ) {
    const lessonTitle =
      item.lesson_id &&
      lessonMap[item.lesson_id]
        ? lessonMap[item.lesson_id]
        : null;

    if (
      item.reason ===
      "Lesson Completed"
    ) {
      return lessonTitle
        ? `📘 Dars tugatildi – ${lessonTitle}`
        : "📘 Dars tugatildi";
    }

    if (
      item.reason?.includes(
        "Test Passed"
      )
    ) {
      return lessonTitle
        ? `📝 Test topshirildi – ${lessonTitle}`
        : "📝 Test topshirildi";
    }

    if (
      item.reason ===
      "Perfect Score Bonus"
    ) {
      return "🏆 Mukammal natija bonusi";
    }

    return item.reason;
  }

  async function loadPage() {
    setLoading(true);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const oneHourAgo = new Date(
      Date.now() -
        60 * 60 * 1000
    ).toISOString();

    // ⚡ PARALLEL FETCH
    const [
      userRes,
      profileRes,
      historyRes,
    ] = await Promise.all([
      supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("profiles")
        .select("coins")
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("coin_history")
        .select("*")
        .eq("user_id", user.id)
        .gte(
          "created_at",
          oneHourAgo
        )
        .order("created_at", {
          ascending: false,
        })
        .limit(20),
    ]);

    setUserData(userRes.data);
    setTangalar(
      profileRes.data?.coins || 0
    );

    const filtered =
      historyRes.data || [];

    const lessonIds = filtered
      .map(
        (item: any) =>
          item.lesson_id
      )
      .filter(Boolean);

    let lessonMap: any = {};

    if (lessonIds.length > 0) {
      const { data: lessons } =
        await supabase
          .from("lessons")
          .select(
            "id, title"
          )
          .in(
            "id",
            lessonIds
          );

      (lessons || []).forEach(
        (lesson: any) => {
          lessonMap[
            lesson.id
          ] =
            lesson.title;
        }
      );
    }

    const finalHistory =
      filtered.map(
        (item: any) => ({
          ...item,
          displayReason:
            formatReason(
              item,
              lessonMap
            ),
        })
      );

    setHistory(finalHistory);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-8 w-64 rounded bg-muted" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-72 rounded-2xl bg-muted" />
          <div className="lg:col-span-2 h-72 rounded-2xl bg-muted" />
        </div>
        <div className="h-80 rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Profil &
        O'zlashtirish
      </h1>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">

        {/* LEFT */}
        <div className="flex flex-col gap-8 lg:col-span-4 order-1">

          <div className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <ProfileCard
              user={userData}
            />
          </div>

          <div className="order-last lg:order-none transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <Certificates />
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-8 lg:col-span-8 order-2">

          <div className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <SkillProgress />
          </div>

          {/* TANGALAR */}
          <div className="rounded-3xl border bg-card p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                🪙 Tangalar
              </h2>

              <span className="text-2xl font-bold text-yellow-500">
                {tangalar}
              </span>
            </div>

            {/* HISTORY */}
            <div>
              <h3 className="mb-3 font-semibold">
                📜 Oxirgi 1 soatdagi Tangalar
              </h3>

              <div className="space-y-2">

                {history.length === 0 && (
                  <p className="rounded-xl border px-4 py-3 text-sm text-muted-foreground">
                    Oxirgi 1 soat ichida tanga olmadingiz
                  </p>
                )}

                {(showAll
                  ? history
                  : history.slice(
                      0,
                      3
                    )
                ).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 hover:scale-[1.01] hover:bg-muted"
                  >
                    <span className="text-sm font-medium">
                      {
                        item.displayReason
                      }
                    </span>

                    <span className="font-bold text-yellow-500">
                      +
                      {
                        item.amount
                      }
                    </span>
                  </div>
                ))}

                {history.length >
                  3 && (
                  <button
                    onClick={() =>
                      setShowAll(
                        !showAll
                      )
                    }
                    className="mt-3 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:bg-muted"
                  >
                    {showAll
                      ? "🔼 Yopish"
                      : `🔽 Yana ${
                          history.length -
                          3
                        } tasi`}
                  </button>
                )}
              </div>
            </div>

            {/* MUKOFOTLAR */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold">
                🎁 Mukofotlar
              </h3>

              <div className="grid gap-3 md:grid-cols-3">

                <div className="rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="font-semibold">
                    5% Chegirma
                  </p>
                  <p className="text-sm text-muted-foreground">
                    100 tanga
                  </p>
                </div>

                <div className="rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="font-semibold">
                    10% Chegirma
                  </p>
                  <p className="text-sm text-muted-foreground">
                    200 tanga
                  </p>
                </div>

                <div className="rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="font-semibold">
                    25% Chegirma
                  </p>
                  <p className="text-sm text-muted-foreground">
                    500 tanga
                  </p>
                </div>

              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Dars tugating,
                test ishlang va
                tanga yig‘ib
                premium
                kurslarga
                chegirma oling.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}