const axios = require('axios');
const { Call, getListCategoryUV, getInfoCvUser, UpdateInfoCv, DowloadFileCVPDF, InForAccount } = require("../function/functions_api");
const { setCookie, getCookie, getPlaceholdersCV, city_array, getInfoCV, rewrite_url_CV } = require('../function/functions');
const linkapi_candidate = process.env.DOMAIN_API_CANDIDATE;
const linkapi_cv = process.env.DOMAIN_API_CV;
const linkapi_user = process.env.DOMAIN_API_USER;
const versionSite = process.env.VERSION_SITE;
// Xử lý lấy dữ liệu và đổ dữ liệu về view
exports.index = async (req, res) => {
  const version = Math.floor(Date.now() / 1000),
    url = req.url,
    parts = url.split('/'),
    aliascv = parts[parts.length - 1],
    useType = (getCookie(req, 'userType') && getCookie(req, 'userType') != undefined) ? getCookie(req, 'userType') : '',
    useID = (getCookie(req, 'user_id') && getCookie(req, 'user_id') != undefined) ? getCookie(req, 'user_id') : 0,
    tmp_id = (getCookie(req, 'tmp_id') && getCookie(req, 'tmp_id') != undefined) ? getCookie(req, 'tmp_id') : 0;
  let typeregis = 1;
  let checkCvCreate = 0;
  // Nếu không phải ứng viên thì cho về trang chủ
  if (useType && useType != 2) { res.redirect("/"); }
  try {
    let data = {
      useslick: 0,
      useselect2: 1,
      version: versionSite
    };

    // ================lấy dữ liệu cv==================
    const response = await axios.post(linkapi_cv + '/api/Topcv247/cv/getInfoCV', { alias: aliascv });
    const dataFromAPI = response.data.data.data;
    let idCV = dataFromAPI.id,
      aliasCv = dataFromAPI.alias,
      lang_origin = parseInt(dataFromAPI.idlang),
      data_colorcv = dataFromAPI.colors.split(','),
      langcv = 1,
      created_cv = false,
      is_login = false;
    let cvthamkhaoo = dataFromAPI.cvthamkhao;
    // ====Kiểm tra xem lang ban đầu của cv có không nếu có thì lấy lang ban đầu không thì lấy từ cookie hoặc mặc định bằng 1======
    langcv = (lang_origin > 0) ? lang_origin : ((langcv > 0) ? langcv : 1);
    // ===================Lấy cookie lang=====================
    if (getCookie(req, 'langcv') !== undefined && getCookie(req, 'langcv') !== '' && getCookie(req, 'langcv') >= 0) {
      langcv = parseInt(getCookie(req, 'langcv'));
    }
    // =====Lấy mảng dữ liệu CV và CV mặc định (Nội dung cv gốc)==============
    let arr_html_lang = '';
    let arr_html_lang_default = '';
    // Khi ứng viên đăng nhập và đã có dữ liệu cv ứng viên đã tạo thì dùng API lấy dữ liệu cv ứng viên đã tạo
    if (useID > 0) {
      typeregis = 3;
      const datauser = {
        id: useID,
        idcv: idCV,
      }
      const InfoCvUser = await getInfoCvUser(datauser, 5000);
      const dataInfoCvUser = InfoCvUser.data.result;
      // Nếu ứng viên đã tạo cv này thì lấy dữ liệu của cv ra còn k thì lấy cv mặc định
      if (dataInfoCvUser && InfoCvUser.data.type == 1) {
        if (dataInfoCvUser.lang == langcv) {
          checkCvCreate = 1;
          arr_html_lang = JSON.parse(dataInfoCvUser.html);
          langcv = dataInfoCvUser.lang;
          if (langcv == 1) {
            arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_vi));
          } else if (langcv == 2) {
            arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_en));
          } else if (langcv == 3) {
            arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_jp));
          } else if (langcv == 4) {
            arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_cn));
          } else if (langcv == 5) {
            arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_kr));
          }
        } else {
          if (langcv == 1) {
            arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_vi));
          } else if (langcv == 2) {
            arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_en));
          } else if (langcv == 3) {
            arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_jp));
          } else if (langcv == 4) {
            arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_cn));
          } else if (langcv == 5) {
            arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_kr));
          }
        }
      } else {
        if (langcv == 1) {
          arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_vi));
        } else if (langcv == 2) {
          arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_en));
        } else if (langcv == 3) {
          arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_jp));
        } else if (langcv == 4) {
          arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_cn));
        } else if (langcv == 5) {
          arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_kr));
        }
      }
    } else {
      // Khi ứng viên chưa đăng nhập lấy dữ liệu sample cv (dùng cho luồng đăng ký ứng viên -> tạo cv và ứng viên tạo cv -> đăng ký)
      if (langcv == 1) {
        arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_vi));
      } else if (langcv == 2) {
        arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_en));
      } else if (langcv == 3) {
        arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_jp));
      } else if (langcv == 4) {
        arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_cn));
      } else if (langcv == 5) {
        arr_html_lang = arr_html_lang_default = JSON.parse(JSON.stringify(dataFromAPI.html_kr));
      }
    }
    // ===============Lấy dữ liệu menu_html và block_html Từ mảng arr_html_lang bên trên===========
    let menu_html = [];
    let block_html = [];
    if (arr_html_lang.menu) {
      arr_html_lang.menu.forEach(menu => {
        menu_html[menu.order] = {
          title: menu.content.title,
          id: menu.id,
          class: 'block cvo-block',
          content: '',
          status: menu.status
        };
        if (menu.content.content.type === 'profile') {
          menu_html[menu.order].class += ' box-contact';
          menu_html[menu.order].type = 'profile';
          menu_html[menu.order].content = menu.content.content.content;
        } else if (menu.content.content.type === 'skill') {
          menu_html[menu.order].class += ' box-skills';
          menu_html[menu.order].type = 'skill';
          menu_html[menu.order].content = menu.content.content.skills;
        } else {
          menu_html[menu.order].content = menu.content.content;
        }
      });
    }
    if (arr_html_lang.experiences) {
      arr_html_lang.experiences.forEach(block => {
        block_html[block.order] = {
          id: block.id,
          title: block.content.title,
          status: block.status,
          content: block.content.content
        };
      });
    }
    // ===============Lấy dữ liệu menu_html_default và block_html_default Từ mảng arr_html_lang_default bên trên (CV gốc)===========
    var menu_html_default = [];
    var block_html_default = [];
    if (arr_html_lang_default.menu) {
      arr_html_lang_default.menu.forEach(menu => {
        var menuObj = {};
        var menuContent = menu.content.content;
        menuObj.title = menu.content.title;
        menuObj.id = menu.id;
        menuObj.class = 'block cvo-block';
        if (menuContent.type === 'profile') {
          menuObj.class += ' box-contact';
          menuObj.type = 'profile';
          menuObj.content = menuContent.content;
          let menu_content = menu.content.content.content;
          if (!created_cv) {
            menu_content.email = '';
            menu_content.phone = '';
            menu_content.address = '';
            if (is_login) {
              if (user.use_phone !== '') {
                menu_content.phone = user.use_phone;
              }
              if (user.address !== '') {
                menu_content.address = user.address;
              }
              email = menu_content.email = user.use_mail;
            }
          }
        } else if (menuContent.type === 'skill') {
          menuObj.class += ' box-skills';
          menuObj.type = 'skill';
          menuObj.content = menuContent.skills;
        } else if (menuContent.type === 'project') {
          menuObj.class += ' box-project';
          menuObj.type = 'project';
          menuObj.content = menuContent.projects;
        } else {
          menuObj.content = menuContent;
        }

        menuObj.status = menu.status;
        menu_html_default.push(menuObj);
      });
    }
    if (arr_html_lang_default.experiences) {
      arr_html_lang_default.experiences.forEach(block => {
        var blockObj = {};
        var blockContent = block.content.content;
        blockObj.id = block.id;
        blockObj.title = block.content.title;
        blockObj.status = block.status;
        if (blockContent.type === 'profile') {
          blockObj.class = 'box-contact';
          blockObj.type = 'profile';
          blockObj.content = blockContent.content;
        } else if (blockContent.type === 'skill') {
          blockObj.class = 'box-skills';
          blockObj.type = 'skill';
          blockObj.content = blockContent.skills;
        } else if (blockContent.type === 'project') {
          blockObj.class = 'box-projects';
          blockObj.type = 'project';
          blockObj.content = blockContent.projects;
        } else {
          blockObj.content = blockContent;
        }
        block_html_default.push(blockObj);
      });
    }
    // =======================PLACEHOLDER CHO CV============================================
    placeholders = getPlaceholdersCV(langcv);
    // =======================Dữ liệu cv==========================================
    let position = arr_html_lang.position,
      avatar = arr_html_lang.avatar,
      cv_title = arr_html_lang.cv_title,
      introduction = arr_html_lang.introduction,
      color_active = arr_html_lang.css.color,
      font_active = arr_html_lang.css.font,
      font_size_active = arr_html_lang.css.font_size,
      font_spacing_active = arr_html_lang.css.font_spacing;
    let font_size_activeint = '';
    if (font_size_active == 'small') {
      font_size_activeint = 1;
    } else if (font_size_active == 'normal') {
      font_size_activeint = 2;
    } else if (font_size_active == 'large') {
      font_size_activeint = 3;
    }

    let font_spacing_activeint = '';
    if (font_spacing_active == 'small') {
      font_spacing_activeint = 1;
    } else if (font_spacing_active == 'normal') {
      font_spacing_activeint = 2;
    } else if (font_spacing_active == 'large') {
      font_spacing_activeint = 3;
    }
    let data_cv = {
      lang_origin,
      langcv,
      idCV,
      uID:(useID) ? useID : 0,
      cv_title,
      color_active,
      font_active,
      font_size_active,
      font_size_activeint,
      font_spacing_active,
      font_spacing_activeint,
      data_colorcv
    };
    // =======================Dữ liệu ứng viên==========================================
    let fullname = '', namefull = '', address = '', phone = '', email = '';
    // Nếu có tmp_user thì lấy dữ liệu ứng viên từ bảng tmp
    if (tmp_id > 0) {
      const getInfoTmp = await Call(linkapi_user + '/api/Topcv247/user/getInfoUserTmp', { tmp_id });
      if (Object.keys(getInfoTmp.data.data).length > 0) {
        var infoTmp = getInfoTmp.data.data;
      }
      typeregis = 2;
    }
    if (infoTmp) {
      fullname = infoTmp.tmp_name;
      namefull = infoTmp.tmp_name;
      address = '';
      phone = (infoTmp.tmp_phone_tk) ? infoTmp.tmp_phone_tk : infoTmp.tmp_phone;
      email = (infoTmp.tmp_email) ? infoTmp.tmp_email : infoTmp.tmp_email_lh;
      position = infoTmp.tmp_job_name;
      account = (infoTmp.tmp_email) ? infoTmp.tmp_email : infoTmp.tmp_phone_tk;
    } else {
      // Nếu có không có tmp_user thì lấy dữ liệu ứng viên theo cv
      fullname = arr_html_lang.name;
      namefull = arr_html_lang.name;
      address = arr_html_lang.menu[0].content.content.content.address;
      phone = arr_html_lang.menu[0].content.content.content.phone;
      email = arr_html_lang.menu[0].content.content.content.email;
      account = email;
    }
    let data_uv = {
      avatar,
      namefull,
      fullname,
      position,
      phone,
      email,
      address,
      introduction,
      tmp_id,
      useID,
      account,
    };
    // ==========lấy dữ liệu ngành nghề tỉnh thành để đăng ký============
    const cate_array = await getListCategoryUV();
    const objectregisteruv = { city_array, cate_array }
    // trả về view 
    // Hàm Lấy dữ liệu Tài khoản đổ ra header
const DataAccount = await InForAccount(req, res);
    return res.render('create_cv', {
      version,
      typeregis,
      checkCvCreate,
      url,
      placeholders,
      data_uv,
      aliasCv,
      data,
      data_cv,
      menu_html,
      block_html,
      menu_html_default,
      block_html_default,
      objectregisteruv,
      DataAccount,
      cvthamkhaoo,
      rewrite_url_CV
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      result: false,
      message: error.response ? error.response.data : error.message
    });
  }
}
// Đoạn mã xử lý upload ảnh trong controller của bạn
exports.uploadImgCv = async (req, res) => {
  const image64 = req.body.img64;
  try {
    const timeout = 5000;
    const url = linkapi_user + '/api/Topcv247/user/uploadAvatarCV';
    const token = '';
    const formData2 = {
      image64: image64
    }
    // Sử dụng:
    let result = await Call(url, formData2, token, timeout, false)
    result = result.data.img;
    return res.json(result);
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};
// Cập nhập cv ứng viên
exports.UpdateInfoCv = async (req, res) => {
  try {
    const { idcv, dataCVJson, lang, height_cv } = req.body;
    var result = {
      result: false,
      message: 'Đã có lỗi xảy ra'
    };
    let dataapi = {
      html: dataCVJson,
      idcv: idcv,
      lang: lang,
      height_cv: height_cv,
    }
    let timeout = 10000;
    let token = getCookie(req, "tokentcvvn");
    const Token = `Bearer ${token}`;
    if (token && idcv && dataCVJson && lang && height_cv) {
      const savecv = await UpdateInfoCv(dataapi, Token, timeout);
      if (savecv && savecv.result) {
        result = {
          result: true,
          data: savecv.base64StringPDF,
          userName: 'cv_uv_' + savecv.use_id,
          message: "Cập nhập thành công"
        }
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      result: false,
      message: error.response ? error.response.data : error.message
    });
  }
};
// Tải cv
exports.DowloadFileCVPDF = async (req, res) => {
  try {
    const { idcv, uid } = req.body;
    var result = {
      result: false,
      message: 'Đã có lỗi xảy ra'
    };
    let user_id = ''
    if (uid) {
      user_id = uid;
    } else {
      user_id = getCookie(req, "user_id");
    }
    if (user_id && idcv) {
      let dataapi = {
        iduv: user_id,
        id: idcv,
      }
      let timeout = 30000;
      const dataPDF = await DowloadFileCVPDF(dataapi, timeout);
      if (dataPDF && dataPDF.result) {
        result = {
          result: true,
          data: dataPDF.base64StringPDF,
          userName: 'cv_uv_topcvvn',
          message: "Cập nhập thành công"
        }
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      result: false,
      message: error.response ? error.response.data : error.message
    });
  }
};
// xem anh cv png
exports.ShowCvImg = async (req, res) => {
  const version = Math.floor(Date.now() / 1000),
    url = req.url;
  const { iduv, idcv, type } = req.params;
  try {
    if (iduv && idcv) {
      let data = {
        useslick: 0,
        useselect2: 0,
        version: 1,
      }
      const getcv = await Call(linkapi_candidate + '/api/Topcv247/candidate/DetailCV', {
        idcv: idcv,
        id: iduv
      });
      let infoCV = getInfoCV(getcv, type),
        data_uv = infoCV.data_uv,
        placeholders = infoCV.placeholders,
        aliasCv = infoCV.data_cv.aliasCv;
      let data_cv = infoCV.data_cv;
      let menu_html = infoCV.menu_html;
      let block_html = infoCV.block_html;
      return res.render('show_cv_img', { version, placeholders, menu_html, block_html, data_uv, aliasCv, data, data_cv });
    }
  } catch (error) {
    return res.status(error.status).send('Error fetching data');
  }
}
// xem anh cv pdf
exports.ShowCvPdf = async (req, res) => {
  const version = Math.floor(Date.now() / 1000),
    url = req.url;
  const { iduv, idcv } = req.params;
  try {
    if (iduv && idcv) {
      let data = {
        useslick: 0,
        useselect2: 0,
        version: 1,
      }
      const getcv = await Call(linkapi_candidate + '/api/Topcv247/candidate/DetailCV', {
        idcv: idcv,
        id: iduv
      });
      let infoCV = getInfoCV(getcv, 0),
        data_uv = infoCV.data_uv,
        placeholders = infoCV.placeholders,
        aliasCv = infoCV.data_cv.aliasCv;
      let data_cv = infoCV.data_cv;
      let menu_html = infoCV.menu_html;
      let block_html = infoCV.block_html;
      let menu_html_default = [],
        block_html_default = [];
      return res.render('show_cv_pdf', { version, placeholders, menu_html, block_html, data_uv, aliasCv, data, data_cv, menu_html_default, block_html_default });
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};
// xoa
exports.DeleteCandidateCV = async (req, res) => {
  const { uid, idcv} = req.body;
  try {
    if (uid && idcv) {
      console.log(uid , idcv);
      let timeout = 5000;
      let formData = {
        idcv: idcv,
        iduser: uid
      }
      let url = linkapi_cv + "/api/Topcv247/cv/DeleteCandidateCV";
      const token = getCookie(req, "tokentcvvn");
      const Token = `Bearer ${token}`;
      const respon = await Call(url, formData, Token, timeout, false);
      return res.json(respon);
    }
  } catch (error) {
    return res.status(error.status).send('Error fetching data');
  }
}