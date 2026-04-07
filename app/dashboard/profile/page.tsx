"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { ProfileCard } from "@/components/profile/profile-card";
import { SkillProgress } from "@/components/profile/skill-progress";
import { Certificates } from "@/components/profile/certificates";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      // 🔥 SHU YERGA QO‘SHAMIZ
      console.log("ROLE:", data?.role);

      setUserData(data);
    };

    getUserData();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Profil & O'zlashtirish
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard user={userData} /> 
        </div>
        <div className="flex flex-col gap-8 lg:col-span-2">
          <SkillProgress />
          <Certificates />
        </div>
      </div>
    </div>
  );
}