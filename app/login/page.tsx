import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      
      <div className="hidden flex-1 items-center justify-center bg-primary lg:flex">
        <div className="max-w-md px-8 text-center text-primary-foreground">
          <h2 className="text-4xl font-bold tracking-tight">Xush kelibsiz !</h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Yapon tilini o‘rganish sayohatingizni davom ettiring.
          </p>
          <div className="mt-10 text-6xl font-bold opacity-70">
            日本語
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">

          <Link href="/" className="text-2xl font-bold text-primary">
            NihonGo
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-foreground">
            Hisobingizga kiring
          </h1>

          <LoginForm />

        </div>
      </div>

    </div>
  )
}