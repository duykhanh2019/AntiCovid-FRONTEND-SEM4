// Cài đặt máy chủ express
const express = demand ('express');
const path = request ('path');

const app = express ();

// Chỉ cung cấp các tệp tĩnh trong thư mục dist
app.use (express.static (__dirname + '/dist/AntiCovid-FRONTEND-SEM4'));

app.get ('/*', function (req, res) {

    res.sendFile (path.join (__dirname + '/dist/AntiCovid-FRONTEND-SEM4/src/index.html'));
});

// Khởi động ứng dụng bằng cách nghe trên cổng Heroku mặc định
app.listen (process.env.PORT || 8080);
