import { ProfileCard } from "@/components/profile/profile-card"
import { SkillProgress } from "@/components/profile/skill-progress"
import { Certificates } from "@/components/profile/certificates"

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 text-2xl font-bold text-foreground">Profile & Progress</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>
        <div className="flex flex-col gap-8 lg:col-span-2">
          <SkillProgress />
          <Certificates />
        </div>
      </div>
    </div>
  )
}
