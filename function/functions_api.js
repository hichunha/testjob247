//Define functions
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data');
const { rejects } = require("assert");
const { rewrite_url_company, rewriteUV, getCookie } = require("../function/functions");
const { token } = require('morgan');
const linkapi_candidate = process.env.DOMAIN_API_CANDIDATE;
const linkapi_ntd = process.env.DOMAIN_API_NTD;
const linkapi_new = process.env.DOMAIN_API_NEW;
const linkapi_cv = process.env.DOMAIN_API_CV;
const linkapi_user = process.env.DOMAIN_API_USER;
// 
const callAPI = async (url, data, token = '', timeout = 0, isFormData = false, headers) => {
  try {
    const formData = new FormData();
    if (!isFormData) {
      for (const [key, value] of Object.entries(data)) {
        if (key === 'CV' || key === 'Image' || key === "Logo" || key === "avatar") {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }
    }
    const body = isFormData ? data : formData;
    const response = await axios.post(url, body, {
      headers: {
        ...headers,
        "authorization": token
      },
      timeout: timeout,
      contentType: false,
      processData: false,
    })
    return response;
  } catch (err) {
    const error = {
      message: err.response?.data.error.message || err,
      code: err.response?.data.code || 500,
      result: err.response?.data.result || null
    }
    throw error
  }
}
// 
const Call = async (url, data, token = '', timeout = 0, isFormData = false, headers) => {
  try {
    const response = await callAPI(url, data, token, timeout, isFormData, headers);
    return response.data;
  } catch (error) {
    throw error
  }
}
// 
async function SaveNew(req, res) {
  try {
    const token = req.headers.authorization;
    const { id_tin } = req.body;
    const data = await Call(linkapi_candidate + '/api/Topcv247/candidate/SaveNew', {
      id_tin,
    }, token, 0);
    return res.status(200).json(data.data)
  } catch (err) {
    return res.status(err.code).send({ message: err.message })
  }
}
// 
async function getListTag(req, res) {
  try {
    const token = req.headers.authorization;
    const { id, alias } = req.body;
    const data = await Call('http://43.239.223.55:3003/api/jobgo365/New/getTagCate', {
      id, alias
    }, token, 0);
    return res.status(200).json(data.data.data)
  } catch (err) {
    return res.status(err.code).send({ message: err.message })
  }
}
// Lấy ngành nghề
async function getListCate() {
  try {
    const response = await axios.post(linkapi_new + '/api/Topcv247/new/getJob', {});
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy ngành nghề ứng viên
async function getListCategoryUV() {
  try {
    const response = await axios.post(linkapi_candidate + '/api/Topcv247/candidate/GetCategoryUV', {});
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy ngành nghề
async function getListTagNew() {
  try {
    const response = await axios.post(linkapi_new + '/api/Topcv247/new/getTagNew', {});
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// 
async function getCategoryidByAlias(cateStr) {
  const cate_arr = await getListCategoryUV();
  const cate = cate_arr.find(cate => cate.cat_user_alias == cateStr);
  return cate ? cate.cat_user_id : '0';
}
// 
async function getListCateCv() {
  try {
    const response = await axios.post(linkapi_cv + '/api/Topcv247/cv/getNganhCv', {});
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// 
async function getLangCv() {
  try {
    const response = await axios.post(linkapi_cv + '/api/Topcv247/cv/getLangCv', {});
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// 
async function getListCity() {
  try {
    const response = await axios.post(linkapi_new + '/api/Topcv247/new/getCity', {});
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// 
async function get_district(id) {
  try {
    const response = await axios.post(linkapi_new + '/api/Topcv247/new/getDistrict', {
      id: id
    });
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// 
async function getDistrictByArrCity(id) {
  try {
    const response = await axios.post(linkapi_new + '/api/Topcv247/new/getDistrictByArrCity', { city_id: id });
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// 
async function check_account_register(data, timeout) {
  try {
    const response = await axios.post(linkapi_user + '/api/Topcv247/user/CheckAccountTK', data, timeout);
    return response.data.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy dữ liệu NTD Hoặc UV
async function InForAccount(req, res) {
  try {
    const user_id = req.cookies.user_id;
    const userType = req.cookies.userType;
    const tokentcvvn = req.cookies.tokentcvvn;
    // Kiểm tra xem tài khoản là ứng viên hay NTD
    dataAccount = {
      islogin: 0,
      data: {
        us_name: '',
        us_logo: '',
        us_link: '',
        us_account: '',
        us_active: 0,
        us_id: '',
        active_account: '',
        us_show: '',
      },
      type: '',
    };
    if (user_id && user_id > 0) {
      // gọi đến API Lấy dữ liệu ứng viên
      if (userType == 2) {
        let dataUser = await Call(linkapi_candidate + '/api/Topcv247/candidate/DetailCandiAll', { id: user_id }, '', 10000);
        if (dataUser.data.result) {
          let linkaccount = rewriteUV(user_id, dataUser.data.data.use_name);
          let phoneTK = dataUser.data.data.use_phone_tk;
          let emailTK = dataUser.data.data.use_mail;
          let authentic = dataUser.data.data.use_authentic;
          let use_show = dataUser.data.data.use_show;
          // kiểm tra xem có cookie này k nếu có thì ẩn popup xác thực
          let active_account = (getCookie(req, "active_account")) ? getCookie(req, "active_account") : '';
          let dataall = {
            us_name: dataUser.data.data.use_name,
            us_logo: dataUser.data.data.use_logo,
            us_link: linkaccount,
            us_account: phoneTK,
            phoneTK: phoneTK,
            emailTK: emailTK,
            us_active: authentic,
            us_id: user_id,
            active_account: active_account,
            us_show: use_show,
          }
          dataAccount = {
            islogin: 1,
            data: dataall,
            type: userType,
          };
        }
      } else if (userType == 1) {
        // gọi đến API Lấy dữ liệu nhà tuyển dụng
        let dataUser = await Call(linkapi_ntd + '/api/Topcv247/ntd/DetailNTD', { id: user_id }, '', 10000);
        if (dataUser.data.result) {
          let linkaccount = rewrite_url_company(user_id, dataUser.data.data.usc_company, dataUser.data.data.usc_alias);
          let phoneTK = dataUser.data.data.usc_phone_tk;
          let emailTK = dataUser.data.data.usc_email;
          let authentic = dataUser.data.data.usc_authentic;
          let dataall = {
            us_name: dataUser.data.data.usc_company,
            us_logo: dataUser.data.data.usc_logo,
            us_link: linkaccount,
            us_account: phoneTK,
            phoneTK: phoneTK,
            emailTK: emailTK,
            us_active: authentic,
            us_id: user_id,
          }
          dataAccount = {
            islogin: 1,
            data: dataall,
            point: dataUser.data.point,
            type: userType,
          };
        }
      }
    }
    return dataAccount;
  } catch (error) {
    return res.status(error.code).send({ message: error.message })
  }
}
// Linh
async function homepage(token, timeout) {
  try {
    const response = await Call(linkapi_new + '/api/Topcv247/new/Home', {}, token, timeout, true);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Page cv
async function Cvhomepage(page, idnganh, idlang, sortOption, topic, timeout, Token) {
  try {
    const data = {
      page: page,
      idnganh: idnganh,
      idlang: idlang,
      sortOption: sortOption,
      topic: topic
    };
    const response = await Call(linkapi_cv + '/api/Topcv247/cv/ListSampleCV', data, Token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Page tìm việc làm
async function findjd(name, address, nameWork, salary, gioiTinh, district, exp, capBac, edu, fomati, page, sort, Token, timeout) {
  try {
    const data = {
      ...(page && page !== 0 && { page: page }),
      ...(name && name !== 0 && { name: name }),
      ...(address && address !== 0 && { address: address }),
      ...(nameWork && nameWork !== 0 && { nameWork: nameWork }),
      ...(salary && salary !== 0 && { salary: salary }),
      ...(gioiTinh && gioiTinh !== 0 && { gioiTinh: gioiTinh }),
      ...(district && district !== 0 && { district: district }),
      ...(exp && exp !== 0 && { exp: exp }),
      ...(capBac && capBac !== 0 && { capBac: capBac }),
      ...(edu && edu !== 0 && { edu: edu }),
      ...(fomati && fomati !== 0 && { fomati: fomati }),
      ...(sort && sort !== 0 && { sort: sort })
    };
    const response = await Call(linkapi_new + '/api/Topcv247/new/SearchNew', data, Token, timeout, true);
    return response.data;
  } catch (error) {
    return res.status(error.code).send({ message: error.message })
  }
}
//lay tin phu hop
async function get_fitjob(nganhNghe2, Token, timeout) {
  try {
    const data = {
      nganhNghe2: nganhNghe2
    };
    const response = await Call(linkapi_new + '/api/Topcv247/new/SearchNew', data, Token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
//lay thong tin user
async function getUser(id, timeout) {
  try {
    const data = {
      id: id,
    };
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/DetailCandi', data, '', timeout, true);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// ham đăng ký tài khoản bước 1 (tạo cv sau đó đăng ký tài khoản)
async function registeruvb1(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/RegisterCandidate', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// ham đăng ký  (đăng ký tài khoản sau đó tạo cv)
async function CandidateRegisterByCVOnline(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/CandidateRegisterByCVOnline', data, '', timeout);
    return response;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// hàm đăng ký (tải file)
async function CandidateRegisterByUploadCV(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/CandidateRegisterByUploadCV', data, '', timeout, true);
    return response;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// ham đăng ký (tạo cv sau đó đăng ký tài khoản)
async function CreateCVInOrderToRegister(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/CreateCVInOrderToRegister', data, '', timeout);
    return response;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy dữ liệu tmp ứng viên
async function getDataTmp(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/RegisterCandidate', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy dữ liệu cv ứng viên
async function getInfoCvUser(data, timeout) {
  try {
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/DetailCV', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Sửa CV
async function UpdateInfoCv(data, token, timeout) {
  try {
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/UpdateInfoCv', data, token, timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
//Tai cv PDF 
async function DowloadFileCVPDF(data, timeout) {
  try {
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/DowloadFileCVPDF', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy dữ liệu cv đã tạo (page cv đã tạo)
async function ManageCvCandiDidCreated(data, token, timeout) {
  try {
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/ManageCvCandiDidCreated', data, token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// thich hoac huy thich cv
async function SaveCV(data, token, timeout) {
  try {
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/SaveCV', data, token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Chi tiết tin tuyển dụng
async function getSelectedJob(inputjobid) {
  let formData = {
    id: inputjobid
  }
  try {
    const timeout = 5000;
    const response = await Call(linkapi_new + "/api/Topcv247/new/DetailNew",
      formData,
      "",
      timeout
    );
    const onejob = response.data.data;
    return onejob;
  } catch (error) {
    return res.status(error.code).send({ message: error.message })
  }
}
// Xác thực tài khoản
async function AuthenAccount(data, token, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/AuthenAccount', data, token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Đếm số lượng OTP
async function UseForgotPass(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/UseForgotPass', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Đếm số lượng OTP
async function CheckAcountUse(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/CheckAcountUse', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Xem thông tin ứng viên
async function ViewCandidateInformation(data, token, timeout) {
  try {
    const response = await Call(linkapi_ntd + '/api/Topcv247/ntd/ViewCandidateInformation', data, token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Blog
// Lấy danh mục blog bằng alias
async function GetCateBlogByAlias(data, timeout) {
  try {
    const response = await Call(linkapi_new + '/api/Topcv247/new/GetCateBlogByAlias', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lấy bài viết danh mục blog
async function GetPostCateBlog(data, timeout) {
  try {
    const response = await Call(linkapi_new + '/api/Topcv247/new/BlogCateChild', data, '', timeout);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Ẩn hiện tìm kiếm ứng viên
async function settingDisplay(token, timeout) {
  try {
    const response = await Call(linkapi_candidate + '/api/Topcv247/candidate/settingDisplay', '', token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Lưu lại lịch sử gọi OTP
async function HistoryCountOTP(dataapi, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/HistoryCountOTP', dataapi, '', timeout, true);
    return response.data;
  } catch (error) {
    throw error;
  }
}
// Xac thực mã otp
async function ConfirmOTPByAccount(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/ConfirmOTPByAccount', data, '', timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Xac thực mã otp luồng quên mật khẩu
async function ConfirmOTPForgotPass(data, timeout) {
  try {
    const response = await Call(linkapi_user + '/api/Topcv247/user/ConfirmOTPForgotPass', data, '', timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
// Xac thực mã otp luồng quên mật khẩu
async function listSaveNewUser(token, timeout) {
  try {
    const response = await Call(linkapi_new + '/api/Topcv247/new/checkSaveNew', '', token, timeout, true);
    return response.data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
}
module.exports = {
  Call,
  SaveNew,
  getListTag,
  getListCity,
  get_district,
  getDistrictByArrCity,
  getListCate,
  getListCategoryUV,
  getListTagNew,
  getCategoryidByAlias,
  getListCateCv,
  getLangCv,
  check_account_register,
  registeruvb1,
  CandidateRegisterByCVOnline,
  CandidateRegisterByUploadCV,
  CreateCVInOrderToRegister,
  homepage,
  Cvhomepage,
  findjd,
  get_fitjob,
  getUser,
  getSelectedJob,
  getDataTmp,
  getInfoCvUser,
  UpdateInfoCv,
  DowloadFileCVPDF,
  InForAccount,
  ManageCvCandiDidCreated,
  SaveCV,
  AuthenAccount,
  UseForgotPass,
  CheckAcountUse,
  ViewCandidateInformation,
  GetCateBlogByAlias,
  GetPostCateBlog,
  settingDisplay,
  HistoryCountOTP,
  ConfirmOTPByAccount,
  ConfirmOTPForgotPass,
  listSaveNewUser
}