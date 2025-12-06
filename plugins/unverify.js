let handler = async function (m, { conn }) {

    // بيانات المستخدم
    let user = global.db.data.users[m.sender];

    // إذا لم يكن مسجلاً
    if (!user.registered)
        return conn.reply(m.chat, `❌ *أنت غير مسجل في قاعدة البيانات.*\n\nاستخدم:  @verify للتسجيل.`, m);

    // حذف البيانات
    user.registered = false;
    user.name = "";
    user.age = 0;
    user.regTime = 0;

    // رسالة النجاح
    let msg = `
✔️ *تم حذف تسجيلك بنجاح!*

يمكنك التسجيل مرة أخرى باستخدام:
@verify
    `;

    await conn.sendMessage(m.chat, { 
        text: msg,
        contextInfo: {
            externalAdReply: {
                title: "حذف التسجيل",
                body: "تم مسح جميع بيانات حسابك",
                showAdAttribution: true,
                mediaType: 1,
                thumbnailUrl: "https://raw.githubusercontent.com/alimaoie-us/Nataly-AI/main/src/Nataly.jpg",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

}

handler.help = ["unreg"];
handler.tags = ["infobot"];
handler.command = /^unreg$/i;

export default handler;