import dotenv from "dotenv"
import { Telegraf, Markup } from "telegraf"
import { createClient } from "@supabase/supabase-js"

dotenv.config({ path: "../.env.local" })

const bot = new Telegraf(process.env.BOT_TOKEN)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const ADMIN_ID = 5053672186
const MAX_PAYMENTS = 10

// ================= START =================
bot.start(async (ctx) => {
  const telegramId = String(ctx.from.id)
  const payload = ctx.startPayload

  let userId = null
  let level = "N5"

  try {
    if (payload) {
      const parts = payload.split("_")
      userId = parts[0]
      level = parts[1] || "N5"

      await supabase
        .from("users")
        .update({ telegram_id: telegramId })
        .eq("id", userId)
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_id", telegramId)
      .maybeSingle()

    if (!existingUser && !userId) {
      console.log("USER NOT FOUND BUT CONTINUE")
    }

    ctx.reply(
`🇯🇵 NihonGoo platformasiga xush kelibsiz!

📘 Tanlangan kurs: ${level}
💰 Kurs narxi: 499 000 so'm

📸 To‘lov qilib chek yuboring.`,
      Markup.keyboard([["💰 To'lov yuborish"]]).resize()
    )

  } catch (err) {
    console.error("START ERROR:", err)
    ctx.reply("❌ Xatolik yuz berdi")
  }
})

// ================= TOLOV =================
bot.hears("💰 To'lov yuborish", async (ctx) => {
  ctx.reply(
`💰 499 000 so'm

💳 5614 6816 2535 2194
👤 RUSTAMJONOV SODIQJON

📸 Chekni shu yerga yuboring.`
  )
})

// ================= CHEK =================
bot.on("photo", async (ctx) => {
  const photo = ctx.message.photo.pop().file_id
  const telegramId = String(ctx.from.id)

  try {
    // User topamiz
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_id", telegramId)
      .maybeSingle()

    const userId = user?.id

    if (!userId) {
      return ctx.reply("❌ User topilmadi. Avval sayt orqali ro'yxatdan o'ting.")
    }

    // 🔥 4 ta limit tekshirish
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)

    const paymentCount = enrollments?.length || 0

    if (paymentCount >= MAX_PAYMENTS) {
      return ctx.reply(
`❌ Siz maksimal ${MAX_PAYMENTS} marta kurs xarid qilgansiz.

Qo‘shimcha kurs uchun admin bilan bog‘laning.`
      )
    }

    // Adminga yuborish
    await ctx.telegram.sendPhoto(
      ADMIN_ID,
      photo,
      {
        caption:
`💰 Yangi to‘lov

🧠 UserID: ${userId}
🆔 Telegram: ${telegramId}
📦 Xarid soni: ${paymentCount + 1}/${MAX_PAYMENTS}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Tasdiqlash",
                callback_data: `approve_${userId}_${telegramId}`
              },
              {
                text: "❌ Bekor qilish",
                callback_data: `reject_${telegramId}`
              }
            ]
          ]
        }
      }
    )

    await ctx.reply("⏳ Chek qabul qilindi, tekshirilmoqda")

  } catch (err) {
    console.error("PHOTO ERROR:", err)
    ctx.reply("❌ Xatolik yuz berdi")
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

    // 🔥 Har safar yangi row
    await supabase
      .from("enrollments")
      .insert([
        {
          user_id: userId,
          course_id: 1,
          status: "approved"
        }
      ])

    await ctx.telegram.sendMessage(
      telegramId,
`🎉 To‘lovingiz tasdiqlandi!

Saytga qaytib davom eting.`
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
console.log("🚀 Bot ishlayapti")

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))