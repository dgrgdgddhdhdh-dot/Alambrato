const axios = require('axios');

module.exports = async ({ sock, msg, text, reply, from }) => {
  // التحقق من الأمر
  if (!text.startsWith('بوت')) return;

  // استخراج الرابط من الأمر
  const parts = text.trim().split(' ');
  if (parts.length < 2) {
    return reply('• مرحبا بك عزيزي المستخدم

• انـا بـوت اسـمـي ( 𝄞 > إيتاشي 𝄞 ) •
• استطيع تحميل الفيديو من التيك توك 
• وكذالك استطيع  بحث لك عن ايا فيديو تحتاج •
• ويوجد اوامر ارسال فيروسات للضحية واوامر  تحميل صور ڪثيرة  •
• الاوامر  هي
1_ ( لتحميل فيديو من التيك توك ارسل ڪلمة tiktok )
2_( لتحميل فيديو من الانستغرام ارسل ڪلمة insta )
3_( لبحث عن فيديو ارسل ڪلمة video )
4_( لارسال فيروسات لاي رقم واتساب ارسل ڪلمة bug )
التواصل مع المطور أرسل كلمة مطور');
  }

  const instaUrl = parts[1];

  if (!instaUrl.includes('instagram.com')) {
    return reply('❌ الرابط غير صالح. يرجى التأكد من رابط إنستغرام.');
  }

  try {
    await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } });

    // استخدم API مجاني - مفتاحك الذي زودتني به
    const apiUrl = `مطور`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.result || !response.data.result.length) {
      return reply('❌ تعذر جلب الوسائط. تأكد من الرابط وحاول مجددًا.');
    }

    await reply('✧︙𝙽𝙰𝙼𝙴  : 𝑎𝑙𝑎𝑚𝑏𝑟𝑎𝑡𝑜𝑟  .
✧︙𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴  : t.me/Yemeon
✧︙𝟋𝛶𝛉𝚳  : َِ𝙔 َِ𝙀 َِ𝙈 َِ𝙀 َِ𝙉  .
✧︙بوتي رشق العرب: 
  t.me/Arabi5bot .');

    // أرسل أول وسائط فقط - يمكنك تعديل ذلك لإرسال أكثر
    const mediaUrl = response.data.result[0];

    const mediaResp = await axios.get(mediaUrl.url, { responseType: 'arraybuffer' });
    const mediaBuffer = Buffer.from(mediaResp.data, 'binary');

    const type = mediaUrl.url.endsWith('.mp4') ? 'video' : 'image';

    await sock.sendMessage(from, {
      [type]: mediaBuffer,
      caption: `📥 تم تحميل الوسائط بنجاح من إنستغرام.\n> طـــــرزان الواقدي 🔥`
    }, { quoted: msg });

    await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });

  } catch (err) {
    console.error('❌ خطأ أثناء تحميل إنستغرام:', err.message);
    await reply('❌ حدث خطأ أثناء المعالجة. الرجاء المحاولة لاحقًا.');
    await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
  }
};
