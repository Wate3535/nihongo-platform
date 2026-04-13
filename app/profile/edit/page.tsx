"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

  const { toast } = useToast();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");

  // 🔥 USERNI OLISH
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        setUser(profile);
        setName(profile.name || "");
        setLocation(profile.location || "");
        setAvatar(profile.avatar_url || "");
      }
    };

    fetchUser();
  }, []);

  // 📸 IMAGE
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // 💾 SAVE (FULL UPGRADE)
  const handleSave = async () => {
    if (!user) return;

    let avatarUrl = avatar;

    // 🔥 agar yangi rasm tanlangan bo‘lsa upload qilamiz
    if (avatar && avatar.startsWith("blob:")) {
      const file = await fetch(avatar).then(r => r.blob());

      const fileName = `${user.id}.png`;

      await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      avatarUrl = data.publicUrl;
    }

    // 🔥 DB update
    const { error } = await supabase
      .from("users")
      .update({
        name,
        location,
        avatar_url: avatarUrl,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error ❌",
        description: "Saqlashda xatolik",
      });
      return;
    }

    toast({
      title: "Saved ✅",
      description: "Profil yangilandi",
    });

    // 🚀 PROFILEGA QAYTISH
    setTimeout(() => {
      router.push("/dashboard/profile");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">

      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl">

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Profile
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={avatar || "/default-avatar.png"}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:scale-110 transition">
              📷
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">
            Location 📍
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Masalan: Toshkent"
            className="w-full p-3 rounded-xl bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">
            Email 🔒
          </label>

          <input
            value={user?.email || ""}
            disabled
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-500"
          />

          <p className="text-xs text-red-500 mt-1">
            ⚠️ Siz bu email orqali to‘lov qilgansiz, o‘zgartirib bo‘lmaydi.
          </p>
        </div>

        {/* Level */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Level 🔒
          </label>

          <input
            value={user?.level || ""}
            disabled
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-500"
          />

          <p className="text-xs text-red-500 mt-1">
            ⚠️ Level o‘zgarsa barcha progress o'chib ketadi.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:scale-105 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}