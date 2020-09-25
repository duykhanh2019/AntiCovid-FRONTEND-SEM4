// Cài đặt máy chủ express
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const app_path = './AntiCovid-FRONTEND-SEM4/src/';

// Chỉ cung cấp các tệp tĩnh trong thư mục dist
app.use('/', express.static(path.join(__dirname, app_path)));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, app_path, + 'index.html')));

// Khởi động ứng dụng bằng cách nghe trên cổng Heroku mặc định
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
