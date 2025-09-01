// خادم بسيط باستخدام Express لعرض ملفات الموقع

const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// عرض جميع الملفات من مجلد المشروع
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});