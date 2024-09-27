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
const managementUV = require("../controllers/managementUV")
const cvApplied = require("../controllers/cvApplied")
const managementCV = require("../controllers/managementCV")
const hintWork = require("../controllers/hintWork")
const changeThePassWord = require("../controllers/changeThePassWord")

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
router.get("/managementUV",managementUV.index)
router.get("/managementCV",managementCV.index)
router.get("/cvApplied",cvApplied.index)
router.get("/hintWork",hintWork.index)
router.get("/changeThePassWord",changeThePassWord.index)
module.exports = router;
