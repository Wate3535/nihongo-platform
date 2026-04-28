import dotenv from "dotenv"
import { Telegraf, Markup } from "telegraf"

dotenv.config({ path: "../.env.local" })

const bot = new Telegraf(process.env.ASSISTANT_BOT_TOKEN)

// ================= MENU FUNCTION =================
function showMenu(ctx) {
  return ctx.reply(
    `🇯🇵 NihonGoo Yordamchi Botga xush kelibsiz!

Kerakli bo‘limni tanlang 👇`,
    Markup.keyboard([
      ["📘 Platforma haqida"],
      ["👨‍💼 Adminga murojaat", "🎓 Kursga yozilish"],
      ["🆘 Yordam"]
    ])
      .resize()
      .persistent()
  )
}

// ================= START =================
bot.start((ctx) => showMenu(ctx))

// ================= COMMANDS =================
bot.command("kurs", (ctx) => {
  ctx.reply(
`🎓 NihonGoo kurslariga yozilish uchun quyidagi havola orqali ro‘yxatdan o‘ting:

🌐 https://nihongoo.uz

📚 Boshlang‘ichdan professional darajagacha darslar mavjud.`,
{
  disable_web_page_preview: true
}
  )
})

bot.command("kanal", (ctx) => {
  ctx.reply(
`📢 Rasmiy Telegram kanalimiz:

https://t.me/nihongoo_uz`,
{
  disable_web_page_preview: true
}
  )
})

bot.command("sayt", (ctx) => {
  ctx.reply(
`🌐 Rasmiy saytimiz:

https://nihongoo.uz`,
{
  disable_web_page_preview: true
}
  )
})

bot.command("admin", (ctx) => {
  ctx.reply(
`👨‍💼 Admin bilan bog‘lanish:

📞 Telefon: +998 95 322 35 35
💬 Telegram: @wate_jp`
  )
})

bot.command("yordam", (ctx) => {
  ctx.reply(
`🆘 Agar muammo bo‘lsa adminga murojaat qiling.

💬 @wate_jp
📞 +998 95 322 35 35`
  )
})

// ================= BUTTON TEXTS =================
bot.hears("📘 Platforma haqida", (ctx) => {
  ctx.reply(
`🇯🇵 NihonGoo — yapon tilini zamonaviy usulda o‘rgatadigan platforma.

✅ Interaktiv darslar
✅ JLPT tayyorlov
✅ Testlar va amaliyot
✅ Oson va qulay tizim
✅ Kuchli community

🌐 Sayt: https://nihongoo.uz`,
{
  disable_web_page_preview: true
}
  )
})

bot.hears("👨‍💼 Adminga murojaat", (ctx) => {
  ctx.reply(
`👨‍💼 Admin bilan bog‘lanish:

📞 Telefon: +998 95 322 35 35
💬 Telegram: @wate_jp`
  )
})

bot.hears("🎓 Kursga yozilish", (ctx) => {
  ctx.reply(
`🎓 NihonGoo kurslariga yozilish uchun quyidagi havola orqali ro‘yxatdan o‘ting:

🌐 https://nihongoo.uz

📚 Boshlang‘ichdan professional darajagacha darslar mavjud.`,
{
  disable_web_page_preview: true
}
  )
})

bot.hears("🆘 Yordam", (ctx) => {
  ctx.reply(
`🆘 Agar muammo bo‘lsa adminga murojaat qiling.

💬 @wate_jp
📞 +998 95 322 35 35`
  )
})

// ================= RUN =================
bot.launch()
console.log("🚀 Assistant bot ishlayapti")

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))