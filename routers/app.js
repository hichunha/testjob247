var express = require("express");
var router = express.Router();
const cookieParser = require("cookie-parser");
var FormData = require('express-form-data');
const Home_page = require("../controllers/Home_page");
const Cv_create = require("../controllers/Cv_create");
const profile = require("../controllers/profile");
const listCandidate = require("../controllers/listCandidate");
const candidateSubmissionSpecialist = require("../controllers/candidateSubmissionSpecialist")
const candidateDetails = require("../controllers/candidateDetails")
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

// ======================UV====================
router.get("/profile", profile.index);
router.get("/listCandidate", listCandidate.index);
router.get("/candidateSubmissionSpecialist", candidateSubmissionSpecialist.index)
router.get("/candidateDetails", candidateDetails.index)
module.exports = router;
