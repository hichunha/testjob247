const express = require('express');
const app = express();
const path = require('path');

// Thiết lập EJS làm template engine
app.set('view engine', 'ejs');

// Định nghĩa đường dẫn cho các file EJS
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'Public')));

// Tạo route để render file EJS
app.get('/', (req, res) => {
    res.render('list_comp');
});


// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
