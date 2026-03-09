import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - decorative */}
      <div className="hidden flex-1 items-center justify-center bg-accent lg:flex">
        <div className="max-w-md px-8 text-center text-accent-foreground">
          <h2 className="text-4xl font-bold tracking-tight">Yapon tilini o‘rganish yo‘lingizni boshlang</h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Interaktiv platformamiz orqali yapon tilini o‘zlashtirayotgan minglab o‘quvchilarga qo‘shiling.
          </p>
          <div className="mt-10 text-6xl font-bold opacity-70">
            {"始めましょう"}
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              NihonGo
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-foreground">Hisob yarating</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Allaqachon hisobingiz bormi?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Kirish
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
