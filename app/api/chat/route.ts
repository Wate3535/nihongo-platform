export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a Japanese teacher helping students practice conversation.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    })

    const data = await res.json()

    return Response.json({
      reply: data?.choices?.[0]?.message?.content || "AI javob bera olmadi",
    })
  } catch (error) {
    console.error(error)
    return Response.json({ reply: "Server xatosi" })
  }
}