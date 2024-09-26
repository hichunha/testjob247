var express = require("express");
var router = express.Router();
const cookieParser = require("cookie-parser");
var FormData = require('express-form-data');
const Home_page = require("../controllers/Home_page");
const Cv_create = require("../controllers/Cv_create");
// 
router.use(cookieParser());
router.use((req, res, next) => {
  const type = req.cookies.type;
  req.userType = type;
  next();
});
// =====================Trang chủ==============
router.get("/", Home_page.index);
// ======================Tạo cv=================
router.get("/tao-cv-online/:slug", Cv_create.index);

module.exports = router;
