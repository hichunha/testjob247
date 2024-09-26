var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var logger = require('morgan')
var compression = require('compression')
const rateLimit = require('express-rate-limit')
const env = require('dotenv').config()
var FormData = require('express-form-data')
var Site = express()

// Gọi hàm configureApp() để thiết lập cấu hình cho ứng dụng Express Site. Cấu hình bao gồm:
// Thiết lập view engine là ejs.
// Sử dụng express.json() và express.urlencoded() để xử lý dữ liệu gửi đến từ client.
// Sử dụng cookieParser() để xử lý cookie.
// Sử dụng cors() để xử lý CORS.
// Thiết lập địa chỉ proxy tin cậy.
// Thiết lập thư mục public để chứa các tài nguyên tĩnh (ví dụ: hình ảnh, CSS, JavaScript).
// Xác định một middleware để thiết lập biến currentUrl trong đối tượng res.locals.
// Sử dụng compression để nén dữ liệu trước khi gửi về client.

function configureApp(app) {
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    // app.use(logger('dev'));
    // app.use(logger('combined'))
    app.set('trust proxy', '127.0.0.1');
    //   AppTimviec.use(express.json({ limit: '100mb' }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false, limit: '10mb' }))
    app.use(cookieParser())
    app.use(cors())

    app.use(express.static(path.join(__dirname, 'public')));
    app.use((req, res, next) => {
        res.locals.currentUrl = req.originalUrl;
        next();
    });

    function shouldCompress(req, res) {
        if (req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
    app.use(compression({ filter: shouldCompress }))

    app.use(function (err, req, res, next) {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}
        res.status(err.status || 500)
        res.render('error')
    })
}

// Gọi hàm errorApp() để quản lý xử lý lỗi trong ứng dụng. Nó định nghĩa hai middleware:
// Middleware xử lý lỗi 404 (Not Found).
// Middleware xử lý các lỗi khác, hiển thị thông báo lỗi và render trang lỗi tương ứng.

function errorApp(app) {
    app.use(function (req, res, next) {
        // next(createError(404))
        res.redirect("/404");
    })
    app.use(function (err, req, res, next) {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}
        res.status(err.status || 500)
        res.render(err.message);
    })
}

// Đăng ký một tuyến đường /public để phục vụ các tài nguyên tĩnh từ thư mục public.
// Đăng ký router từ tệp ./routers/app cho tất cả các tuyến đường bắt đầu bằng /.
// Cuối cùng, ứng dụng sẽ lắng nghe trên cổng được xác định trong biến môi trường PORT hoặc cổng 1208 nếu không có giá trị được xác định.

Site.use('/public', express.static('public'));
Site.use('/maucv', express.static('views/maucv/'));
// Cấu hình Site
configureApp(Site)
var router = require('./routers/app');
Site.use('/', router)
errorApp(Site);
const PORT = process.env.PORT || 3000
Site.listen(PORT, () => {
    console.log(`Site is running on: 3000}`);
})