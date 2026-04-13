"use client"

import { VideoSection } from "./features/video-section"
import { AiSection } from "./features/ai-section"
import { StatsSection } from "./features/stats-section"
import { JlptSection } from "./features/jlpt-section"
import { CommunitySection } from "./features/community-section"
import { CertificateSection } from "./features/certificate-section"

export function Features() {
  return (
    <main className="snap-y snap-mandatory scroll-smooth">

      <section className="snap-start h-screen">
        <VideoSection />
      </section>

      <section className="snap-start h-screen">
        <AiSection />
      </section>

      <section className="snap-start h-screen">
        <StatsSection />
      </section>

      <section className="snap-start h-screen">
        <JlptSection />
      </section>

      <section className="snap-start h-screen">
        <CommunitySection />
      </section>

      <section className="snap-start h-screen">
        <CertificateSection />
      </section>

    </main>
  )
}