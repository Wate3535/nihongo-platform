import dotenv from "dotenv"
import { Telegraf } from "telegraf"

dotenv.config({ path: ".env.local" })

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN topilmadi. .env.local ni tekshiring.")
  process.exit(1)
}

const bot = new Telegraf(token)

// Avval vaqtincha o'zingning ID ni olish uchun ishlatamiz
// Terminalda /start bosganingda ID chiqadi
bot.start((ctx) => {
  console.log("Admin ID:", ctx.from.id)

  ctx.reply(
`NihonGo kursiga xush kelibsiz 🇯🇵

💰 Kurs narxi: 200 000 so'm

To'lov qilish uchun karta:
💳 5614 6816 2535 2194
👤 RUSTAMJONOV SODIQJON

To'lov qilgandan keyin screenshot yuboring.
Tasdiqlash 5–10 minut ichida amalga oshiriladi.`
  )
})

// ADMIN ID ni keyin shu yerga qo'yasan
const ADMIN_ID = "5053672186"

// Rasm (chek) qabul qilish
bot.on("photo", async (ctx) => {
  const photo = ctx.message.photo.pop().file_id
  const username = ctx.from.username || ctx.from.first_name

  try {
    await ctx.telegram.sendPhoto(
      ADMIN_ID,
      photo,
      {
        caption: `💰 Yangi to'lov cheki

User: ${username}
User ID: ${ctx.from.id}`
      }
    )

    await ctx.reply("✅ Chek qabul qilindi. Admin tekshiradi.")
  } catch (err) {
    console.error("❌ Admin ga yuborishda xato:", err)
    await ctx.reply("❌ Xatolik yuz berdi. Iltimos keyinroq urinib ko‘ring.")
  }
})

bot.launch()
console.log("🚀 Telegram bot ishga tushdi")