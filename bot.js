import dotenv from "dotenv"
import { Telegraf, Markup } from "telegraf"
import { createClient } from "@supabase/supabase-js"

dotenv.config({ path: ".env.local" })

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

// 🔥 Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 🔥 Admin
const ADMIN_ID = 5053672186

// 🔥 vaqtinchalik memory (telegramId → userId)
const userMap = new Map()

// ================= START =================

bot.start(async (ctx) => {

  const telegramId = ctx.from.id
  const userId = ctx.startPayload // 🔥 ENG MUHIM

  if (!userId) {
    return ctx.reply("❌ Iltimos saytdan botga kiring")
  }

  try {

    // 🔥 mapping saqlaymiz
    userMap.set(telegramId, userId)

    // 🔥 DB ga yozamiz
    await supabase
      .from("users")
      .update({ telegram_id: telegramId })
      .eq("id", userId)

  } catch (err) {
    console.log("DB xatolik:", err)
  }

  ctx.reply(
`🇯🇵 NihonGo platformasiga xush kelibsiz!

💰 Kurs narxi: 200 000 so'm

📸 To'lov qilib chek yuboring.`,
    Markup.keyboard([
      ["💰 To'lov yuborish"]
    ]).resize()
  )
})


// ================= TOLOV =================

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
  const userId = userMap.get(telegramId) // 🔥 ENG MUHIM

  if (!userId) {
    return ctx.reply("❌ Siz saytdan botga kirmagansiz")
  }

  try {

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
    console.error(err)
  }

})


// ================= APPROVE =================

bot.action(/approve_(.+)_(.+)/, async (ctx) => {

  const userId = ctx.match[1]
  const telegramId = ctx.match[2]

  try {

    // 🔥 USERS
    await supabase
      .from("users")
      .update({ paid: true })
      .eq("id", userId)

    // 🔥 ENROLLMENTS
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
    console.error(err)
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

console.log("🚀 Bot ishga tushdi")