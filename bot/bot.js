import dotenv from "dotenv"
import { Telegraf, Markup } from "telegraf"
import { createClient } from "@supabase/supabase-js"

// 🔥 ENV
dotenv.config({ path: "../.env.local" })

const bot = new Telegraf(process.env.BOT_TOKEN)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 🔥 ADMIN ID
const ADMIN_ID = 5053672186

// ================= START =================
bot.start(async (ctx) => {
  const telegramId = ctx.from.id
  let userId = ctx.startPayload

  console.log("START PAYLOAD:", userId)
  console.log("TELEGRAM ID:", telegramId)

  try {
    // 🔥 1. Agar link orqali kirsa → DB update
    if (userId) {
      await supabase
        .from("users")
        .update({ telegram_id: telegramId })
        .eq("id", userId)
    }

    // 🔥 2. Agar oddiy /start bo‘lsa → DB dan topamiz
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_id", telegramId)
      .maybeSingle()

    // 🔥 Agar umuman topilmasa → baribir ishlashga ruxsat beramiz
    if (!existingUser && !userId) {
      console.log("USER NOT LINKED BUT CONTINUE")
    }

    ctx.reply(
`🇯🇵 NihonGo platformasiga xush kelibsiz!

💰 Kurs narxi: 200 000 so'm

📸 To'lov qilib chek yuboring.`,
      Markup.keyboard([["💰 To'lov yuborish"]]).resize()
    )

  } catch (err) {
    console.error("START ERROR:", err)
    ctx.reply("❌ Xatolik yuz berdi")
  }
})
// ================= TO‘LOV =================
bot.hears("💰 To'lov yuborish", (ctx) => {
  ctx.reply(
`💰 200 000 so'm

💳 5614 6816 2535 2194
👤 RUSTAMJONOV SODIQJON

📸 Chekni shu yerga yuboring.`
  )
})

// ================= CHEK =================
bot.on("photo", async (ctx) => {
  const photo = ctx.message.photo.pop().file_id
  const telegramId = ctx.from.id

  try {
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_id", telegramId)
      .maybeSingle()

    let userId = user?.id || "UNKNOWN"

    await ctx.telegram.sendPhoto(
      ADMIN_ID,
      photo,
      {
        caption: `💰 Yangi to'lov

🧠 UserID: ${userId}
🆔 Telegram: ${telegramId}`,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Tasdiqlash", callback_data: `approve_${userId}_${telegramId}` },
              { text: "❌ Bekor qilish", callback_data: `reject_${telegramId}` }
            ]
          ]
        }
      }
    )

    await ctx.reply("⏳ Chek qabul qilindi, tekshirilmoqda")

  } catch (err) {
    console.error("PHOTO ERROR:", err)
  }
})

// ================= APPROVE =================
bot.action(/approve_(.+)_(.+)/, async (ctx) => {
  const userId = ctx.match[1]
  const telegramId = ctx.match[2]

  try {
    await supabase
      .from("users")
      .update({ paid: true })
      .eq("id", userId)

    await supabase
      .from("enrollments")
      .upsert([
        {
          user_id: userId,
          course_id: 1,
          status: "approved"
        }
      ])

    await ctx.telegram.sendMessage(
      telegramId,
      "🎉 Siz kursga qo‘shildingiz!\n\nSaytga qaytib davom eting."
    )

    await ctx.editMessageReplyMarkup()
    await ctx.answerCbQuery("Tasdiqlandi")

  } catch (err) {
    console.error("APPROVE ERROR:", err)
  }
})

// ================= REJECT =================
bot.action(/reject_(.+)/, async (ctx) => {
  const telegramId = ctx.match[1]

  await ctx.telegram.sendMessage(
    telegramId,
    "❌ To‘lov tasdiqlanmadi"
  )

  await ctx.editMessageReplyMarkup()
  await ctx.answerCbQuery("Rad etildi")
})

// ================= RUN =================
bot.launch()
console.log("🚀 Bot Railway’da ishlayapti")

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))