import { createHash } from 'crypto'

let handler = async function (m, { conn }) {
    // الحصول على اسم المستخدم
    let name = await conn.getName(m.sender)

    // بيانات المستخدم من قاعدة البيانات
    let user = global.db.data.users[m.sender]

    // تحقق مما إذا كان المستخدم مسجل بالفعل
    if (user.registered === true) throw `أنت مسجل بالفعل في قاعدة البيانات.\nهل تريد إعادة التسجيل؟ */unreg*`

    // مصفوفة عشوائية لتوليد العمر
    let ran = [1,2,3,4,5,6,7,8,9]
    let age = pickRandom(ran) * 2

    // تعيين البيانات في قاعدة البيانات
    user.name = name
    user.age = age
    user.regTime = +new Date()
    user.registered = true

    // توليد رقم تسلسلي
    let sn = createHash('md5').update(m.sender).digest('hex')

    // الصورة الشخصية (أو صورة افتراضية إذا لم توجد)
    const pp = await conn.profilePictureUrl(m.sender, "image").catch(_ => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")

    // رسالة نجاح
    let cap = `
╭━━「 *Information* 」
│• *Name:* ${name}
│• *Age:* ${age} Years
│• *Status:* _Success_
│• *Serial Number:* ${sn}
╰╾•••
`

    // إنشاء fake message صالح للاقتباس
    let fkon = {
        key: {
            fromMe: false,
            participant: m.sender,
            remoteJid: m.chat
        },
        message: {
            conversation: "تم إنشاء حسابك بنجاح"
        }
    }

    // إرسال رسالة التأكيد
    await conn.sendMessage(m.chat, { 
        text: cap,
        contextInfo: {
            externalAdReply: {
                title: "✔️ تم التسجيل بنجاح",
                body: "",
                showAdAttribution: true,
                mediaType: 1,
                sourceUrl: '',
                thumbnailUrl: pp,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: fkon })
}

handler.help = ['@verify']
handler.tags = ['infobot']
handler.customPrefix = /^(@verify)/i
handler.command = new RegExp()

export default handler

// دالة اختيار عنصر عشوائي من مصفوفة
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}