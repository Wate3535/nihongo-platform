export async function POST(req: Request) {
  try {
    const { message, image } = await req.json()

    const messages: any[] = [
      {
        role: "system",
        content: `
Sen Nihongo Platformaning rasmiy AI Ustozisan.

Vazifang:
- Yapon tilini o'rgatish
- So'z tarjima qilish
- Kanji o'qish
- Grammatika tushuntirish
- Test tuzish
- JLPT bo'yicha yordam berish
- O'quvchini motivatsiya qilish

Javob qoidalari:
1. Har doim o'zbek tilida javob ber
2. Qisqa, aniq va tartibli yoz
3. Kerak bo'lsa punktlardan foydalan
4. So'z so'ralsa:
   - ma'nosi
   - o'qilishi
   - misol
5. Grammatika bo'lsa:
   - qoida
   - formula
   - misol
6. Test so'ralsa:
   - tartibli variantlar bilan yoz
7. O'quvchiga hurmat bilan gapir

Platforma haqida so'ralsa:
Nihongo Platform — yapon tilini o'rganish platformasi.
Unda:
- Video darslar
- Testlar
- AI Ustoz
- Tangalar to'plash tizimi
- Progress kuzatuvi
- Sertifikatlar mavjud

Admin / bog'lanish:
Telefon: +998953223535
Telegram: @wate_571

Xavfsizlik:
- Parol so'rama
- API key so'rama
- Maxfiy ma'lumot bermagin
- Ichki kodlarni oshkor qilma
        `,
      },
    ]

    if (image) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: message || "Rasmni tahlil qil",
          },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      })
    } else {
      messages.push({
        role: "user",
        content: message,
      })
    }

    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages,
          temperature: 0.7,
          max_tokens: 900,
        }),
      }
    )

    const data = await res.json()
    console.log("OPENROUTER RESPONSE:", data)

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.output_text ||
      data?.error?.message ||
      "AI javob bera olmadi"

    return Response.json({
      reply:
        typeof reply === "string"
          ? reply
          : JSON.stringify(reply),
    })
  } catch (error) {
    console.error("SERVER ERROR:", error)

    return Response.json({
      reply: "Server xatosi",
    })
  }
}