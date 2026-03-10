import dotenv from "dotenv"
import { Telegraf, Markup } from "telegraf"
import { createClient } from "@supabase/supabase-js"

dotenv.config({ path: ".env.local" })

const token = process.env.TELEGRAM_BOT_TOKEN

if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN topilmadi")
  process.exit(1)
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const bot = new Telegraf(token)

const ADMIN_ID = 5053672186


// ===== START =====

bot.start(async (ctx) => {

  const telegramId = ctx.from.id
  const payload = ctx.startPayload

  try {

    if (payload) {

      const { error } = await supabase
        .from("users")
        .update({
          telegram_id: telegramId
        })
        .eq("id", payload)

      if (error) {
        console.log("Supabase error:", error)
      }

    }

  } catch (err) {
    console.log("DB xatolik:", err)
  }

  ctx.reply(
`🇯🇵 NihonGo platformasiga xush kelibsiz!

Bu bot orqali siz yapon tili kursiga to'lov qilishingiz mumkin.

💰 Kurs narxi: 200 000 so'm

📸 To'lov qilgandan keyin chekni shu botga yuboring.`,

Markup.keyboard([
["💰 To'lov yuborish"],
["🏠 Bosh sahifa"]
]).resize()

)

})


// ===== HOME =====

bot.hears("🏠 Bosh sahifa", (ctx) => {

  ctx.reply(
"🏠 Bosh sahifa",

Markup.keyboard([
["💰 To'lov yuborish"]
]).resize()

)

})


// ===== TO'LOV =====

bot.hears("💰 To'lov yuborish", (ctx) => {

  ctx.reply(
`💰 Kurs narxi: 200 000 so'm

💳 5614 6816 2535 2194
👤 RUSTAMJONOV SODIQJON

📸 To'lov qilgandan keyin chekni screenshot qilib shu yerga yuboring.

Tasdiqlash odatda 10-15 minut ichida amalga oshiriladi.`
  )

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

    console.error("Xatolik:", err)

  }

})


// ===== TASDIQLASH =====

bot.action(/approve_(.+)/, async (ctx) => {

  const userId = ctx.match[1]

  try {

    const { error } = await supabase
      .from("users")
      .update({ paid: true })
      .eq("telegram_id", userId)

    if (error) {
      console.log("Supabase update error:", error)
    }

    await ctx.telegram.sendMessage(
      userId,
      "🎉 Siz kursga muvaffaqiyatli qo‘shildingiz!\n\nSaytga qaytib kursni ko‘rishingiz mumkin."
    )

    await ctx.editMessageReplyMarkup()

    await ctx.answerCbQuery("Tasdiqlandi")

  } catch (err) {

    console.error(err)

  }

})


// ===== RAD ETISH =====

bot.action(/reject_(.+)/, async (ctx) => {

  const userId = ctx.match[1]

  try {

    await ctx.telegram.sendMessage(
      userId,
      "❌ Chekingiz tasdiqlanmadi.\nIltimos to‘lovni tekshirib qayta yuboring."
    )

    await ctx.editMessageReplyMarkup()

    await ctx.answerCbQuery("To'lov rad etildi")

  } catch (err) {
    console.log(err)
  }

})


// ===== BOTNI ISHGA TUSHIRISH =====

bot.launch()

console.log("🚀 Telegram bot ishga tushdi")