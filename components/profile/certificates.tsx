import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type CertificateStatus = "earned" | "in-progress" | "locked"

type Certificate = {
  title: string
  date: string
  status: CertificateStatus
  file?: string
}

const certificates: Certificate[] = [
  {
    title: "Hiragana va Katakana kursi sertifikati",
    date: "2025-yil Dekabr",
    status: "earned",
    file: "/certificates/alifbo_sertifikat.png",
  },
  {
    title: "N5 daraja kursi sertifikati",
    date: "2026-yil Yanvar",
    status: "earned",
    file: "/certificates/N5_sertifikat.png",
  },
  {
    title: "N5 Grammatika asoslari",
    date: "Jarayonda",
    status: "in-progress",
  },
  {
    title: "N4 Sertifikat tayyorlov",
    date: "Yopiq",
    status: "locked",
  },
]

export function Certificates() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Sertifikatlar
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          O‘qish jarayonida qo‘lga kiritgan yutuqlaringiz
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">

        {certificates.map((cert) => (
          <div
            key={cert.title}
            className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
          >

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                cert.status === "earned"
                  ? "bg-primary/10 text-primary"
                  : cert.status === "in-progress"
                  ? "bg-chart-4/10 text-chart-4"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Award className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-foreground">
                {cert.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {cert.date}
              </p>
            </div>

            {cert.status === "earned" && cert.file ? (

              <a href={cert.file} download>

                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label="Sertifikatni yuklab olish"
                >
                  <Download className="h-4 w-4" />
                </Button>

              </a>

            ) : (

              <Badge
                variant="secondary"
                className={`shrink-0 rounded-full ${
                  cert.status === "in-progress"
                    ? "bg-chart-4/10 text-chart-4"
                    : ""
                }`}
              >
                {cert.status === "in-progress" ? "Jarayonda" : "Yopiq"}
              </Badge>

            )}

          </div>
        ))}

      </CardContent>
    </Card>
  )
}