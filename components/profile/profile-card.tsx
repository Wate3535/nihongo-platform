import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, BookOpen } from "lucide-react"

export function ProfileCard() {
  return (
    <Card className="border border-border bg-card">
      <CardContent className="flex flex-col items-center p-6 text-center">

        <Avatar className="h-24 w-24">
          <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
            JD
          </AvatarFallback>
        </Avatar>

        <h2 className="mt-4 text-xl font-bold text-foreground">
          John Doe
        </h2>

        <p className="text-sm text-muted-foreground">
          john.doe@example.com
        </p>

        <div className="mt-3 flex gap-2">
          <Badge variant="secondary" className="rounded-full">
            N4 daraja
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full bg-primary/10 text-primary"
          >
            12 kunlik ketma-ket o‘qish
          </Badge>
        </div>

        <div className="mt-6 w-full space-y-3 text-left">

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>San Francisco, CA</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>2025-yil martda qo‘shilgan</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>47 ta dars tugatilgan</span>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}