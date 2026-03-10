import dotenv from "dotenv"
import { Telegraf, Markup } from "telegraf"
import { createClient } from "@supabase/supabase-js"

dotenv.config({ path: ".env.local" })

const token = process.env.TELEGRAM_BOT_TOKEN

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN topilmadi")
  process.exit(1)
}

const bot = new Telegraf(token)

const ADMIN_ID = 5053672186

// ===== START =====

bot.start((ctx) => {

  ctx.reply(
`🇯🇵 NihonGo platformasiga xush kelibsiz!

Bu bot orqali siz yapon tili kursiga to'lov qilishingiz mumkin.

📚 Kurs ichida:
• Video darslar
• Kanji mashqlari
• JLPT testlar
• Sun'iy intellekt bilan suhbat

💰 Kurs narxi: 200 000 so'm

📸 To'lov qilgandan keyin chekni shu botga yuboring.

⏱ Tasdiqlash odatda 10–15 minut ichida amalga oshiriladi.

👇 Kerakli bo‘limni tanlang`,

Markup.keyboard([
  ["💰 To'lov yuborish"],
  ["📚 Kurs haqida", "📞 Admin"],
  ["🏠 Bosh sahifa"]
]).resize()

  )

})

// ===== HOME =====

bot.hears("🏠 Bosh sahifa", (ctx) => {

  ctx.reply("🏠 Bosh sahifa",

Markup.keyboard([
  ["💰 To'lov yuborish"],
  ["📚 Kurs haqida", "📞 Admin"]
]).resize()

  )

})

// ===== TO'LOV =====

bot.hears("💰 To'lov yuborish", (ctx) => {

  ctx.reply(
`💰 Kurs narxi: 200 000 so'm

💳 5614 6816 2535 2194
👤 RUSTAMJONOV SODIQJON

📸 Chekni screenshot qilib yuboring.`
  )

})

// ===== KURS HAQIDA =====

bot.hears("📚 Kurs haqida", (ctx) => {

  ctx.reply(
`📚 NihonGo kursi

🇯🇵 N5 → N4 darajagacha
📚 Grammatika
🗣 Sun'iy intellekt bilan suhbat
📝 Testlar
📖 Kanji`
  )

})

// ===== ADMIN =====

bot.hears("📞 Admin", (ctx) => {

  ctx.reply("Admin: https://t.me/Wate_571")

})

// ===== CHEK QABUL QILISH =====

bot.on("photo", async (ctx) => {

  const photo = ctx.message.photo.pop().file_id
  const username = ctx.from.username || ctx.from.first_name
  const userId = ctx.from.id

  try {

    await ctx.telegram.sendPhoto(
      ADMIN_ID,
      photo,
      {
        caption: `💰 Yangi to'lov

👤 User: ${username}
🆔 Telegram ID: ${userId}`,

        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Tasdiqlash", callback_data: `approve_${userId}` },
              { text: "❌ Bekor qilish", callback_data: `reject_${userId}` }
            ]
          ]
        }
      }
    )

    await ctx.reply("✅ Chek qabul qilindi. Admin tekshiradi.")

  } catch (err) {

    console.error(err)

  }

})

// ===== TASDIQLASH =====

bot.action(/approve_(.+)/, async (ctx) => {

  const userId = ctx.match[1]

  try {

    await supabase
      .from("users")
      .update({ paid: true })
      .eq("telegram_id", userId)

    await ctx.telegram.sendMessage(
      userId,
      "🎉 Siz kursga muvaffaqiyatli qo‘shildingiz!\nPlatformaga kirishingiz mumkin."
    )

    await ctx.editMessageReplyMarkup()

    await ctx.answerCbQuery("To'lov tasdiqlandi")

  } catch (err) {

    console.error(err)

  }

})

// ===== RAD ETISH =====

bot.action(/reject_(.+)/, async (ctx) => {

  const userId = ctx.match[1]

  await ctx.telegram.sendMessage(
    userId,
    "❌ Chekingiz tasdiqlanmadi.\nIltimos qayta yuboring."
  )

  await ctx.editMessageReplyMarkup()

  await ctx.answerCbQuery("To'lov rad etildi")

})

// ===== START BOT =====

bot.launch()

console.log("🚀 Telegram bot ishga tushdi")