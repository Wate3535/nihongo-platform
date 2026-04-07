import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const IDLE_LIMIT = 3 * 60 * 60 * 1000; // 3 soat
const WARNING_TIME = 60 * 1000; // 1 minut

export default function useIdleLogout() {
  const router = useRouter();

  useEffect(() => {
    let lastActivity = Date.now();
    let warned = false;

    const updateActivity = () => {
      lastActivity = Date.now();
      warned = false;
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const interval = setInterval(async () => {
      const now = Date.now();
      const diff = now - lastActivity;

      // ⚠️ warning
      if (diff > IDLE_LIMIT - WARNING_TIME && !warned) {
        warned = true;

        const stay = confirm(
          "⏳ 1 daqiqadan keyin tizimdan chiqasiz. Davom etishni xohlaysizmi?"
        );

        if (stay) {
          lastActivity = Date.now();
          warned = false;
        }
      }

      // 🔒 logout
      if (diff > IDLE_LIMIT) {
        await supabase.auth.signOut();
        router.push("/login");
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, []);
}