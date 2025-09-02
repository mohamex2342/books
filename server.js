const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// إعدادات GitHub
const GITHUB_TOKEN = 'ghp_your_token_here'; // ضع التوكن الخاص بك هنا
const REPO = 'mohamex2342/books';           // اسم المستودع
const BRANCH = 'main';                      // الفرع الرئيسي

// عرض ملفات الموقع من مجلد المشروع
app.use(express.static(path.join(__dirname)));

// استقبال البيانات بصيغة JSON
app.use(bodyParser.json());

// نقطة حذف كتاب من GitHub
app.post('/delete-book', async (req, res) => {
  const { filePath} = req.body;

  if (!filePath) {
    return res.status(400).send('❌ مسار الملف مطلوب');
}

  try {
    // الحصول على SHA الخاص بالملف
    const getUrl = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
    const getRes = await axios.get(getUrl, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`}
});

    const sha = getRes.data.sha;

    // حذف الملف من GitHub
    const deleteRes = await axios.delete(getUrl, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`},
      data: {
        message: `🗑 حذف الكتاب ${filePath}`,
        sha: sha,
        branch: BRANCH
}
});

    res.send(`✅ تم حذف الكتاب من GitHub: ${filePath}`);
} catch (err) {
    console.error('❌ خطأ أثناء الحذف:', err.response?.data || err.message);
    res.status(500).send('❌ حدث خطأ أثناء الحذف من GitHub');
}
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});
