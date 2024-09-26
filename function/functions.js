// Hàm setCookie
const setCookie = (res, name, value, options = {}) => {
  res.cookie(name, value, options);
};
// Hàm getCookie
const getCookie = (req, name) => {
  return req.cookies[name];
};
// Hàm xóa cookie
const deleteCookie = (res, name) => {
  res.clearCookie(name);
};
//Kiểm tra token còn hạn
const checkLogged = (req, res) => {
  const tokentcvvn = getCookie(req, 'tokentcvvn');
  const userType = getCookie(req, 'userType');
  const user_id = getCookie(req, 'user_id');
  if (!tokentcvvn || !userType || !user_id) {
    res.redirect('/');
    return false;
  }
  return true;
};
// Kiểm tra authentic
const checkAuthentic = (res, req, DataAccount) => {
  const user_id = getCookie(req, 'user_id');
  const userType = getCookie(req, 'userType');
  if (user_id && userType == 1 && DataAccount.data.us_active == 0) {
    return res.redirect('/xac-thuc-tai-khoan');
  }
};
// Place hoder của cv
const getPlaceholdersCV = (lang) => {
  let placeholders = {};
  switch (lang) {
    case 2:
      placeholders = {
        holder_title_cv: "CV - TopCvVn",
        holder_name: "Full name",
        holder_birthday: "Birthday",
        holder_sex: "Gender",
        holder_phone: "Telephone number",
        holder_email: "Email",
        holder_address: "Address",
        holder_face: "Website (FB)",
        holder_job: "Job position",
        holder_skill: "skills",
        holder_box_title: "Title",
        holder_tool_add: "Add",
        holder_tool_edit: "Edit",
        holder_tool_del: "Delete",
        holder_box_content: "Content",
        holder_block_title: "Heading",
        holder_block_cp_name: "Company name",
        holder_block_time: "Working time",
        holder_block_job: "Job position",
        holder_block_job_info: "Job description and task achievements.",
      };
      break;
    case 3:
      placeholders = {
        holder_title_cv: "CV - TopCvVn",
        holder_name: "氏名",
        holder_birthday: "生年",
        holder_sex: "性別",
        holder_phone: "電話番号",
        holder_email: "Eメール",
        holder_address: "住所",
        holder_face: "ウェブサイト（FB)",
        holder_job: "応募仕事",
        holder_skill: "技能",
        holder_box_title: "タイトル",
        holder_tool_add: "追加",
        holder_tool_edit: "編集",
        holder_tool_del: "削除",
        holder_box_content: "内容",
        holder_block_title: "大きい項目タイトル",
        holder_block_cp_name: "会社名",
        holder_block_time: "勤務期間",
        holder_block_job: "職位",
        holder_block_job_info: "職歴の詳細内容",
      };
      break;
    case 4:
      placeholders = {
        holder_title_cv: "CV - TopCvVn",
        holder_name: "全名",
        holder_birthday: "生日",
        holder_sex: "性别",
        holder_phone: "电话号码",
        holder_email: "邮箱",
        holder_address: "地址",
        holder_face: "网站",
        holder_job: "想应聘的岗位",
        holder_skill: "技能",
        holder_box_title: "标题",
        holder_tool_add: "加",
        holder_tool_edit: "修改",
        holder_tool_del: "删除",
        holder_box_content: "内容",
        holder_block_title: "大题目",
        holder_block_cp_name: "公司名称",
        holder_block_time: "工作时间",
        holder_block_job: "工作岗位",
        holder_block_job_info: "描述具体工作, 在工作期间所得到的收获",
      };
      break;
    case 5:
      placeholders = {
        holder_title_cv: "CV - TopCvVn",
        holder_name: "성명",
        holder_birthday: "년생 ",
        holder_sex: "성별 ",
        holder_phone: "전화번호 ",
        holder_email: "메일",
        holder_address: "주소 ",
        holder_face: "홈페이지  (페이스북)",
        holder_job: "지원하고 싶은 위치",
        holder_skill: "기술",
        holder_box_title: "제목",
        holder_tool_add: "추가",
        holder_tool_edit: "수정",
        holder_tool_del: "삭제",
        holder_box_content: "내용",
        holder_block_title: "큰 제목",
        holder_block_cp_name: "회사명",
        holder_block_time: "근무시간",
        holder_block_job: "작업 위치",
        holder_block_job_info: " 업무에서 달성되는 업무 세부 사항을 설명한다.",
      };
      break;
    default:
      placeholders = {
        holder_title_cv: "CV - TopCvVn",
        holder_name: "Họ tên",
        holder_birthday: "Ngày sinh",
        holder_sex: "Giới tính",
        holder_phone: "Điện thoại",
        holder_email: "Email",
        holder_address: "Địa chỉ",
        holder_face: "Website",
        holder_job: "Vị trí công việc bạn muốn ứng tuyển",
        holder_skill: "Kỹ năng",
        holder_box_title: "Tiêu đề",
        holder_tool_add: "Thêm",
        holder_tool_edit: "Sửa",
        holder_tool_del: "Xóa",
        holder_box_content: "Nội dung",
        holder_block_title: "Tiêu đề mục lớn",
        holder_block_cp_name: "Tên công ty",
        holder_block_time: "Thời gian làm việc",
        holder_block_job: "Vị trí công việc",
        holder_block_job_info: "Mô tả chi tiết công việc, những gì đạt được trong quá trình làm việc.",
      };
      break;
  }
  return placeholders;
};
// List ngôn ngữ cv
const listLangcv = (type) => {
  const array = [
    { lang: "vi", html_lang: "html_vi" },
    { lang: "en", html_lang: "html_en" },
    { lang: "jp", html_lang: "html_jp" },
    { lang: "cn", html_lang: "html_cn" },
    { lang: "kr", html_lang: "html_kr" },
  ];
  if (type != null || type === 0) {
    return array[type];
  } else {
    return array;
  }
};
// 
function removeAccent(mystring) {
  // Vietnamese characters and their non-accented equivalents
  const marTViet = [
    "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ",
    "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ",
    "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ",
    "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ",
    "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
    "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
    "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
    "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ", "'"
  ];

  const marKoDau = [
    "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
    "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
    "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "d",
    "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
    "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
    "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y", "d", ""
  ];

  // Replace accented characters with their non-accented counterparts
  return marTViet.reduce((str, char, index) => {
    return str.replace(new RegExp(char, 'g'), marKoDau[index]);
  }, mystring);
}
// 
function replaceTitle(title) {
  // Decode HTML entities (dummy function for representation)
  title = title.replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');

  // Remove accents
  title = removeAccent(title);
  title = title.replace(/\//g, '');
  title = title.replace(/[^\x00-\xFF]+/g, '');

  // Check for Han characters
  const hasHan = /[\u4E00-\u9FFF]/.test(title);

  if (hasHan) {
    title = title.replace(/ /g, '-');
  } else {
    const arrStr = [
      "&lt;", "&gt;", "/", " / ", "\"", "&apos;", "&quot;", "&amp;",
      "lt;", "gt;", "apos;", "quot;", "amp;", "&lt", "&gt", "&apos", "&quot", "&amp", "&#34;", "&#39;", "&#38;", "&#60;", "&#62;"
    ];

    arrStr.forEach(str => {
      title = title.replace(new RegExp(str, 'g'), ' ');
    });

    title = title.replace(/[\\p{P}|\p{S}]/gu, ' ');
    title = title.replace(/[^0-9a-zA-Z\s]+/g, ' ');

    // Remove multiple spaces
    title = title.replace(/\s+/g, ' ').trim();

    title = title.replace(/ /g, '-');
    title = encodeURIComponent(title);

    // Remove specific characters after URL encoding
    const arrayApter = ["%0D%0A", "%", "&", "---"];
    arrayApter.forEach(str => {
      title = title.replace(new RegExp(str, 'g'), '-');
    });

    title = title.toLowerCase();
  }

  return title;
}
// Hàm chuyển đổi thời gian sang dạng số ngày, số phút, số giây
function lay_tgian(tgian) {
  let tg = Math.floor(Date.now() / 1000) - tgian; // Get the difference in seconds
  let thoi_gian;

  if (tg > 0) {
      if (tg < 60) {
          thoi_gian = tg + ' giây';
      } else if (tg >= 60 && tg < 3600) {
          thoi_gian = Math.floor(tg / 60) + ' phút';
      } else if (tg >= 3600 && tg < 86400) {
          thoi_gian = Math.floor(tg / 3600) + ' giờ';
      } else if (tg >= 86400 && tg < 2592000) {
          thoi_gian = Math.floor(tg / 86400) + ' ngày';
      } else if (tg >= 2592000 && tg < 77760000) {
          thoi_gian = Math.floor(tg / 2592000) + ' tháng';
      } else if (tg >= 77760000 && tg < 933120000) {
          thoi_gian = Math.floor(tg / 77760000) + ' năm';
      }
  } else {
      thoi_gian = '1 giây';
  }

  return thoi_gian;
}

// link chi tiet ung vien
function rewriteUV(id, name) {
  let alias = replaceTitle(name);
  if (alias == '') {
    alias = 'nguoi-ngoai-quoc';
  }
  return "/" + alias + "-uv" + id;
}
// linh chi tiet cong ty
function rewrite_url_company(idntd, namentd, alias) {
  let slug = '', companySlug = '';

  if (alias) {
    companySlug = "/cong-ty-" + alias;
  } else {
    slug = replaceTitle(namentd);
    slug = slug.substring(0, 55);
    if (!slug) {
      slug = 'cong-ty-nuoc-ngoai';
    }

    companySlug = "/cong-ty-" + replaceTitle(slug);
  }

  companySlug = companySlug.replace("cong-ty-cong-ty", "cong-ty");

  return companySlug;
}
// link chi tiet tin tuyển dụng
function rewrite_url_new(name, id) {
  let alias = replaceTitle(name);
  return '/' + alias + '-new' + id;
}
// link chi tiet cv
function rewrite_url_CV(name) {
  // let alias = replaceTitle(name);
  return "/tao-cv-online/" + name;
}
// 
const date = (
  year = null,
  month = null,
  day = null,
  hours = null,
  minutes = null,
  seconds = null
) => {
  // Nếu không truyền tham số, sử dụng thời gian hiện tại
  const now =
    year === null ||
      month === null ||
      day === null ||
      hours === null ||
      minutes === null ||
      seconds === null
      ? new Date()
      : new Date(year, month - 1, day, hours, minutes, seconds);

  // Lấy ngày, tháng, năm, giờ, phút và giây từ đối tượng Date
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // Tháng bắt đầu từ 0
  const currentDay = now.getDate();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  // Đảm bảo rằng ngày, tháng, giờ, phút và giây đều có hai chữ số
  const formattedDay = currentDay < 10 ? `0${currentDay}` : currentDay;
  const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const formattedHours = currentHours < 10 ? `0${currentHours}` : currentHours;
  const formattedMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  const formattedSeconds =
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

  // Trả về ngày và giờ theo định dạng 'dd/mm/yyyy hh:mm:ss'
  return `${formattedDay}/${formattedMonth}/${currentYear} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
const formatDate = (inputdatestring) => {
  const arrinputtime = inputdatestring.split('T')[1].split('.')[0].split(':');
  const arrinputday = inputdatestring.split('T')[0].split('-');
  const int_inputtime = parseInt(arrinputtime[0]) + 7;
  if (int_inputtime >= 24) int_inputtime = int_inputtime - 24;
  const string_timeoutput = int_inputtime.toString() + ":" + arrinputtime[1] + ":" + arrinputtime[2];
  const string_dayoutput = arrinputday[2] + "/" + arrinputday[1] + "/" + arrinputday[0]
  return { string_timeoutput, string_dayoutput };
};
const getDistrict = (parentId) => {
  const district = district_array.filter(
    (district) => district.cit_parent == parentId
  );
  return district;
};
const city_array = [
  {
    cit_id: 1,
    cit_name: "Hà Nội",
    cit_parent: 0,
    cit_alias: 'ha-noi',
  },
  {
    cit_id: 2,
    cit_name: "Hải Phòng",
    cit_parent: 0,
    cit_alias: "hai-phong",
  },
  {
    cit_id: 3,
    cit_name: "Bắc Giang",
    cit_parent: 0,
    cit_alias: "bac-giang"
  },
  {
    cit_id: 4,
    cit_name: "Bắc Kạn",
    cit_parent: 0,
    cit_alias: "bac-kan"
  },
  {
    cit_id: 5,
    cit_name: "Bắc Ninh",
    cit_parent: 0,
    cit_alias: "bac-ninh"
  },
  {
    cit_id: 6,
    cit_name: "Cao Bằng",
    cit_parent: 0,
    cit_alias: "cao-bang"
  },
  {
    cit_id: 7,
    cit_name: "Điện Biên",
    cit_parent: 0,
    cit_alias: "dien-bien"
  },
  {
    cit_id: 8,
    cit_name: "Hòa Bình",
    cit_parent: 0,
    cit_alias: "hoa-binh"
  },
  {
    cit_id: 9,
    cit_name: "Hải Dương",
    cit_parent: 0,
    cit_alias: "hai-duong"
  },
  {
    cit_id: 10,
    cit_name: "Hà Giang",
    cit_parent: 0,
    cit_alias: "ha-giang"
  },
  {
    cit_id: 11,
    cit_name: "Hà Nam",
    cit_parent: 0,
    cit_alias: "ha-nam"
  },
  {
    cit_id: 12,
    cit_name: "Hưng Yên",
    cit_parent: 0,
    cit_alias: "hung-yen"
  },
  {
    cit_id: 13,
    cit_name: "Lào Cai",
    cit_parent: 0,
    cit_alias: "lao-cai"
  },
  {
    cit_id: 14,
    cit_name: "Lai Châu",
    cit_parent: 0,
    cit_alias: "lai-chau"
  },
  {
    cit_id: 15,
    cit_name: "Lạng Sơn",
    cit_parent: 0,
    cit_alias: "lang-son"
  },
  {
    cit_id: 16,
    cit_name: "Ninh Bình",
    cit_parent: 0,
    cit_alias: "ninh-binh"
  },
  {
    cit_id: 17,
    cit_name: "Nam Định",
    cit_parent: 0,
    cit_alias: "nam-dinh"
  },
  {
    cit_id: 18,
    cit_name: "Phú Thọ",
    cit_parent: 0,
    cit_alias: "phu-tho"
  },
  {
    cit_id: 19,
    cit_name: "Quảng Ninh",
    cit_parent: 0,
    cit_alias: "quang-ninh"
  },
  {
    cit_id: 20,
    cit_name: "Sơn La",
    cit_parent: 0,
    cit_alias: "son-la"
  },
  {
    cit_id: 21,
    cit_name: "Thái Bình",
    cit_parent: 0,
    cit_alias: "thai-binh"
  },
  {
    cit_id: 22,
    cit_name: "Thái Nguyên",
    cit_parent: 0,
    cit_alias: "thai-nguyen"
  },
  {
    cit_id: 23,
    cit_name: "Tuyên Quang",
    cit_parent: 0,
    cit_alias: "tuyen-quang"
  },
  {
    cit_id: 24,
    cit_name: "Vĩnh Phúc",
    cit_parent: 0,
    cit_alias: "vinh-phuc"
  },
  {
    cit_id: 25,
    cit_name: "Yên Bái",
    cit_parent: 0,
    cit_alias: "yen-bai"
  },
  {
    cit_id: 26,
    cit_name: "Đà Nẵng",
    cit_parent: 0,
    cit_alias: "da-nang"
  },
  {
    cit_id: 27,
    cit_name: "Thừa Thiên Huế",
    cit_parent: 0,
    cit_alias: "thua-thien-hue"
  },
  {
    cit_id: 28,
    cit_name: "Khánh Hòa",
    cit_parent: 0,
    cit_alias: "khanh-hoa"
  },
  {
    cit_id: 29,
    cit_name: "Lâm Đồng",
    cit_parent: 0,
    cit_alias: "lam-dong"
  },
  {
    cit_id: 30,
    cit_name: "Bình Định",
    cit_parent: 0,
    cit_alias: "binh-dinh"
  },
  {
    cit_id: 31,
    cit_name: "Bình Thuận",
    cit_parent: 0,
    cit_alias: "binh-thuan"
  },
  {
    cit_id: 32,
    cit_name: "Đắk Lắk",
    cit_parent: 0,
    cit_alias: "dak-lak"
  },
  {
    cit_id: 33,
    cit_name: "Đắk Nông",
    cit_parent: 0,
    cit_alias: "dak-nong"
  },
  {
    cit_id: 34,
    cit_name: "Gia Lai",
    cit_parent: 0,
    cit_alias: "gia-lai"
  },
  {
    cit_id: 35,
    cit_name: "Hà Tĩnh",
    cit_parent: 0,
    cit_alias: "ha-tinh"
  },
  {
    cit_id: 36,
    cit_name: "Kon Tum",
    cit_parent: 0,
    cit_alias: "kon-tum"
  },
  {
    cit_id: 37,
    cit_name: "Nghệ An",
    cit_parent: 0,
    cit_alias: "nghe-an"
  },
  {
    cit_id: 38,
    cit_name: "Ninh Thuận",
    cit_parent: 0,
    cit_alias: "ninh-thuan"
  },
  {
    cit_id: 39,
    cit_name: "Phú Yên",
    cit_parent: 0,
    cit_alias: "phu-yen"
  },
  {
    cit_id: 40,
    cit_name: "Quảng Bình",
    cit_parent: 0,
    cit_alias: "quang-binh"
  },
  {
    cit_id: 41,
    cit_name: "Quảng Nam",
    cit_parent: 0,
    cit_alias: "quang-nam"
  },
  {
    cit_id: 42,
    cit_name: "Quảng Ngãi",
    cit_parent: 0,
    cit_alias: "quang-ngai"
  },
  {
    cit_id: 43,
    cit_name: "Quảng Trị",
    cit_parent: 0,
    cit_alias: "quan-tri"
  },
  {
    cit_id: 44,
    cit_name: "Thanh Hóa",
    cit_parent: 0,
    cit_alias: "thanh-hoa"
  },
  {
    cit_id: 45,
    cit_name: "Hồ Chí Minh",
    cit_parent: 0,
    cit_alias: "ho-chi-minh"
  },
  {
    cit_id: 46,
    cit_name: "Bình Dương",
    cit_parent: 0,
    cit_alias: "binh-duong"
  },
  {
    cit_id: 47,
    cit_name: "Bà Rịa Vũng Tàu",
    cit_parent: 0,
    cit_alias: "ba-ria-vung-tau"
  },
  {
    cit_id: 48,
    cit_name: "Cần Thơ",
    cit_parent: 0,
    cit_alias: "can-tho"
  },
  {
    cit_id: 49,
    cit_name: "An Giang",
    cit_parent: 0,
    cit_alias: "an-giang"
  },
  {
    cit_id: 50,
    cit_name: "Bạc Liêu",
    cit_parent: 0,
    cit_alias: "bac-lieu"
  },
  {
    cit_id: 51,
    cit_name: "Bình Phước",
    cit_parent: 0,
    cit_alias: "binh-phuoc"
  },
  {
    cit_id: 52,
    cit_name: "Bến Tre",
    cit_parent: 0,
    cit_alias: "ben-tre"
  },
  {
    cit_id: 53,
    cit_name: "Cà Mau",
    cit_parent: 0,
    cit_alias: "ca-mau"
  },
  {
    cit_id: 54,
    cit_name: "Đồng Tháp",
    cit_parent: 0,
    cit_alias: "dong-thap"
  },
  {
    cit_id: 55,
    cit_name: "Đồng Nai",
    cit_parent: 0,
    cit_alias: "dong-nai"
  },
  {
    cit_id: 56,
    cit_name: "Hậu Giang",
    cit_parent: 0,
    cit_alias: "hau-giang"
  },
  {
    cit_id: 57,
    cit_name: "Kiên Giang",
    cit_parent: 0,
    cit_alias: "kien-giang"
  },
  {
    cit_id: 58,
    cit_name: "Long An",
    cit_parent: 0,
    cit_alias: "long-an"
  },
  {
    cit_id: 59,
    cit_name: "Sóc Trăng",
    cit_parent: 0,
    cit_alias: "soc-trang"
  },
  {
    cit_id: 60,
    cit_name: "Tiền Giang",
    cit_parent: 0,
    cit_alias: "tien-giang"
  },
  {
    cit_id: 61,
    cit_name: "Tây Ninh",
    cit_parent: 0,
    cit_alias: "tay-ninh"
  },
  {
    cit_id: 62,
    cit_name: "Trà Vinh",
    cit_parent: 0,
    cit_alias: "tra-vinh"
  },
  {
    cit_id: 63,
    cit_name: "Vĩnh Long",
    cit_parent: 0,
    cit_alias: "vinh-long"
  },
];
const district_array = [
  {
    cit_id: 66,
    cit_name: "Quận Ba Đình",
    cit_parent: 1,
  },
  {
    cit_id: 67,
    cit_name: "Quận Hoàn Kiếm",
    cit_parent: 1,
  },
  {
    cit_id: 68,
    cit_name: "Quận Tây Hồ",
    cit_parent: 1,
  },
  {
    cit_id: 69,
    cit_name: "Quận Long Biên",
    cit_parent: 1,
  },
  {
    cit_id: 70,
    cit_name: "Quận Cầu Giấy",
    cit_parent: 1,
  },
  {
    cit_id: 71,
    cit_name: "Quận Đống Đa",
    cit_parent: 1,
  },
  {
    cit_id: 72,
    cit_name: "Quận Hai Bà Trưng",
    cit_parent: 1,
  },
  {
    cit_id: 73,
    cit_name: "Quận Hoàng Mai",
    cit_parent: 1,
  },
  {
    cit_id: 74,
    cit_name: "Quận Thanh Xuân",
    cit_parent: 1,
  },
  {
    cit_id: 75,
    cit_name: "Huyện Sóc Sơn",
    cit_parent: 1,
  },
  {
    cit_id: 76,
    cit_name: "Huyện Đông Anh",
    cit_parent: 1,
  },
  {
    cit_id: 77,
    cit_name: "Huyện Gia Lâm",
    cit_parent: 1,
  },
  {
    cit_id: 78,
    cit_name: "Quận Nam Từ Liêm",
    cit_parent: 1,
  },
  {
    cit_id: 79,
    cit_name: "Huyện Thanh Trì",
    cit_parent: 1,
  },
  {
    cit_id: 80,
    cit_name: "Quận Bắc Từ Liêm",
    cit_parent: 1,
  },
  {
    cit_id: 81,
    cit_name: "Huyện Mê Linh",
    cit_parent: 1,
  },
  {
    cit_id: 82,
    cit_name: "Quận Hà Đông",
    cit_parent: 1,
  },
  {
    cit_id: 83,
    cit_name: "Thị xã Sơn Tây",
    cit_parent: 1,
  },
  {
    cit_id: 84,
    cit_name: "Huyện Ba Vì",
    cit_parent: 1,
  },
  {
    cit_id: 85,
    cit_name: "Huyện Phúc Thọ",
    cit_parent: 1,
  },
  {
    cit_id: 86,
    cit_name: "Huyện Đan Phượng",
    cit_parent: 1,
  },
  {
    cit_id: 87,
    cit_name: "Huyện Hoài Đức",
    cit_parent: 1,
  },
  {
    cit_id: 88,
    cit_name: "Huyện Quốc Oai",
    cit_parent: 1,
  },
  {
    cit_id: 89,
    cit_name: "Huyện Thạch Thất",
    cit_parent: 1,
  },
  {
    cit_id: 90,
    cit_name: "Huyện Chương Mỹ",
    cit_parent: 1,
  },
  {
    cit_id: 91,
    cit_name: "Huyện Thanh Oai",
    cit_parent: 1,
  },
  {
    cit_id: 92,
    cit_name: "Huyện Thường Tín",
    cit_parent: 1,
  },
  {
    cit_id: 93,
    cit_name: "Huyện Phú Xuyên",
    cit_parent: 1,
  },
  {
    cit_id: 94,
    cit_name: "Huyện Ứng Hòa",
    cit_parent: 1,
  },
  {
    cit_id: 95,
    cit_name: "Huyện Mỹ Đức",
    cit_parent: 1,
  },
  {
    cit_id: 96,
    cit_name: "Thành phố Hà Giang",
    cit_parent: 10,
  },
  {
    cit_id: 97,
    cit_name: "Huyện Đồng Văn",
    cit_parent: 10,
  },
  {
    cit_id: 98,
    cit_name: "Huyện Mèo Vạc",
    cit_parent: 10,
  },
  {
    cit_id: 99,
    cit_name: "Huyện Yên Minh",
    cit_parent: 10,
  },
  {
    cit_id: 100,
    cit_name: "Huyện Quản Bạ",
    cit_parent: 10,
  },
  {
    cit_id: 101,
    cit_name: "Huyện Vị Xuyên",
    cit_parent: 10,
  },
  {
    cit_id: 102,
    cit_name: "Huyện Bắc Mê",
    cit_parent: 10,
  },
  {
    cit_id: 103,
    cit_name: "Huyện Hoàng Su Phì",
    cit_parent: 10,
  },
  {
    cit_id: 104,
    cit_name: "Huyện Xín Mần",
    cit_parent: 10,
  },
  {
    cit_id: 105,
    cit_name: "Huyện Bắc Quang",
    cit_parent: 10,
  },
  {
    cit_id: 106,
    cit_name: "Huyện Quang Bình",
    cit_parent: 10,
  },
  {
    cit_id: 107,
    cit_name: "Thành phố Cao Bằng",
    cit_parent: 6,
  },
  {
    cit_id: 108,
    cit_name: "Huyện Bảo Lâm",
    cit_parent: 6,
  },
  {
    cit_id: 109,
    cit_name: "Huyện Bảo Lạc",
    cit_parent: 6,
  },
  {
    cit_id: 110,
    cit_name: "Huyện Thông Nông",
    cit_parent: 6,
  },
  {
    cit_id: 111,
    cit_name: "Huyện Hà Quảng",
    cit_parent: 6,
  },
  {
    cit_id: 112,
    cit_name: "Huyện Trà Lĩnh",
    cit_parent: 6,
  },
  {
    cit_id: 113,
    cit_name: "Huyện Trùng Khánh",
    cit_parent: 6,
  },
  {
    cit_id: 114,
    cit_name: "Huyện Hạ Lang",
    cit_parent: 6,
  },
  {
    cit_id: 115,
    cit_name: "Huyện Quảng Uyên",
    cit_parent: 6,
  },
  {
    cit_id: 116,
    cit_name: "Huyện Phục Hoà",
    cit_parent: 6,
  },
  {
    cit_id: 117,
    cit_name: "Huyện Hoà An",
    cit_parent: 6,
  },
  {
    cit_id: 118,
    cit_name: "Huyện Nguyên Bình",
    cit_parent: 6,
  },
  {
    cit_id: 119,
    cit_name: "Huyện Thạch An",
    cit_parent: 6,
  },
  {
    cit_id: 120,
    cit_name: "Thành Phố Bắc Kạn",
    cit_parent: 4,
  },
  {
    cit_id: 121,
    cit_name: "Huyện Pác Nặm",
    cit_parent: 4,
  },
  {
    cit_id: 122,
    cit_name: "Huyện Ba Bể",
    cit_parent: 4,
  },
  {
    cit_id: 123,
    cit_name: "Huyện Ngân Sơn",
    cit_parent: 4,
  },
  {
    cit_id: 124,
    cit_name: "Huyện Bạch Thông",
    cit_parent: 4,
  },
  {
    cit_id: 125,
    cit_name: "Huyện Chợ Đồn",
    cit_parent: 4,
  },
  {
    cit_id: 126,
    cit_name: "Huyện Chợ Mới",
    cit_parent: 4,
  },
  {
    cit_id: 127,
    cit_name: "Huyện Na Rì",
    cit_parent: 4,
  },
  {
    cit_id: 128,
    cit_name: "Thành phố Tuyên Quang",
    cit_parent: 23,
  },
  {
    cit_id: 129,
    cit_name: "Huyện Lâm Bình",
    cit_parent: 23,
  },
  {
    cit_id: 130,
    cit_name: "Huyện Nà Hang",
    cit_parent: 23,
  },
  {
    cit_id: 131,
    cit_name: "Huyện Chiêm Hóa",
    cit_parent: 23,
  },
  {
    cit_id: 132,
    cit_name: "Huyện Hàm Yên",
    cit_parent: 23,
  },
  {
    cit_id: 133,
    cit_name: "Huyện Yên Sơn",
    cit_parent: 23,
  },
  {
    cit_id: 134,
    cit_name: "Huyện Sơn Dương",
    cit_parent: 23,
  },
  {
    cit_id: 135,
    cit_name: "Thành phố Lào Cai",
    cit_parent: 13,
  },
  {
    cit_id: 136,
    cit_name: "Huyện Bát Xát",
    cit_parent: 13,
  },
  {
    cit_id: 137,
    cit_name: "Huyện Mường Khương",
    cit_parent: 13,
  },
  {
    cit_id: 138,
    cit_name: "Huyện Si Ma Cai",
    cit_parent: 13,
  },
  {
    cit_id: 139,
    cit_name: "Huyện Bắc Hà",
    cit_parent: 13,
  },
  {
    cit_id: 140,
    cit_name: "Huyện Bảo Thắng",
    cit_parent: 13,
  },
  {
    cit_id: 141,
    cit_name: "Huyện Bảo Yên",
    cit_parent: 13,
  },
  {
    cit_id: 142,
    cit_name: "Thị xã Sa Pa",
    cit_parent: 13,
  },
  {
    cit_id: 143,
    cit_name: "Huyện Văn Bàn",
    cit_parent: 13,
  },
  {
    cit_id: 144,
    cit_name: "Thành phố Điện Biên Phủ",
    cit_parent: 7,
  },
  {
    cit_id: 145,
    cit_name: "Thị Xã Mường Lay",
    cit_parent: 7,
  },
  {
    cit_id: 146,
    cit_name: "Huyện Mường Nhé",
    cit_parent: 7,
  },
  {
    cit_id: 147,
    cit_name: "Huyện Mường Chà",
    cit_parent: 7,
  },
  {
    cit_id: 148,
    cit_name: "Huyện Tủa Chùa",
    cit_parent: 7,
  },
  {
    cit_id: 149,
    cit_name: "Huyện Tuần Giáo",
    cit_parent: 7,
  },
  {
    cit_id: 150,
    cit_name: "Huyện Điện Biên",
    cit_parent: 7,
  },
  {
    cit_id: 151,
    cit_name: "Huyện Điện Biên Đông",
    cit_parent: 7,
  },
  {
    cit_id: 152,
    cit_name: "Huyện Mường Ảng",
    cit_parent: 7,
  },
  {
    cit_id: 153,
    cit_name: "Huyện Nậm Pồ",
    cit_parent: 7,
  },
  {
    cit_id: 154,
    cit_name: "Thành phố Lai Châu",
    cit_parent: 14,
  },
  {
    cit_id: 155,
    cit_name: "Huyện Tam Đường",
    cit_parent: 14,
  },
  {
    cit_id: 156,
    cit_name: "Huyện Mường Tè",
    cit_parent: 14,
  },
  {
    cit_id: 157,
    cit_name: "Huyện Sìn Hồ",
    cit_parent: 14,
  },
  {
    cit_id: 158,
    cit_name: "Huyện Phong Thổ",
    cit_parent: 14,
  },
  {
    cit_id: 159,
    cit_name: "Huyện Than Uyên",
    cit_parent: 14,
  },
  {
    cit_id: 160,
    cit_name: "Huyện Tân Uyên",
    cit_parent: 14,
  },
  {
    cit_id: 161,
    cit_name: "Huyện Nậm Nhùn",
    cit_parent: 14,
  },
  {
    cit_id: 162,
    cit_name: "Thành phố Sơn La",
    cit_parent: 20,
  },
  {
    cit_id: 163,
    cit_name: "Huyện Quỳnh Nhai",
    cit_parent: 20,
  },
  {
    cit_id: 164,
    cit_name: "Huyện Thuận Châu",
    cit_parent: 20,
  },
  {
    cit_id: 165,
    cit_name: "Huyện Mường La",
    cit_parent: 20,
  },
  {
    cit_id: 166,
    cit_name: "Huyện Bắc Yên",
    cit_parent: 20,
  },
  {
    cit_id: 167,
    cit_name: "Huyện Phù Yên",
    cit_parent: 20,
  },
  {
    cit_id: 168,
    cit_name: "Huyện Mộc Châu",
    cit_parent: 20,
  },
  {
    cit_id: 169,
    cit_name: "Huyện Yên Châu",
    cit_parent: 20,
  },
  {
    cit_id: 170,
    cit_name: "Huyện Mai Sơn",
    cit_parent: 20,
  },
  {
    cit_id: 171,
    cit_name: "Huyện Sông Mã",
    cit_parent: 20,
  },
  {
    cit_id: 172,
    cit_name: "Huyện Sốp Cộp",
    cit_parent: 20,
  },
  {
    cit_id: 173,
    cit_name: "Huyện Vân Hồ",
    cit_parent: 20,
  },
  {
    cit_id: 174,
    cit_name: "Thành phố Yên Bái",
    cit_parent: 25,
  },
  {
    cit_id: 175,
    cit_name: "Thị xã Nghĩa Lộ",
    cit_parent: 25,
  },
  {
    cit_id: 176,
    cit_name: "Huyện Lục Yên",
    cit_parent: 25,
  },
  {
    cit_id: 177,
    cit_name: "Huyện Văn Yên",
    cit_parent: 25,
  },
  {
    cit_id: 178,
    cit_name: "Huyện Mù Căng Chải",
    cit_parent: 25,
  },
  {
    cit_id: 179,
    cit_name: "Huyện Trấn Yên",
    cit_parent: 25,
  },
  {
    cit_id: 180,
    cit_name: "Huyện Trạm Tấu",
    cit_parent: 25,
  },
  {
    cit_id: 181,
    cit_name: "Huyện Văn Chấn",
    cit_parent: 25,
  },
  {
    cit_id: 182,
    cit_name: "Huyện Yên Bình",
    cit_parent: 25,
  },
  {
    cit_id: 183,
    cit_name: "Thành phố Hòa Bình",
    cit_parent: 8,
  },
  {
    cit_id: 184,
    cit_name: "Huyện Đà Bắc",
    cit_parent: 8,
  },
  {
    cit_id: 185,
    cit_name: "Huyện Kỳ Sơn",
    cit_parent: 8,
  },
  {
    cit_id: 186,
    cit_name: "Huyện Lương Sơn",
    cit_parent: 8,
  },
  {
    cit_id: 187,
    cit_name: "Huyện Kim Bôi",
    cit_parent: 8,
  },
  {
    cit_id: 188,
    cit_name: "Huyện Cao Phong",
    cit_parent: 8,
  },
  {
    cit_id: 189,
    cit_name: "Huyện Tân Lạc",
    cit_parent: 8,
  },
  {
    cit_id: 190,
    cit_name: "Huyện Mai Châu",
    cit_parent: 8,
  },
  {
    cit_id: 191,
    cit_name: "Huyện Lạc Sơn",
    cit_parent: 8,
  },
  {
    cit_id: 192,
    cit_name: "Huyện Yên Thủy",
    cit_parent: 8,
  },
  {
    cit_id: 193,
    cit_name: "Huyện Lạc Thủy",
    cit_parent: 8,
  },
  {
    cit_id: 194,
    cit_name: "Thành phố Thái Nguyên",
    cit_parent: 22,
  },
  {
    cit_id: 195,
    cit_name: "Thành phố Sông Công",
    cit_parent: 22,
  },
  {
    cit_id: 196,
    cit_name: "Huyện Định Hóa",
    cit_parent: 22,
  },
  {
    cit_id: 197,
    cit_name: "Huyện Phú Lương",
    cit_parent: 22,
  },
  {
    cit_id: 198,
    cit_name: "Huyện Đồng Hỷ",
    cit_parent: 22,
  },
  {
    cit_id: 199,
    cit_name: "Huyện Võ Nhai",
    cit_parent: 22,
  },
  {
    cit_id: 200,
    cit_name: "Huyện Đại Từ",
    cit_parent: 22,
  },
  {
    cit_id: 201,
    cit_name: "Thị xã Phổ Yên",
    cit_parent: 22,
  },
  {
    cit_id: 202,
    cit_name: "Huyện Phú Bình",
    cit_parent: 22,
  },
  {
    cit_id: 203,
    cit_name: "Thành phố Lạng Sơn",
    cit_parent: 15,
  },
  {
    cit_id: 204,
    cit_name: "Huyện Tràng Định",
    cit_parent: 15,
  },
  {
    cit_id: 205,
    cit_name: "Huyện Bình Gia",
    cit_parent: 15,
  },
  {
    cit_id: 206,
    cit_name: "Huyện Văn Lãng",
    cit_parent: 15,
  },
  {
    cit_id: 207,
    cit_name: "Huyện Cao Lộc",
    cit_parent: 15,
  },
  {
    cit_id: 208,
    cit_name: "Huyện Văn Quan",
    cit_parent: 15,
  },
  {
    cit_id: 209,
    cit_name: "Huyện Bắc Sơn",
    cit_parent: 15,
  },
  {
    cit_id: 210,
    cit_name: "Huyện Hữu Lũng",
    cit_parent: 15,
  },
  {
    cit_id: 211,
    cit_name: "Huyện Chi Lăng",
    cit_parent: 15,
  },
  {
    cit_id: 212,
    cit_name: "Huyện Lộc Bình",
    cit_parent: 15,
  },
  {
    cit_id: 213,
    cit_name: "Huyện Đình Lập",
    cit_parent: 15,
  },
  {
    cit_id: 214,
    cit_name: "Thành phố Hạ Long",
    cit_parent: 19,
  },
  {
    cit_id: 215,
    cit_name: "Thành phố Móng Cái",
    cit_parent: 19,
  },
  {
    cit_id: 216,
    cit_name: "Thành phố Cẩm Phả",
    cit_parent: 19,
  },
  {
    cit_id: 217,
    cit_name: "Thành phố Uông Bí",
    cit_parent: 19,
  },
  {
    cit_id: 218,
    cit_name: "Huyện Bình Liêu",
    cit_parent: 19,
  },
  {
    cit_id: 219,
    cit_name: "Huyện Tiên Yên",
    cit_parent: 19,
  },
  {
    cit_id: 220,
    cit_name: "Huyện Đầm Hà",
    cit_parent: 19,
  },
  {
    cit_id: 221,
    cit_name: "Huyện Hải Hà",
    cit_parent: 19,
  },
  {
    cit_id: 222,
    cit_name: "Huyện Ba Chẽ",
    cit_parent: 19,
  },
  {
    cit_id: 223,
    cit_name: "Huyện Vân Đồn",
    cit_parent: 19,
  },
  {
    cit_id: 225,
    cit_name: "Thị xã Đông Triều",
    cit_parent: 19,
  },
  {
    cit_id: 226,
    cit_name: "Thị xã Quảng Yên",
    cit_parent: 19,
  },
  {
    cit_id: 227,
    cit_name: "Huyện Cô Tô",
    cit_parent: 19,
  },
  {
    cit_id: 228,
    cit_name: "Thành phố Bắc Giang",
    cit_parent: 3,
  },
  {
    cit_id: 229,
    cit_name: "Huyện Yên Thế",
    cit_parent: 3,
  },
  {
    cit_id: 230,
    cit_name: "Huyện Tân Yên",
    cit_parent: 3,
  },
  {
    cit_id: 231,
    cit_name: "Huyện Lạng Giang",
    cit_parent: 3,
  },
  {
    cit_id: 232,
    cit_name: "Huyện Lục Nam",
    cit_parent: 3,
  },
  {
    cit_id: 233,
    cit_name: "Huyện Lục Ngạn",
    cit_parent: 3,
  },
  {
    cit_id: 234,
    cit_name: "Huyện Sơn Động",
    cit_parent: 3,
  },
  {
    cit_id: 235,
    cit_name: "Huyện Yên Dũng",
    cit_parent: 3,
  },
  {
    cit_id: 236,
    cit_name: "Huyện Việt Yên",
    cit_parent: 3,
  },
  {
    cit_id: 237,
    cit_name: "Huyện Hiệp Hòa",
    cit_parent: 3,
  },
  {
    cit_id: 238,
    cit_name: "Thành phố Việt Trì",
    cit_parent: 18,
  },
  {
    cit_id: 239,
    cit_name: "Thị xã Phú Thọ",
    cit_parent: 18,
  },
  {
    cit_id: 240,
    cit_name: "Huyện Đoan Hùng",
    cit_parent: 18,
  },
  {
    cit_id: 241,
    cit_name: "Huyện Hạ Hoà",
    cit_parent: 18,
  },
  {
    cit_id: 242,
    cit_name: "Huyện Thanh Ba",
    cit_parent: 18,
  },
  {
    cit_id: 243,
    cit_name: "Huyện Phù Ninh",
    cit_parent: 18,
  },
  {
    cit_id: 244,
    cit_name: "Huyện Yên Lập",
    cit_parent: 18,
  },
  {
    cit_id: 245,
    cit_name: "Huyện Cẩm Khê",
    cit_parent: 18,
  },
  {
    cit_id: 246,
    cit_name: "Huyện Tam Nông",
    cit_parent: 18,
  },
  {
    cit_id: 247,
    cit_name: "Huyện Lâm Thao",
    cit_parent: 18,
  },
  {
    cit_id: 248,
    cit_name: "Huyện Thanh Sơn",
    cit_parent: 18,
  },
  {
    cit_id: 249,
    cit_name: "Huyện Thanh Thuỷ",
    cit_parent: 18,
  },
  {
    cit_id: 250,
    cit_name: "Huyện Tân Sơn",
    cit_parent: 18,
  },
  {
    cit_id: 251,
    cit_name: "Thành phố Vĩnh Yên",
    cit_parent: 24,
  },
  {
    cit_id: 252,
    cit_name: "Thành phố Phúc Yên",
    cit_parent: 24,
  },
  {
    cit_id: 253,
    cit_name: "Huyện Lập Thạch",
    cit_parent: 24,
  },
  {
    cit_id: 254,
    cit_name: "Huyện Tam Dương",
    cit_parent: 24,
  },
  {
    cit_id: 255,
    cit_name: "Huyện Tam Đảo",
    cit_parent: 24,
  },
  {
    cit_id: 256,
    cit_name: "Huyện Bình Xuyên",
    cit_parent: 24,
  },
  {
    cit_id: 257,
    cit_name: "Huyện Yên Lạc",
    cit_parent: 24,
  },
  {
    cit_id: 258,
    cit_name: "Huyện Vĩnh Tường",
    cit_parent: 24,
  },
  {
    cit_id: 259,
    cit_name: "Huyện Sông Lô",
    cit_parent: 24,
  },
  {
    cit_id: 260,
    cit_name: "Thành phố Bắc Ninh",
    cit_parent: 5,
  },
  {
    cit_id: 261,
    cit_name: "Huyện Yên Phong",
    cit_parent: 5,
  },
  {
    cit_id: 262,
    cit_name: "Huyện Quế Võ",
    cit_parent: 5,
  },
  {
    cit_id: 263,
    cit_name: "Huyện Tiên Du",
    cit_parent: 5,
  },
  {
    cit_id: 264,
    cit_name: "Thị xã Từ Sơn",
    cit_parent: 5,
  },
  {
    cit_id: 265,
    cit_name: "Huyện Thuận Thành",
    cit_parent: 5,
  },
  {
    cit_id: 266,
    cit_name: "Huyện Gia Bình",
    cit_parent: 5,
  },
  {
    cit_id: 267,
    cit_name: "Huyện Lương Tài",
    cit_parent: 5,
  },
  {
    cit_id: 268,
    cit_name: "Thành phố Hải Dương",
    cit_parent: 9,
  },
  {
    cit_id: 269,
    cit_name: "Thành phố Chí Linh",
    cit_parent: 9,
  },
  {
    cit_id: 270,
    cit_name: "Huyện Nam Sách",
    cit_parent: 9,
  },
  {
    cit_id: 271,
    cit_name: "Huyện Kinh Môn",
    cit_parent: 9,
  },
  {
    cit_id: 272,
    cit_name: "Huyện Kim Thành",
    cit_parent: 9,
  },
  {
    cit_id: 273,
    cit_name: "Huyện Thanh Hà",
    cit_parent: 9,
  },
  {
    cit_id: 274,
    cit_name: "Huyện Cẩm Giàng",
    cit_parent: 9,
  },
  {
    cit_id: 275,
    cit_name: "Huyện Bình Giang",
    cit_parent: 9,
  },
  {
    cit_id: 276,
    cit_name: "Huyện Gia Lộc",
    cit_parent: 9,
  },
  {
    cit_id: 277,
    cit_name: "Huyện Tứ Kỳ",
    cit_parent: 9,
  },
  {
    cit_id: 278,
    cit_name: "Huyện Ninh Giang",
    cit_parent: 9,
  },
  {
    cit_id: 279,
    cit_name: "Huyện Thanh Miện",
    cit_parent: 9,
  },
  {
    cit_id: 280,
    cit_name: "Quận Hồng Bàng",
    cit_parent: 2,
  },
  {
    cit_id: 281,
    cit_name: "Quận Ngô Quyền",
    cit_parent: 2,
  },
  {
    cit_id: 282,
    cit_name: "Quận Lê Chân",
    cit_parent: 2,
  },
  {
    cit_id: 283,
    cit_name: "Quận Hải An",
    cit_parent: 2,
  },
  {
    cit_id: 284,
    cit_name: "Quận Kiến An",
    cit_parent: 2,
  },
  {
    cit_id: 285,
    cit_name: "Quận Đồ Sơn",
    cit_parent: 2,
  },
  {
    cit_id: 286,
    cit_name: "Quận Dương Kinh",
    cit_parent: 2,
  },
  {
    cit_id: 287,
    cit_name: "Huyện Thuỷ Nguyên",
    cit_parent: 2,
  },
  {
    cit_id: 288,
    cit_name: "Huyện An Dương",
    cit_parent: 2,
  },
  {
    cit_id: 289,
    cit_name: "Huyện An Lão",
    cit_parent: 2,
  },
  {
    cit_id: 290,
    cit_name: "Huyện Kiến Thuỵ",
    cit_parent: 2,
  },
  {
    cit_id: 291,
    cit_name: "Huyện Tiên Lãng",
    cit_parent: 2,
  },
  {
    cit_id: 292,
    cit_name: "Huyện Vĩnh Bảo",
    cit_parent: 2,
  },
  {
    cit_id: 293,
    cit_name: "Huyện Cát Hải",
    cit_parent: 2,
  },
  {
    cit_id: 294,
    cit_name: "Thành phố Hưng Yên",
    cit_parent: 12,
  },
  {
    cit_id: 295,
    cit_name: "Huyện Văn Lâm",
    cit_parent: 12,
  },
  {
    cit_id: 296,
    cit_name: "Huyện Văn Giang",
    cit_parent: 12,
  },
  {
    cit_id: 297,
    cit_name: "Huyện Yên Mỹ",
    cit_parent: 12,
  },
  {
    cit_id: 298,
    cit_name: "Thị xã Mỹ Hào",
    cit_parent: 12,
  },
  {
    cit_id: 299,
    cit_name: "Huyện Ân Thi",
    cit_parent: 12,
  },
  {
    cit_id: 300,
    cit_name: "Huyện Khoái Châu",
    cit_parent: 12,
  },
  {
    cit_id: 301,
    cit_name: "Huyện Kim Động",
    cit_parent: 12,
  },
  {
    cit_id: 302,
    cit_name: "Huyện Tiên Lữ",
    cit_parent: 12,
  },
  {
    cit_id: 303,
    cit_name: "Huyện Phù Cừ",
    cit_parent: 12,
  },
  {
    cit_id: 304,
    cit_name: "Thành phố Thái Bình",
    cit_parent: 21,
  },
  {
    cit_id: 305,
    cit_name: "Huyện Quỳnh Phụ",
    cit_parent: 21,
  },
  {
    cit_id: 306,
    cit_name: "Huyện Hưng Hà",
    cit_parent: 21,
  },
  {
    cit_id: 307,
    cit_name: "Huyện Đông Hưng",
    cit_parent: 21,
  },
  {
    cit_id: 308,
    cit_name: "Huyện Thái Thụy",
    cit_parent: 21,
  },
  {
    cit_id: 309,
    cit_name: "Huyện Tiền Hải",
    cit_parent: 21,
  },
  {
    cit_id: 310,
    cit_name: "Huyện Kiến Xương",
    cit_parent: 21,
  },
  {
    cit_id: 311,
    cit_name: "Huyện Vũ Thư",
    cit_parent: 21,
  },
  {
    cit_id: 312,
    cit_name: "Thành phố Phủ Lý",
    cit_parent: 11,
  },
  {
    cit_id: 313,
    cit_name: "Thị xã Duy Tiên",
    cit_parent: 11,
  },
  {
    cit_id: 314,
    cit_name: "Huyện Kim Bảng",
    cit_parent: 11,
  },
  {
    cit_id: 315,
    cit_name: "Huyện Thanh Liêm",
    cit_parent: 11,
  },
  {
    cit_id: 316,
    cit_name: "Huyện Bình Lục",
    cit_parent: 11,
  },
  {
    cit_id: 317,
    cit_name: "Huyện Lý Nhân",
    cit_parent: 11,
  },
  {
    cit_id: 318,
    cit_name: "Thành phố Nam Định",
    cit_parent: 17,
  },
  {
    cit_id: 319,
    cit_name: "Huyện Mỹ Lộc",
    cit_parent: 17,
  },
  {
    cit_id: 320,
    cit_name: "Huyện Vụ Bản",
    cit_parent: 17,
  },
  {
    cit_id: 321,
    cit_name: "Huyện Ý Yên",
    cit_parent: 17,
  },
  {
    cit_id: 322,
    cit_name: "Huyện Nghĩa Hưng",
    cit_parent: 17,
  },
  {
    cit_id: 323,
    cit_name: "Huyện Nam Trực",
    cit_parent: 17,
  },
  {
    cit_id: 324,
    cit_name: "Huyện Trực Ninh",
    cit_parent: 17,
  },
  {
    cit_id: 325,
    cit_name: "Huyện Xuân Trường",
    cit_parent: 17,
  },
  {
    cit_id: 326,
    cit_name: "Huyện Giao Thủy",
    cit_parent: 17,
  },
  {
    cit_id: 327,
    cit_name: "Huyện Hải Hậu",
    cit_parent: 17,
  },
  {
    cit_id: 328,
    cit_name: "Thành phố Ninh Bình",
    cit_parent: 16,
  },
  {
    cit_id: 329,
    cit_name: "Thành phố Tam Điệp",
    cit_parent: 16,
  },
  {
    cit_id: 330,
    cit_name: "Huyện Nho Quan",
    cit_parent: 16,
  },
  {
    cit_id: 331,
    cit_name: "Huyện Gia Viễn",
    cit_parent: 16,
  },
  {
    cit_id: 332,
    cit_name: "Huyện Hoa Lư",
    cit_parent: 16,
  },
  {
    cit_id: 333,
    cit_name: "Huyện Yên Khánh",
    cit_parent: 16,
  },
  {
    cit_id: 334,
    cit_name: "Huyện Kim Sơn",
    cit_parent: 16,
  },
  {
    cit_id: 335,
    cit_name: "Huyện Yên Mô",
    cit_parent: 16,
  },
  {
    cit_id: 336,
    cit_name: "Thành phố Thanh Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 337,
    cit_name: "Thị xã Bỉm Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 338,
    cit_name: "Thành phố Sầm Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 339,
    cit_name: "Huyện Mường Lát",
    cit_parent: 44,
  },
  {
    cit_id: 340,
    cit_name: "Huyện Quan Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 341,
    cit_name: "Huyện Bá Thước",
    cit_parent: 44,
  },
  {
    cit_id: 342,
    cit_name: "Huyện Quan Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 343,
    cit_name: "Huyện Lang Chánh",
    cit_parent: 44,
  },
  {
    cit_id: 344,
    cit_name: "Huyện Ngọc Lặc",
    cit_parent: 44,
  },
  {
    cit_id: 345,
    cit_name: "Huyện Cẩm Thủy",
    cit_parent: 44,
  },
  {
    cit_id: 346,
    cit_name: "Huyện Thạch Thành",
    cit_parent: 44,
  },
  {
    cit_id: 347,
    cit_name: "Huyện Hà Trung",
    cit_parent: 44,
  },
  {
    cit_id: 348,
    cit_name: "Huyện Vĩnh Lộc",
    cit_parent: 44,
  },
  {
    cit_id: 349,
    cit_name: "Huyện Yên Định",
    cit_parent: 44,
  },
  {
    cit_id: 350,
    cit_name: "Huyện Thọ Xuân",
    cit_parent: 44,
  },
  {
    cit_id: 351,
    cit_name: "Huyện Thường Xuân",
    cit_parent: 44,
  },
  {
    cit_id: 352,
    cit_name: "Huyện Triệu Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 353,
    cit_name: "Huyện Thiệu Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 354,
    cit_name: "Huyện Hoằng Hóa",
    cit_parent: 44,
  },
  {
    cit_id: 355,
    cit_name: "Huyện Hậu Lộc",
    cit_parent: 44,
  },
  {
    cit_id: 356,
    cit_name: "Huyện Nga Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 357,
    cit_name: "Huyện Như Xuân",
    cit_parent: 44,
  },
  {
    cit_id: 358,
    cit_name: "Huyện Như Thanh",
    cit_parent: 44,
  },
  {
    cit_id: 359,
    cit_name: "Huyện Nông Cống",
    cit_parent: 44,
  },
  {
    cit_id: 360,
    cit_name: "Huyện Đông Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 361,
    cit_name: "Huyện Quảng Xương",
    cit_parent: 44,
  },
  {
    cit_id: 362,
    cit_name: "Huyện Tĩnh Gia",
    cit_parent: 44,
  },
  {
    cit_id: 363,
    cit_name: "Thành phố Vinh",
    cit_parent: 37,
  },
  {
    cit_id: 364,
    cit_name: "Thị xã Cửa Lò",
    cit_parent: 37,
  },
  {
    cit_id: 365,
    cit_name: "Thị xã Thái Hoà",
    cit_parent: 37,
  },
  {
    cit_id: 366,
    cit_name: "Huyện Quế Phong",
    cit_parent: 37,
  },
  {
    cit_id: 367,
    cit_name: "Huyện Quỳ Châu",
    cit_parent: 37,
  },
  {
    cit_id: 368,
    cit_name: "Huyện Tương Dương",
    cit_parent: 37,
  },
  {
    cit_id: 369,
    cit_name: "Huyện Nghĩa Đàn",
    cit_parent: 37,
  },
  {
    cit_id: 370,
    cit_name: "Huyện Quỳ Hợp",
    cit_parent: 37,
  },
  {
    cit_id: 371,
    cit_name: "Huyện Quỳnh Lưu",
    cit_parent: 37,
  },
  {
    cit_id: 372,
    cit_name: "Huyện Con Cuông",
    cit_parent: 37,
  },
  {
    cit_id: 373,
    cit_name: "Huyện Tân Kỳ",
    cit_parent: 37,
  },
  {
    cit_id: 374,
    cit_name: "Huyện Anh Sơn",
    cit_parent: 37,
  },
  {
    cit_id: 375,
    cit_name: "Huyện Diễn Châu",
    cit_parent: 37,
  },
  {
    cit_id: 376,
    cit_name: "Huyện Yên Thành",
    cit_parent: 37,
  },
  {
    cit_id: 377,
    cit_name: "Huyện Đô Lương",
    cit_parent: 37,
  },
  {
    cit_id: 378,
    cit_name: "Huyện Thanh Chương",
    cit_parent: 37,
  },
  {
    cit_id: 379,
    cit_name: "Huyện Nghi Lộc",
    cit_parent: 37,
  },
  {
    cit_id: 380,
    cit_name: "Huyện Nam Đàn",
    cit_parent: 37,
  },
  {
    cit_id: 381,
    cit_name: "Huyện Hưng Nguyên",
    cit_parent: 37,
  },
  {
    cit_id: 382,
    cit_name: "Thị xã Hoàng Mai",
    cit_parent: 37,
  },
  {
    cit_id: 383,
    cit_name: "Thành phố Hà Tĩnh",
    cit_parent: 35,
  },
  {
    cit_id: 384,
    cit_name: "Thị xã Hồng Lĩnh",
    cit_parent: 35,
  },
  {
    cit_id: 385,
    cit_name: "Huyện Hương Sơn",
    cit_parent: 35,
  },
  {
    cit_id: 386,
    cit_name: "Huyện Đức Thọ",
    cit_parent: 35,
  },
  {
    cit_id: 387,
    cit_name: "Huyện Vũ Quang",
    cit_parent: 35,
  },
  {
    cit_id: 388,
    cit_name: "Huyện Nghi Xuân",
    cit_parent: 35,
  },
  {
    cit_id: 389,
    cit_name: "Huyện Can Lộc",
    cit_parent: 35,
  },
  {
    cit_id: 390,
    cit_name: "Huyện Hương Khê",
    cit_parent: 35,
  },
  {
    cit_id: 391,
    cit_name: "Huyện Thạch Hà",
    cit_parent: 35,
  },
  {
    cit_id: 392,
    cit_name: "Huyện Cẩm Xuyên",
    cit_parent: 35,
  },
  {
    cit_id: 393,
    cit_name: "Huyện Kỳ Anh",
    cit_parent: 35,
  },
  {
    cit_id: 394,
    cit_name: "Huyện Lộc Hà",
    cit_parent: 35,
  },
  {
    cit_id: 395,
    cit_name: "Thị xã Kỳ Anh",
    cit_parent: 35,
  },
  {
    cit_id: 396,
    cit_name: "Thành Phố Đồng Hới",
    cit_parent: 40,
  },
  {
    cit_id: 397,
    cit_name: "Huyện Minh Hóa",
    cit_parent: 40,
  },
  {
    cit_id: 398,
    cit_name: "Huyện Tuyên Hóa",
    cit_parent: 40,
  },
  {
    cit_id: 399,
    cit_name: "Huyện Quảng Trạch",
    cit_parent: 40,
  },
  {
    cit_id: 400,
    cit_name: "Huyện Bố Trạch",
    cit_parent: 40,
  },
  {
    cit_id: 401,
    cit_name: "Huyện Quảng Ninh",
    cit_parent: 40,
  },
  {
    cit_id: 402,
    cit_name: "Huyện Lệ Thủy",
    cit_parent: 40,
  },
  {
    cit_id: 403,
    cit_name: "Thị xã Ba Đồn",
    cit_parent: 40,
  },
  {
    cit_id: 404,
    cit_name: "Thành phố Đông Hà",
    cit_parent: 43,
  },
  {
    cit_id: 405,
    cit_name: "Thị xã Quảng Trị",
    cit_parent: 43,
  },
  {
    cit_id: 406,
    cit_name: "Huyện Vĩnh Linh",
    cit_parent: 43,
  },
  {
    cit_id: 407,
    cit_name: "Huyện Hướng Hóa",
    cit_parent: 43,
  },
  {
    cit_id: 408,
    cit_name: "Huyện Gio Linh",
    cit_parent: 43,
  },
  {
    cit_id: 409,
    cit_name: "Huyện Đa Krông",
    cit_parent: 43,
  },
  {
    cit_id: 410,
    cit_name: "Huyện Cam Lộ",
    cit_parent: 43,
  },
  {
    cit_id: 411,
    cit_name: "Huyện Triệu Phong",
    cit_parent: 43,
  },
  {
    cit_id: 412,
    cit_name: "Huyện Hải Lăng",
    cit_parent: 43,
  },
  {
    cit_id: 413,
    cit_name: "Thành phố Huế",
    cit_parent: 27,
  },
  {
    cit_id: 414,
    cit_name: "Huyện Phong Điền",
    cit_parent: 27,
  },
  {
    cit_id: 415,
    cit_name: "Huyện Quảng Điền",
    cit_parent: 27,
  },
  {
    cit_id: 416,
    cit_name: "Huyện Phú Vang",
    cit_parent: 27,
  },
  {
    cit_id: 417,
    cit_name: "Thị xã Hương Thủy",
    cit_parent: 27,
  },
  {
    cit_id: 418,
    cit_name: "Thị xã Hương Trà",
    cit_parent: 27,
  },
  {
    cit_id: 419,
    cit_name: "Huyện A Lưới",
    cit_parent: 27,
  },
  {
    cit_id: 420,
    cit_name: "Huyện Phú Lộc",
    cit_parent: 27,
  },
  {
    cit_id: 421,
    cit_name: "Huyện Nam Đông",
    cit_parent: 27,
  },
  {
    cit_id: 422,
    cit_name: "Quận Liên Chiểu",
    cit_parent: 26,
  },
  {
    cit_id: 423,
    cit_name: "Quận Thanh Khê",
    cit_parent: 26,
  },
  {
    cit_id: 424,
    cit_name: "Quận Hải Châu",
    cit_parent: 26,
  },
  {
    cit_id: 425,
    cit_name: "Quận Sơn Trà",
    cit_parent: 26,
  },
  {
    cit_id: 426,
    cit_name: "Quận Ngũ Hành Sơn",
    cit_parent: 26,
  },
  {
    cit_id: 427,
    cit_name: "Quận Cẩm Lệ",
    cit_parent: 26,
  },
  {
    cit_id: 428,
    cit_name: "Huyện Hòa Vang",
    cit_parent: 26,
  },
  {
    cit_id: 429,
    cit_name: "Thành phố Tam Kỳ",
    cit_parent: 41,
  },
  {
    cit_id: 430,
    cit_name: "Thành phố Hội An",
    cit_parent: 41,
  },
  {
    cit_id: 431,
    cit_name: "Huyện Tây Giang",
    cit_parent: 41,
  },
  {
    cit_id: 432,
    cit_name: "Huyện Đông Giang",
    cit_parent: 41,
  },
  {
    cit_id: 433,
    cit_name: "Huyện Đại Lộc",
    cit_parent: 41,
  },
  {
    cit_id: 434,
    cit_name: "Thị xã Điện Bàn",
    cit_parent: 41,
  },
  {
    cit_id: 435,
    cit_name: "Huyện Duy Xuyên",
    cit_parent: 41,
  },
  {
    cit_id: 436,
    cit_name: "Huyện Quế Sơn",
    cit_parent: 41,
  },
  {
    cit_id: 437,
    cit_name: "Huyện Nam Giang",
    cit_parent: 41,
  },
  {
    cit_id: 438,
    cit_name: "Huyện Phước Sơn",
    cit_parent: 41,
  },
  {
    cit_id: 439,
    cit_name: "Huyện Hiệp Đức",
    cit_parent: 41,
  },
  {
    cit_id: 440,
    cit_name: "Huyện Thăng Bình",
    cit_parent: 41,
  },
  {
    cit_id: 441,
    cit_name: "Huyện Tiên Phước",
    cit_parent: 41,
  },
  {
    cit_id: 442,
    cit_name: "Huyện Bắc Trà My",
    cit_parent: 41,
  },
  {
    cit_id: 443,
    cit_name: "Huyện Nam Trà My",
    cit_parent: 41,
  },
  {
    cit_id: 444,
    cit_name: "Huyện Núi Thành",
    cit_parent: 41,
  },
  {
    cit_id: 445,
    cit_name: "Huyện Phú Ninh",
    cit_parent: 41,
  },
  {
    cit_id: 446,
    cit_name: "Huyện Nông Sơn",
    cit_parent: 41,
  },
  {
    cit_id: 447,
    cit_name: "Thành phố Quảng Ngãi",
    cit_parent: 42,
  },
  {
    cit_id: 448,
    cit_name: "Huyện Bình Sơn",
    cit_parent: 42,
  },
  {
    cit_id: 449,
    cit_name: "Huyện Trà Bồng",
    cit_parent: 42,
  },
  {
    cit_id: 450,
    cit_name: "Huyện Tây Trà",
    cit_parent: 42,
  },
  {
    cit_id: 451,
    cit_name: "Huyện Sơn Tịnh",
    cit_parent: 42,
  },
  {
    cit_id: 452,
    cit_name: "Huyện Tư Nghĩa",
    cit_parent: 42,
  },
  {
    cit_id: 453,
    cit_name: "Huyện Sơn Hà",
    cit_parent: 42,
  },
  {
    cit_id: 454,
    cit_name: "Huyện Sơn Tây",
    cit_parent: 42,
  },
  {
    cit_id: 455,
    cit_name: "Huyện Minh Long",
    cit_parent: 42,
  },
  {
    cit_id: 456,
    cit_name: "Huyện Nghĩa Hành",
    cit_parent: 42,
  },
  {
    cit_id: 457,
    cit_name: "Huyện Mộ Đức",
    cit_parent: 42,
  },
  {
    cit_id: 458,
    cit_name: "Thị xã Đức Phổ",
    cit_parent: 42,
  },
  {
    cit_id: 459,
    cit_name: "Huyện Ba Tơ",
    cit_parent: 42,
  },
  {
    cit_id: 460,
    cit_name: "Huyện Lý Sơn",
    cit_parent: 42,
  },
  {
    cit_id: 461,
    cit_name: "Thành phố Quy Nhơn",
    cit_parent: 30,
  },
  {
    cit_id: 462,
    cit_name: "Huyện Hoài Nhơn",
    cit_parent: 30,
  },
  {
    cit_id: 463,
    cit_name: "Huyện Hoài Ân",
    cit_parent: 30,
  },
  {
    cit_id: 464,
    cit_name: "Huyện Phù Mỹ",
    cit_parent: 30,
  },
  {
    cit_id: 465,
    cit_name: "Huyện Vĩnh Thạnh",
    cit_parent: 30,
  },
  {
    cit_id: 466,
    cit_name: "Huyện Tây Sơn",
    cit_parent: 30,
  },
  {
    cit_id: 467,
    cit_name: "Huyện Phù Cát",
    cit_parent: 30,
  },
  {
    cit_id: 468,
    cit_name: "Thị xã An Nhơn",
    cit_parent: 30,
  },
  {
    cit_id: 469,
    cit_name: "Huyện Tuy Phước",
    cit_parent: 30,
  },
  {
    cit_id: 470,
    cit_name: "Huyện Vân Canh",
    cit_parent: 30,
  },
  {
    cit_id: 471,
    cit_name: "Thành phố Tuy Hoà",
    cit_parent: 39,
  },
  {
    cit_id: 472,
    cit_name: "Thị xã Sông Cầu",
    cit_parent: 39,
  },
  {
    cit_id: 473,
    cit_name: "Huyện Đồng Xuân",
    cit_parent: 39,
  },
  {
    cit_id: 474,
    cit_name: "Huyện Tuy An",
    cit_parent: 39,
  },
  {
    cit_id: 475,
    cit_name: "Huyện Sơn Hòa",
    cit_parent: 39,
  },
  {
    cit_id: 476,
    cit_name: "Huyện Sông Hinh",
    cit_parent: 39,
  },
  {
    cit_id: 477,
    cit_name: "Huyện Tây Hoà",
    cit_parent: 39,
  },
  {
    cit_id: 478,
    cit_name: "Huyện Phú Hoà",
    cit_parent: 39,
  },
  {
    cit_id: 479,
    cit_name: "Huyện Đông Hòa",
    cit_parent: 39,
  },
  {
    cit_id: 480,
    cit_name: "Thành phố Nha Trang",
    cit_parent: 28,
  },
  {
    cit_id: 481,
    cit_name: "Thành phố Cam Ranh",
    cit_parent: 28,
  },
  {
    cit_id: 482,
    cit_name: "Huyện Cam Lâm",
    cit_parent: 28,
  },
  {
    cit_id: 483,
    cit_name: "Huyện Vạn Ninh",
    cit_parent: 28,
  },
  {
    cit_id: 484,
    cit_name: "Thị xã Ninh Hòa",
    cit_parent: 28,
  },
  {
    cit_id: 485,
    cit_name: "Huyện Khánh Vĩnh",
    cit_parent: 28,
  },
  {
    cit_id: 486,
    cit_name: "Huyện Diên Khánh",
    cit_parent: 28,
  },
  {
    cit_id: 487,
    cit_name: "Huyện Khánh Sơn",
    cit_parent: 28,
  },
  {
    cit_id: 488,
    cit_name: "Huyện Trường Sa",
    cit_parent: 28,
  },
  {
    cit_id: 489,
    cit_name: "Thành phố Phan Rang-Tháp Chàm",
    cit_parent: 38,
  },
  {
    cit_id: 490,
    cit_name: "Huyện Bác Ái",
    cit_parent: 38,
  },
  {
    cit_id: 491,
    cit_name: "Huyện Ninh Sơn",
    cit_parent: 38,
  },
  {
    cit_id: 492,
    cit_name: "Huyện Ninh Hải",
    cit_parent: 38,
  },
  {
    cit_id: 493,
    cit_name: "Huyện Ninh Phước",
    cit_parent: 38,
  },
  {
    cit_id: 494,
    cit_name: "Huyện Thuận Bắc",
    cit_parent: 38,
  },
  {
    cit_id: 495,
    cit_name: "Huyện Thuận Nam",
    cit_parent: 38,
  },
  {
    cit_id: 496,
    cit_name: "Thành phố Phan Thiết",
    cit_parent: 31,
  },
  {
    cit_id: 497,
    cit_name: "Thị xã La Gi",
    cit_parent: 31,
  },
  {
    cit_id: 498,
    cit_name: "Huyện Tuy Phong",
    cit_parent: 31,
  },
  {
    cit_id: 499,
    cit_name: "Huyện Bắc Bình",
    cit_parent: 31,
  },
  {
    cit_id: 500,
    cit_name: "Huyện Hàm Thuận Bắc",
    cit_parent: 31,
  },
  {
    cit_id: 501,
    cit_name: "Huyện Hàm Thuận Nam",
    cit_parent: 31,
  },
  {
    cit_id: 502,
    cit_name: "Huyện Tánh Linh",
    cit_parent: 31,
  },
  {
    cit_id: 503,
    cit_name: "Huyện Đức Linh",
    cit_parent: 31,
  },
  {
    cit_id: 504,
    cit_name: "Huyện Hàm Tân",
    cit_parent: 31,
  },
  {
    cit_id: 505,
    cit_name: "Huyện Phú Quí",
    cit_parent: 31,
  },
  {
    cit_id: 506,
    cit_name: "Thành phố Kon Tum",
    cit_parent: 36,
  },
  {
    cit_id: 507,
    cit_name: "Huyện Đắk Glei",
    cit_parent: 36,
  },
  {
    cit_id: 508,
    cit_name: "Huyện Ngọc Hồi",
    cit_parent: 36,
  },
  {
    cit_id: 509,
    cit_name: "Huyện Đắk Tô",
    cit_parent: 36,
  },
  {
    cit_id: 510,
    cit_name: "Huyện Kon Plông",
    cit_parent: 36,
  },
  {
    cit_id: 511,
    cit_name: "Huyện Kon Rẫy",
    cit_parent: 36,
  },
  {
    cit_id: 512,
    cit_name: "Huyện Đắk Hà",
    cit_parent: 36,
  },
  {
    cit_id: 513,
    cit_name: "Huyện Sa Thầy",
    cit_parent: 36,
  },
  {
    cit_id: 514,
    cit_name: "Huyện Tu Mơ Rông",
    cit_parent: 36,
  },
  {
    cit_id: 515,
    cit_name: "Huyện Ia H' Drai",
    cit_parent: 36,
  },
  {
    cit_id: 516,
    cit_name: "Thành phố Pleiku",
    cit_parent: 34,
  },
  {
    cit_id: 517,
    cit_name: "Thị xã An Khê",
    cit_parent: 34,
  },
  {
    cit_id: 518,
    cit_name: "Thị xã Ayun Pa",
    cit_parent: 34,
  },
  {
    cit_id: 519,
    cit_name: "Huyện KBang",
    cit_parent: 34,
  },
  {
    cit_id: 520,
    cit_name: "Huyện Đăk Đoa",
    cit_parent: 34,
  },
  {
    cit_id: 521,
    cit_name: "Huyện Chư Păh",
    cit_parent: 34,
  },
  {
    cit_id: 522,
    cit_name: "Huyện Ia Grai",
    cit_parent: 34,
  },
  {
    cit_id: 523,
    cit_name: "Huyện Mang Yang",
    cit_parent: 34,
  },
  {
    cit_id: 524,
    cit_name: "Huyện Kông Chro",
    cit_parent: 34,
  },
  {
    cit_id: 525,
    cit_name: "Huyện Đức Cơ",
    cit_parent: 34,
  },
  {
    cit_id: 526,
    cit_name: "Huyện Chư Prông",
    cit_parent: 34,
  },
  {
    cit_id: 527,
    cit_name: "Huyện Chư Sê",
    cit_parent: 34,
  },
  {
    cit_id: 528,
    cit_name: "Huyện Đăk Pơ",
    cit_parent: 34,
  },
  {
    cit_id: 529,
    cit_name: "Huyện Ia Pa",
    cit_parent: 34,
  },
  {
    cit_id: 530,
    cit_name: "Huyện Krông Pa",
    cit_parent: 34,
  },
  {
    cit_id: 531,
    cit_name: "Huyện Phú Thiện",
    cit_parent: 34,
  },
  {
    cit_id: 532,
    cit_name: "Huyện Chư Pưh",
    cit_parent: 34,
  },
  {
    cit_id: 533,
    cit_name: "Thành phố Buôn Ma Thuột",
    cit_parent: 32,
  },
  {
    cit_id: 534,
    cit_name: "Thị Xã Buôn Hồ",
    cit_parent: 32,
  },
  {
    cit_id: 535,
    cit_name: "Huyện Ea H'leo",
    cit_parent: 32,
  },
  {
    cit_id: 536,
    cit_name: "Huyện Ea Súp",
    cit_parent: 32,
  },
  {
    cit_id: 537,
    cit_name: "Huyện Buôn Đôn",
    cit_parent: 32,
  },
  {
    cit_id: 538,
    cit_name: "Huyện Cư M'gar",
    cit_parent: 32,
  },
  {
    cit_id: 539,
    cit_name: "Huyện Krông Búk",
    cit_parent: 32,
  },
  {
    cit_id: 679,
    cit_name: "Thành phố Vĩnh Long",
    cit_parent: 63,
  },
  {
    cit_id: 541,
    cit_name: "Huyện Krông Năng",
    cit_parent: 32,
  },
  {
    cit_id: 542,
    cit_name: "Huyện Ea Kar",
    cit_parent: 32,
  },
  {
    cit_id: 543,
    cit_name: "Huyện M'Đrắk",
    cit_parent: 32,
  },
  {
    cit_id: 544,
    cit_name: "Huyện Krông Bông",
    cit_parent: 32,
  },
  {
    cit_id: 545,
    cit_name: "Huyện Krông Pắc",
    cit_parent: 32,
  },
  {
    cit_id: 546,
    cit_name: "Huyện Krông A Na",
    cit_parent: 32,
  },
  {
    cit_id: 547,
    cit_name: "Huyện Lắk",
    cit_parent: 32,
  },
  {
    cit_id: 548,
    cit_name: "Huyện Cư Kuin",
    cit_parent: 32,
  },
  {
    cit_id: 549,
    cit_name: "Thị xã Gia Nghĩa",
    cit_parent: 33,
  },
  {
    cit_id: 550,
    cit_name: "Huyện Đăk Glong",
    cit_parent: 33,
  },
  {
    cit_id: 551,
    cit_name: "Huyện Cư Jút",
    cit_parent: 33,
  },
  {
    cit_id: 552,
    cit_name: "Huyện Đắk Mil",
    cit_parent: 33,
  },
  {
    cit_id: 553,
    cit_name: "Huyện Krông Nô",
    cit_parent: 33,
  },
  {
    cit_id: 554,
    cit_name: "Huyện Đắk Song",
    cit_parent: 33,
  },
  {
    cit_id: 555,
    cit_name: "Huyện Đắk R'Lấp",
    cit_parent: 33,
  },
  {
    cit_id: 556,
    cit_name: "Huyện Tuy Đức",
    cit_parent: 33,
  },
  {
    cit_id: 557,
    cit_name: "Thành phố Đà Lạt",
    cit_parent: 29,
  },
  {
    cit_id: 558,
    cit_name: "Thành phố Bảo Lộc",
    cit_parent: 29,
  },
  {
    cit_id: 559,
    cit_name: "Huyện Đam Rông",
    cit_parent: 29,
  },
  {
    cit_id: 560,
    cit_name: "Huyện Lạc Dương",
    cit_parent: 29,
  },
  {
    cit_id: 561,
    cit_name: "Huyện Lâm Hà",
    cit_parent: 29,
  },
  {
    cit_id: 562,
    cit_name: "Huyện Đơn Dương",
    cit_parent: 29,
  },
  {
    cit_id: 563,
    cit_name: "Huyện Đức Trọng",
    cit_parent: 29,
  },
  {
    cit_id: 564,
    cit_name: "Huyện Di Linh",
    cit_parent: 29,
  },
  {
    cit_id: 565,
    cit_name: "Huyện Đạ Huoai",
    cit_parent: 29,
  },
  {
    cit_id: 566,
    cit_name: "Huyện Đạ Tẻh",
    cit_parent: 29,
  },
  {
    cit_id: 567,
    cit_name: "Huyện Cát Tiên",
    cit_parent: 29,
  },
  {
    cit_id: 568,
    cit_name: "Thị xã Phước Long",
    cit_parent: 51,
  },
  {
    cit_id: 569,
    cit_name: "Thị xã Đồng Xoài",
    cit_parent: 51,
  },
  {
    cit_id: 570,
    cit_name: "Thị xã Bình Long",
    cit_parent: 51,
  },
  {
    cit_id: 571,
    cit_name: "Huyện Bù Gia Mập",
    cit_parent: 51,
  },
  {
    cit_id: 572,
    cit_name: "Huyện Lộc Ninh",
    cit_parent: 51,
  },
  {
    cit_id: 573,
    cit_name: "Huyện Bù Đốp",
    cit_parent: 51,
  },
  {
    cit_id: 574,
    cit_name: "Huyện Hớn Quản",
    cit_parent: 51,
  },
  {
    cit_id: 575,
    cit_name: "Huyện Đồng Phú",
    cit_parent: 51,
  },
  {
    cit_id: 576,
    cit_name: "Huyện Bù Đăng",
    cit_parent: 51,
  },
  {
    cit_id: 577,
    cit_name: "Huyện Chơn Thành",
    cit_parent: 51,
  },
  {
    cit_id: 578,
    cit_name: "Huyện Phú Riềng",
    cit_parent: 51,
  },
  {
    cit_id: 579,
    cit_name: "Thành phố Tây Ninh",
    cit_parent: 61,
  },
  {
    cit_id: 580,
    cit_name: "Huyện Tân Biên",
    cit_parent: 61,
  },
  {
    cit_id: 581,
    cit_name: "Huyện Tân Châu",
    cit_parent: 61,
  },
  {
    cit_id: 582,
    cit_name: "Huyện Dương Minh Châu",
    cit_parent: 61,
  },
  {
    cit_id: 583,
    cit_name: "Huyện Châu Thành",
    cit_parent: 61,
  },
  {
    cit_id: 584,
    cit_name: "Thị xã Hòa Thành",
    cit_parent: 61,
  },
  {
    cit_id: 585,
    cit_name: "Huyện Gò Dầu",
    cit_parent: 61,
  },
  {
    cit_id: 586,
    cit_name: "Huyện Bến Cầu",
    cit_parent: 61,
  },
  {
    cit_id: 587,
    cit_name: "Thị xã Trảng Bàng",
    cit_parent: 61,
  },
  {
    cit_id: 588,
    cit_name: "Thành phố Thủ Dầu Một",
    cit_parent: 46,
  },
  {
    cit_id: 589,
    cit_name: "Huyện Bàu Bàng",
    cit_parent: 46,
  },
  {
    cit_id: 590,
    cit_name: "Huyện Dầu Tiếng",
    cit_parent: 46,
  },
  {
    cit_id: 591,
    cit_name: "Thị xã Bến Cát",
    cit_parent: 46,
  },
  {
    cit_id: 592,
    cit_name: "Huyện Phú Giáo",
    cit_parent: 46,
  },
  {
    cit_id: 593,
    cit_name: "Thị xã Tân Uyên",
    cit_parent: 46,
  },
  {
    cit_id: 594,
    cit_name: "Thành phố Dĩ An",
    cit_parent: 46,
  },
  {
    cit_id: 595,
    cit_name: "Thành phố Thuận An",
    cit_parent: 46,
  },
  {
    cit_id: 596,
    cit_name: "Huyện Bắc Tân Uyên",
    cit_parent: 46,
  },
  {
    cit_id: 597,
    cit_name: "Thành phố Biên Hòa",
    cit_parent: 55,
  },
  {
    cit_id: 598,
    cit_name: "Thành phố Long Khánh",
    cit_parent: 55,
  },
  {
    cit_id: 599,
    cit_name: "Huyện Tân Phú",
    cit_parent: 55,
  },
  {
    cit_id: 600,
    cit_name: "Huyện Vĩnh Cửu",
    cit_parent: 55,
  },
  {
    cit_id: 601,
    cit_name: "Huyện Định Quán",
    cit_parent: 55,
  },
  {
    cit_id: 602,
    cit_name: "Huyện Trảng Bom",
    cit_parent: 55,
  },
  {
    cit_id: 603,
    cit_name: "Huyện Thống Nhất",
    cit_parent: 55,
  },
  {
    cit_id: 604,
    cit_name: "Huyện Cẩm Mỹ",
    cit_parent: 55,
  },
  {
    cit_id: 605,
    cit_name: "Huyện Long Thành",
    cit_parent: 55,
  },
  {
    cit_id: 606,
    cit_name: "Huyện Xuân Lộc",
    cit_parent: 55,
  },
  {
    cit_id: 607,
    cit_name: "Huyện Nhơn Trạch",
    cit_parent: 55,
  },
  {
    cit_id: 608,
    cit_name: "Thành phố Vũng Tàu",
    cit_parent: 47,
  },
  {
    cit_id: 609,
    cit_name: "Thành phố Bà Rịa",
    cit_parent: 47,
  },
  {
    cit_id: 610,
    cit_name: "Huyện Châu Đức",
    cit_parent: 47,
  },
  {
    cit_id: 611,
    cit_name: "Huyện Xuyên Mộc",
    cit_parent: 47,
  },
  {
    cit_id: 612,
    cit_name: "Huyện Long Điền",
    cit_parent: 47,
  },
  {
    cit_id: 613,
    cit_name: "Huyện Đất Đỏ",
    cit_parent: 47,
  },
  {
    cit_id: 614,
    cit_name: "Huyện Tân Thành",
    cit_parent: 47,
  },
  {
    cit_id: 615,
    cit_name: "Quận 1",
    cit_parent: 45,
  },
  {
    cit_id: 616,
    cit_name: "Quận 12",
    cit_parent: 45,
  },
  {
    cit_id: 617,
    cit_name: "Quận Thủ Đức",
    cit_parent: 45,
  },
  {
    cit_id: 618,
    cit_name: "Quận 9",
    cit_parent: 45,
  },
  {
    cit_id: 619,
    cit_name: "Quận Gò Vấp",
    cit_parent: 45,
  },
  {
    cit_id: 620,
    cit_name: "Quận Bình Thạnh",
    cit_parent: 45,
  },
  {
    cit_id: 621,
    cit_name: "Quận Tân Bình",
    cit_parent: 45,
  },
  {
    cit_id: 622,
    cit_name: "Quận Tân Phú",
    cit_parent: 45,
  },
  {
    cit_id: 623,
    cit_name: "Quận Phú Nhuận",
    cit_parent: 45,
  },
  {
    cit_id: 624,
    cit_name: "Quận 2",
    cit_parent: 45,
  },
  {
    cit_id: 625,
    cit_name: "Quận 3",
    cit_parent: 45,
  },
  {
    cit_id: 626,
    cit_name: "Quận 10",
    cit_parent: 45,
  },
  {
    cit_id: 627,
    cit_name: "Quận 11",
    cit_parent: 45,
  },
  {
    cit_id: 628,
    cit_name: "Quận 4",
    cit_parent: 45,
  },
  {
    cit_id: 629,
    cit_name: "Quận 5",
    cit_parent: 45,
  },
  {
    cit_id: 630,
    cit_name: "Quận 6",
    cit_parent: 45,
  },
  {
    cit_id: 631,
    cit_name: "Quận 8",
    cit_parent: 45,
  },
  {
    cit_id: 632,
    cit_name: "Quận Bình Tân",
    cit_parent: 45,
  },
  {
    cit_id: 633,
    cit_name: "Quận 7",
    cit_parent: 45,
  },
  {
    cit_id: 634,
    cit_name: "Huyện Củ Chi",
    cit_parent: 45,
  },
  {
    cit_id: 635,
    cit_name: "Huyện Hóc Môn",
    cit_parent: 45,
  },
  {
    cit_id: 636,
    cit_name: "Huyện Bình Chánh",
    cit_parent: 45,
  },
  {
    cit_id: 637,
    cit_name: "Huyện Nhà Bè",
    cit_parent: 45,
  },
  {
    cit_id: 638,
    cit_name: "Huyện Cần Giờ",
    cit_parent: 45,
  },
  {
    cit_id: 639,
    cit_name: "Thành phố Tân An",
    cit_parent: 58,
  },
  {
    cit_id: 640,
    cit_name: "Thị xã Kiến Tường",
    cit_parent: 58,
  },
  {
    cit_id: 641,
    cit_name: "Huyện Tân Hưng",
    cit_parent: 58,
  },
  {
    cit_id: 774,
    cit_name: "Huyện Châu Thành",
    cit_parent: 62,
  },
  {
    cit_id: 643,
    cit_name: "Huyện Mộc Hóa",
    cit_parent: 58,
  },
  {
    cit_id: 644,
    cit_name: "Huyện Tân Thạnh",
    cit_parent: 58,
  },
  {
    cit_id: 645,
    cit_name: "Huyện Thạnh Hóa",
    cit_parent: 58,
  },
  {
    cit_id: 646,
    cit_name: "Huyện Đức Huệ",
    cit_parent: 58,
  },
  {
    cit_id: 647,
    cit_name: "Huyện Đức Hòa",
    cit_parent: 58,
  },
  {
    cit_id: 648,
    cit_name: "Huyện Bến Lức",
    cit_parent: 58,
  },
  {
    cit_id: 649,
    cit_name: "Huyện Thủ Thừa",
    cit_parent: 58,
  },
  {
    cit_id: 650,
    cit_name: "Huyện Tân Trụ",
    cit_parent: 58,
  },
  {
    cit_id: 651,
    cit_name: "Huyện Cần Đước",
    cit_parent: 58,
  },
  {
    cit_id: 652,
    cit_name: "Huyện Cần Giuộc",
    cit_parent: 58,
  },
  {
    cit_id: 653,
    cit_name: "Thành phố Mỹ Tho",
    cit_parent: 60,
  },
  {
    cit_id: 654,
    cit_name: "Thị xã Gò Công",
    cit_parent: 60,
  },
  {
    cit_id: 655,
    cit_name: "Thị xã Cai Lậy",
    cit_parent: 60,
  },
  {
    cit_id: 656,
    cit_name: "Huyện Tân Phước",
    cit_parent: 60,
  },
  {
    cit_id: 657,
    cit_name: "Huyện Cái Bè",
    cit_parent: 60,
  },
  {
    cit_id: 658,
    cit_name: "Huyện Cai Lậy",
    cit_parent: 60,
  },
  {
    cit_id: 772,
    cit_name: "Huyện Châu Thành",
    cit_parent: 52,
  },
  {
    cit_id: 660,
    cit_name: "Huyện Gò Công Tây",
    cit_parent: 60,
  },
  {
    cit_id: 661,
    cit_name: "Huyện Gò Công Đông",
    cit_parent: 60,
  },
  {
    cit_id: 662,
    cit_name: "Huyện Tân Phú Đông",
    cit_parent: 60,
  },
  {
    cit_id: 663,
    cit_name: "Thành phố Bến Tre",
    cit_parent: 52,
  },
  {
    cit_id: 664,
    cit_name: "Huyện Chợ Lách",
    cit_parent: 52,
  },
  {
    cit_id: 665,
    cit_name: "Huyện Mỏ Cày Nam",
    cit_parent: 52,
  },
  {
    cit_id: 666,
    cit_name: "Huyện Giồng Trôm",
    cit_parent: 52,
  },
  {
    cit_id: 667,
    cit_name: "Huyện Bình Đại",
    cit_parent: 52,
  },
  {
    cit_id: 668,
    cit_name: "Huyện Ba Tri",
    cit_parent: 52,
  },
  {
    cit_id: 669,
    cit_name: "Huyện Thạnh Phú",
    cit_parent: 52,
  },
  {
    cit_id: 670,
    cit_name: "Huyện Mỏ Cày Bắc",
    cit_parent: 52,
  },
  {
    cit_id: 671,
    cit_name: "Thành phố Trà Vinh",
    cit_parent: 62,
  },
  {
    cit_id: 672,
    cit_name: "Huyện Càng Long",
    cit_parent: 62,
  },
  {
    cit_id: 673,
    cit_name: "Huyện Cầu Kè",
    cit_parent: 62,
  },
  {
    cit_id: 674,
    cit_name: "Huyện Tiểu Cần",
    cit_parent: 62,
  },
  {
    cit_id: 675,
    cit_name: "Huyện Cầu Ngang",
    cit_parent: 62,
  },
  {
    cit_id: 676,
    cit_name: "Huyện Trà Cú",
    cit_parent: 62,
  },
  {
    cit_id: 677,
    cit_name: "Huyện Duyên Hải",
    cit_parent: 62,
  },
  {
    cit_id: 678,
    cit_name: "Thị xã Duyên Hải",
    cit_parent: 62,
  },
  {
    cit_id: 680,
    cit_name: "Huyện Long Hồ",
    cit_parent: 63,
  },
  {
    cit_id: 681,
    cit_name: "Huyện Mang Thít",
    cit_parent: 63,
  },
  {
    cit_id: 682,
    cit_name: "Huyện  Vũng Liêm",
    cit_parent: 63,
  },
  {
    cit_id: 683,
    cit_name: "Huyện Tam Bình",
    cit_parent: 63,
  },
  {
    cit_id: 684,
    cit_name: "Thị xã Bình Minh",
    cit_parent: 63,
  },
  {
    cit_id: 685,
    cit_name: "Huyện Trà Ôn",
    cit_parent: 63,
  },
  {
    cit_id: 686,
    cit_name: "Huyện Bình Tân",
    cit_parent: 63,
  },
  {
    cit_id: 687,
    cit_name: "Thành phố Cao Lãnh",
    cit_parent: 54,
  },
  {
    cit_id: 688,
    cit_name: "Thành phố Sa Đéc",
    cit_parent: 54,
  },
  {
    cit_id: 689,
    cit_name: "Huyện Hồng Ngự",
    cit_parent: 54,
  },
  {
    cit_id: 690,
    cit_name: "Huyện Tân Hồng",
    cit_parent: 54,
  },
  {
    cit_id: 691,
    cit_name: "Thành phố Hồng Ngự",
    cit_parent: 54,
  },
  {
    cit_id: 692,
    cit_name: "Huyện Tháp Mười",
    cit_parent: 54,
  },
  {
    cit_id: 693,
    cit_name: "Huyện Cao Lãnh",
    cit_parent: 54,
  },
  {
    cit_id: 694,
    cit_name: "Huyện Thanh Bình",
    cit_parent: 54,
  },
  {
    cit_id: 695,
    cit_name: "Huyện Lấp Vò",
    cit_parent: 54,
  },
  {
    cit_id: 696,
    cit_name: "Huyện Lai Vung",
    cit_parent: 54,
  },
  {
    cit_id: 697,
    cit_name: "Thành phố Long Xuyên",
    cit_parent: 49,
  },
  {
    cit_id: 698,
    cit_name: "Thành phố Châu Đốc",
    cit_parent: 49,
  },
  {
    cit_id: 699,
    cit_name: "Huyện An Phú",
    cit_parent: 49,
  },
  {
    cit_id: 700,
    cit_name: "Thị xã Tân Châu",
    cit_parent: 49,
  },
  {
    cit_id: 701,
    cit_name: "Huyện Phú Tân",
    cit_parent: 49,
  },
  {
    cit_id: 702,
    cit_name: "Huyện Châu Phú",
    cit_parent: 49,
  },
  {
    cit_id: 703,
    cit_name: "Huyện Tịnh Biên",
    cit_parent: 49,
  },
  {
    cit_id: 704,
    cit_name: "Huyện Tri Tôn",
    cit_parent: 49,
  },
  {
    cit_id: 705,
    cit_name: "Huyện Thoại Sơn",
    cit_parent: 49,
  },
  {
    cit_id: 706,
    cit_name: "Thành phố Rạch Giá",
    cit_parent: 57,
  },
  {
    cit_id: 707,
    cit_name: "Thành phố Hà Tiên",
    cit_parent: 57,
  },
  {
    cit_id: 708,
    cit_name: "Huyện Kiên Lương",
    cit_parent: 57,
  },
  {
    cit_id: 709,
    cit_name: "Huyện Hòn Đất",
    cit_parent: 57,
  },
  {
    cit_id: 717,
    cit_name: "Huyện Phú Quốc",
    cit_parent: 57,
  },
  {
    cit_id: 711,
    cit_name: "Huyện Tân Hiệp",
    cit_parent: 57,
  },
  {
    cit_id: 712,
    cit_name: "Huyện Giồng Riềng",
    cit_parent: 57,
  },
  {
    cit_id: 713,
    cit_name: "Huyện Gò Quao",
    cit_parent: 57,
  },
  {
    cit_id: 714,
    cit_name: "Huyện An Biên",
    cit_parent: 57,
  },
  {
    cit_id: 715,
    cit_name: "Huyện An Minh",
    cit_parent: 57,
  },
  {
    cit_id: 716,
    cit_name: "Huyện Vĩnh Thuận",
    cit_parent: 57,
  },
  {
    cit_id: 718,
    cit_name: "Huyện Kiên Hải",
    cit_parent: 57,
  },
  {
    cit_id: 719,
    cit_name: "Huyện U Minh Thượng",
    cit_parent: 57,
  },
  {
    cit_id: 720,
    cit_name: "Huyện Giang Thành",
    cit_parent: 57,
  },
  {
    cit_id: 721,
    cit_name: "Quận Ninh Kiều",
    cit_parent: 48,
  },
  {
    cit_id: 722,
    cit_name: "Quận Ô Môn",
    cit_parent: 48,
  },
  {
    cit_id: 723,
    cit_name: "Quận Bình Thuỷ",
    cit_parent: 48,
  },
  {
    cit_id: 724,
    cit_name: "Quận Cái Răng",
    cit_parent: 48,
  },
  {
    cit_id: 725,
    cit_name: "Quận Thốt Nốt",
    cit_parent: 48,
  },
  {
    cit_id: 726,
    cit_name: "Huyện Cờ Đỏ",
    cit_parent: 48,
  },
  {
    cit_id: 727,
    cit_name: "Huyện Thới Lai",
    cit_parent: 48,
  },
  {
    cit_id: 728,
    cit_name: "Thành phố Vị Thanh",
    cit_parent: 56,
  },
  {
    cit_id: 729,
    cit_name: "Thành phố Ngã Bảy",
    cit_parent: 56,
  },
  {
    cit_id: 730,
    cit_name: "Huyện Châu Thành A",
    cit_parent: 56,
  },
  {
    cit_id: 731,
    cit_name: "Huyện Phụng Hiệp",
    cit_parent: 56,
  },
  {
    cit_id: 732,
    cit_name: "Huyện Vị Thuỷ",
    cit_parent: 56,
  },
  {
    cit_id: 733,
    cit_name: "Huyện Long Mỹ",
    cit_parent: 56,
  },
  {
    cit_id: 734,
    cit_name: "Thị xã Long Mỹ",
    cit_parent: 56,
  },
  {
    cit_id: 735,
    cit_name: "Thành phố Sóc Trăng",
    cit_parent: 59,
  },
  {
    cit_id: 736,
    cit_name: "Huyện Kế Sách",
    cit_parent: 59,
  },
  {
    cit_id: 737,
    cit_name: "Huyện Mỹ Tú",
    cit_parent: 59,
  },
  {
    cit_id: 738,
    cit_name: "Huyện Cù Lao Dung",
    cit_parent: 59,
  },
  {
    cit_id: 739,
    cit_name: "Huyện Long Phú",
    cit_parent: 59,
  },
  {
    cit_id: 740,
    cit_name: "Huyện Mỹ Xuyên",
    cit_parent: 59,
  },
  {
    cit_id: 741,
    cit_name: "Thị xã Ngã Năm",
    cit_parent: 59,
  },
  {
    cit_id: 742,
    cit_name: "Huyện Thạnh Trị",
    cit_parent: 59,
  },
  {
    cit_id: 743,
    cit_name: "Thị xã Vĩnh Châu",
    cit_parent: 59,
  },
  {
    cit_id: 744,
    cit_name: "Huyện Trần Đề",
    cit_parent: 59,
  },
  {
    cit_id: 745,
    cit_name: "Thành phố Bạc Liêu",
    cit_parent: 50,
  },
  {
    cit_id: 746,
    cit_name: "Huyện Hồng Dân",
    cit_parent: 50,
  },
  {
    cit_id: 747,
    cit_name: "Huyện Phước Long",
    cit_parent: 50,
  },
  {
    cit_id: 748,
    cit_name: "Huyện Vĩnh Lợi",
    cit_parent: 50,
  },
  {
    cit_id: 749,
    cit_name: "Thị xã Giá Rai",
    cit_parent: 50,
  },
  {
    cit_id: 750,
    cit_name: "Huyện Đông Hải",
    cit_parent: 50,
  },
  {
    cit_id: 751,
    cit_name: "Huyện Hoà Bình",
    cit_parent: 50,
  },
  {
    cit_id: 752,
    cit_name: "Thành phố Cà Mau",
    cit_parent: 53,
  },
  {
    cit_id: 753,
    cit_name: "Huyện U Minh",
    cit_parent: 53,
  },
  {
    cit_id: 754,
    cit_name: "Huyện Thới Bình",
    cit_parent: 53,
  },
  {
    cit_id: 755,
    cit_name: "Huyện Trần Văn Thời",
    cit_parent: 53,
  },
  {
    cit_id: 756,
    cit_name: "Huyện Cái Nước",
    cit_parent: 53,
  },
  {
    cit_id: 757,
    cit_name: "Huyện Đầm Dơi",
    cit_parent: 53,
  },
  {
    cit_id: 758,
    cit_name: "Huyện Năm Căn",
    cit_parent: 53,
  },
  {
    cit_id: 759,
    cit_name: "Huyện Ngọc Hiển",
    cit_parent: 53,
  },
  {
    cit_id: 760,
    cit_name: "Huyện Chợ Mới",
    cit_parent: 49,
  },
  {
    cit_id: 761,
    cit_name: "Huyện Châu Thành",
    cit_parent: 56,
  },
  {
    cit_id: 762,
    cit_name: "Huyện Châu Thành",
    cit_parent: 49,
  },
  {
    cit_id: 763,
    cit_name: "Thành phố Cam Đường",
    cit_parent: 13,
  },
  {
    cit_id: 764,
    cit_name: "Huyện Châu Thành",
    cit_parent: 54,
  },
  {
    cit_id: 765,
    cit_name: "Huyện Tam Nông",
    cit_parent: 54,
  },
  {
    cit_id: 766,
    cit_name: "Huyện Bạch Long Vĩ",
    cit_parent: 2,
  },
  {
    cit_id: 767,
    cit_name: "Huyện Bảo Lâm",
    cit_parent: 29,
  },
  {
    cit_id: 768,
    cit_name: "Huyện Vĩnh Hưng",
    cit_parent: 58,
  },
  {
    cit_id: 769,
    cit_name: "Huyện Châu Thành",
    cit_parent: 58,
  },
  {
    cit_id: 771,
    cit_name: "Huyện Châu Thành",
    cit_parent: 60,
  },
  {
    cit_id: 777,
    cit_name: "Thị xã Phú Mỹ",
    cit_parent: 47,
  },
  {
    cit_id: 775,
    cit_name: "Huyện Phong Điền",
    cit_parent: 48,
  },
  {
    cit_id: 776,
    cit_name: "Huyện Vĩnh Thạnh",
    cit_parent: 48,
  },
  {
    cit_id: 778,
    cit_name: "Thị xã Nghi Sơn",
    cit_parent: 44,
  },
  {
    cit_id: 779,
    cit_name: "Huyện Châu Thành",
    cit_parent: 59,
  },
];
const data_exp = [
  "Chưa có kinh nghiệm",
  "0 - 1 năm kinh nghiệm",
  "Hơn 1 năm kinh nghiệm",
  "Hơn 2 năm kinh nghiệm",
  "Hơn 3 năm kinh nghiệm",
  "Hơn 4 năm kinh nghiệm",
  "Hơn 5 năm kinh nghiệm",
  "Hơn 10 năm kinh nghiệm",
];
const new_money_type = [
  "Chọn loại mức lương",
  "Thỏa thuận",
  "Từ mức",
  "Đến mức",
  "Từ mức - Đến mức",
  "Trong khoảng",
];
const data_salary = [
  "Thỏa thuận",
  "1 triệu - 3 triệu",
  "3 triệu - 5 triệu",
  "5 triệu - 7 triệu",
  "7 triệu - 10 triệu",
  "10 triệu - 15 triệu",
  "15 triệu - 20 triệu",
  "20 triệu - 30 triệu",
  "Trên 30 triệu",
  "Trên 50 triệu",
  "Trên 100 triệu",
];
const data_capBac = [
  "Chọn cấp bậc",
  "Mới tốt nghiệp",
  "Nhân viên",
  "Trưởng Nhóm",
  "Trưởng Phòng",
  "Thực tập sinh",
  "Quản lý cấp trung",
  "Quản lý cấp cao",
  "Phó tổ trưởng",
  "Tổ trưởng",
  "Phó giám đốc",
  "Phó tổng giám đốc",
  "Tổng giám đốc",
];
const data_hinhthuc = [
  "Chọn hình thức làm việc",
  "Toàn thời gian cố định",
  "Toàn thời gian tạm thời",
  "Bán thời gian",
  "Bán thời gian tạm thời",
  "Hợp đồng",
  "Khác",
];
const data_right = [
  "Chọn đơn vị tiền",
  "VNĐ",
  "USD",
  "EURO"
];
const data_Bangcap = {
  99: "Chọn bằng cấp",
  0: "Không yêu cầu bằng cấp",
  1: "PTCS",
  2: "Trung học",
  3: "Chứng chỉ",
  4: "Trung cấp",
  5: "Cao đẳng",
  6: "Cử nhân",
  7: "Đại học",
  8: "Thạc sĩ",
  9: "Thạc sĩ nghệ thuật",
  10: "Thạc sĩ thương mại",
  11: "Thạc sĩ khoa học",
  12: "Thạc sĩ kiến trúc",
  13: "Thạc sĩ QTKD",
  14: "Thạc sĩ Kỹ thuật ứng dụng",
  15: "Thạc sĩ luật",
  16: "Thạc sỹ Y học",
  17: "Thạc sỹ Dược phẩm",
  18: "Tiến sĩ",
  19: "khác",
};
const data_quyMo = {
  0: "Chưa cập nhật",
  1: "Ít hơn 10 nhân viên",
  2: "10 - 24 nhân viên",
  3: "25 - 99 nhân viên",
  4: "100 - 499 nhân viên",
  5: "500 - 999 nhân viên",
  6: "Trên 1000 nhân viên",
};
const data_gender = [
  'Chọn giới tính',
  'Nam',
  'Nữ',
];
const data_BangCapUv = [
  "Chọn bằng cấp",
  "THPT trở lên",
  "Trung học trở lên",
  "Chứng chỉ",
  "Trung cấp trở lên",
  "Cao đẳng trở lên",
  "Cử nhân trở lên",
  "Đại học trở lên",
  "Thạc sĩ trở lên",
  "Thạc sĩ Nghệ thuật",
  "Thạc sĩ Thương mại",
  "Thạc sĩ Khoa học",
  "Thạc sĩ Kiến trúc",
  "Thạc sĩ QTKD",
  "Thạc sĩ Kỹ thuật ứng dụng",
  "Thạc sĩ Luật",
  "Thạc sĩ Y học",
  "Thạc sĩ Dược phẩm",
  "Tiến sĩ",
  "Khác"
];
function rewrite_url_News(alas) {
  const newUrl = "/news-" + alas;
  return newUrl;
}
function rewwriteNewsCate(id) {
  let alias = '';
  if (id == 1) {
    alias = "cam-nang-tim-viec";
  } else if (id == 2) {
    alias = "bi-quyet-viet-cv";
  } else if (id == 3) {
    alias = "bieu-mau";
  }
  return alias;
}
function rewrite_url_NewsCate(cateid) {
  const newUrl = "/tin-tuc-" + rewwriteNewsCate(cateid);
  return newUrl;
}
const formatTimeStamp = (timestamp, type) => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  switch (type) {
    case 1:
      return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
    case 2:
      return `${day}/${month}/${year}`;
    default:
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }
};
const formatTimeStamp2 = (timestamp, type) => {
  if (typeof timestamp !== 'number' || timestamp < 0) {
    throw new Error('Invalid timestamp');
  }

  const date = new Date(timestamp * 1000);

  // Kiểm tra nếu ngày tháng không hợp lệ
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  switch (type) {
    case 1:
      return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
    case 2:
      return `${day}/${month}/${year}`;
    default:
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }
};
function convertToDateString(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  const dateString = `${year}-${month}-${day}`;
  return dateString;
}
function getSizeCompany(sizeNumber) {
  return data_quyMo[sizeNumber];
}
function getMucLuong(new_money_type, new_money_from, new_money_to, new_money) {
  try {
    switch (new_money_type) {
      case 0:
      case 5:
        return new_money !== 0 ? data_salary[new_money] : "Thỏa thuận";
      case 1:
        return "Thỏa thuận";
      case 2:
        if (new_money_from > 100) {
          new_money_from = new_money_from / 1000000;
        }
        return `Từ ${new_money_from} triệu`;
      case 3:
        if (new_money_to > 100) {
          new_money_to = new_money_to / 1000000;
        }
        return `Đến ${new_money_to} triệu`;
      case 4:
        if (new_money_from > 100) {
          new_money_from = new_money_from / 1000000;
        }
        if (new_money_to > 100) {
          new_money_to = new_money_to / 1000000;
        }
        if (new_money_from > new_money_to) {
          [new_money_from, new_money_to] = [new_money_to, new_money_from];
        }
        return `${new_money_from} - ${new_money_to} triệu`.replace(/\.000\.000|00\.000/g, "");
      default:
        return "Chưa cập nhật";
    }
  } catch (error) {
    return "Chưa cập nhật";
  }
}
function getCityNameById(citId) {
  const citIdInt = parseInt(citId, 10);
  const city = city_array.find(city => city.cit_id === citIdInt);
  return city ? city.cit_name : 'Đang cập nhật';
}
function getCityidByAlias(citId) {
  const citStr = citId;
  const city = city_array.find(city => city.cit_alias === citStr);
  return city ? city.cit_id : '0';
}
function getExpText(expNumber) {
  return data_exp[expNumber];
}
function getSizeText(sizeNumber) {
  return data_quyMo[sizeNumber];
}
function getRankText(rankNumber) {
  return data_capBac[rankNumber];
}
function getWorkText(workNumber) {
  return data_hinhthuc[workNumber];
}
// Hàm lấy dữ liệu cv
function getInfoCV(data, type) {
  const dataFromAPI = data.data.data;
  let aliasCv = dataFromAPI.alias;
  let arr_html_lang = JSON.parse(dataFromAPI.result.html)
  let fullname = arr_html_lang.name,
    namefull = arr_html_lang.name,
    address = arr_html_lang.menu[0].content.content.content.address;
  if (type > 0) {
    var phone = 'Xem ở trên',
      email = 'Xem ở trên';
  } else {
    var phone = arr_html_lang.menu[0].content.content.content.phone,
      email = arr_html_lang.menu[0].content.content.content.email;
  }
  let position = arr_html_lang.position,
    langcv = dataFromAPI.result.lang,
    avatar = arr_html_lang.avatar,
    cv_title = arr_html_lang.cv_title,
    introduction = arr_html_lang.introduction,
    color_active = arr_html_lang.css.color,
    font_active = arr_html_lang.css.font,
    font_size_active = arr_html_lang.css.font_size,
    font_spacing_active = arr_html_lang.css.font_spacing,
    placeholders = getPlaceholdersCV(langcv);

  let menu_html = [];
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
  let block_html = [];
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

  let data_uv = {
    avatar,
    namefull,
    fullname,
    position,
    phone,
    email,
    address,
    introduction
  };
  let data_cv = {
    aliasCv,
    cv_title,
    color_active,
    font_active,
    font_size_active,
    font_spacing_active
  };
  return {
    data_uv, data_cv, placeholders, menu_html, block_html
  };
}
// 
const dataTopPicCv = [
  "Tất cả",
  "Đơn giản",
  "Hiện đại",
  "Sáng tạo",
  "Chuyên nghiệp",
];
// muc luc bai viet
function convertToSlugMucLuc(str) {
  const regexKorean = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/g
  if (!str) return
  // Chuyển hết sang chữ thường
  if (typeof str === 'string' && str.match(/[\u3400-\u9FBF]/)) {
    return 'ung-vien-ngoai-quoc'
  } else if (typeof str === 'string' && str.match(regexKorean)) {
    return 'ung-vien-ngoai-quoc'
  } else {
    if (typeof str === 'string') {
      str = str?.toLowerCase()

      // xóa dấu
      str = str
        ?.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp

      // Thay ký tự đĐ
      str = str?.replace(/[đĐ]/g, 'd')

      // Xóa ký tự đặc biệt
      str = str?.replace(/([^0-9a-z-\s])/g, '')

      // Xóa khoảng trắng thay bằng ký tự -
      str = str?.replace(/(\s+)/g, '-')

      // Xóa ký tự - liên tiếp
      str = str?.replace(/-+/g, '-')

      // xóa phần dư - ở đầu & cuối
      str = str?.replace(/^-+|-+$/g, '')

      // Loại bỏ số và dấu chấm ở đầu chuỗi
      str = str?.replace(/^\d+\./, '')

      // return
      return str
    }
  }
}
function removeTags(str) {
  if ((str === null) || (str === '')) {
    return false;
  } else {
    str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }
}
function extractMLContent(str_html) {
  let list_arr = str_html.split("</"),
    list_h2 = [],
    list_h3 = [],
    list_h4 = [];

  for (let i = 0; i < list_arr.length; i++) {
    let check = list_arr[i];
    if (check.includes("<h2")) {
      let check_list = check.split("<h2");
      check = check_list[1];
      check = `<h2 ${check} </h2>`;
      list_h2.push({
        html: check,
        content: removeTags(check)
      });
    }
    if (check.includes("<h3")) {
      let check_list = check.split("<h3");
      check = check_list[1];
      check = `<h3 ${check} </h3>`;
      list_h3.push({
        key_h2: list_h2.length - 1,
        html: check,
        content: removeTags(check)
      });
      if (check.includes("<h4")) {
        let check_list = check.split("<h4");
        check = check_list[1];
        check = `<h4 ${check} </h4>`;
        list_h4.push({
          key_h3: list_h3.length - 1,
          html: check,
          content: removeTags(check)
        });
      }
    }
    if (check.includes("<h4")) {
      let check_list = check.split("<h4");
      check = check_list[1];
      check = `<h4 ${check} </h4>`;
      list_h4.push({
        key_h3: list_h3.length - 1,
        html: check,
        content: removeTags(check)
      });
    }
  };
  return {
    list_h2,
    list_h3,
    list_h4
  };
}
function renderOTP() {
  return Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
}

//
function genurlSearhUv(tinhthanh, nganhnghe) {
  if ('' != tinhthanh && '' == nganhnghe) {
    url = "/ung-vien-" + tinhthanh
  } else if ('' == tinhthanh && '' != nganhnghe) {
    url = "/ung-vien-" + nganhnghe
  } else if ('' != tinhthanh && '' != nganhnghe) {
    url = "/ung-vien-" + nganhnghe + "-tai-" + tinhthanh;
  }
  return url;
}
//

function genurlSearhJob(tinhthanh, nganhnghe) {
  let txttinhthanh = replaceTitle(tinhthanh);
  let txtnganhnghe = replaceTitle(nganhnghe);
  if ('' != tinhthanh && '' == nganhnghe) {
    url = "/viec-lam-tai-" + txttinhthanh
  } else if ('' == tinhthanh && '' != nganhnghe) {
    url = "/viec-lam-" + txtnganhnghe
  }
  return url;
}

function formatMoney(number, fractional = false) {
  if (fractional) {
    number = number.toFixed(2);
  }
  while (true) {
    let replaced = number.toString().replace(/(-?\d+)(\d{3})/, '$1.$2');
    if (replaced !== number.toString()) {
      number = replaced;
    } else {
      break;
    }
  }
  return number;
}

const array_tien_te = [
  "Chọn đơn vị tiền",
  "VNĐ",
  "USD",
  "EURO"
];

function renderMoney(nm_type, nm_unit, nm_min_value, nm_max_value, new_money) {
  let rd_muc_luong = '';
  switch (nm_type) {
    case 1:
      rd_muc_luong = 'Thỏa Thuận';
      break;
    case 2:
      rd_muc_luong = 'Từ ' + formatMoney(nm_min_value) + ' ' + array_tien_te[nm_unit];
      break;
    case 3:
      rd_muc_luong = 'Đến ' + formatMoney(nm_max_value) + ' ' + array_tien_te[nm_unit];
      break;
    case 4:
      rd_muc_luong = formatMoney(nm_min_value) + ' - ' + formatMoney(nm_max_value) + ' ' + array_tien_te[nm_unit];
      break;
    default:
      rd_muc_luong = data_salary[new_money] + ' ' + array_tien_te[nm_unit];
      break;
  }

  if (rd_muc_luong === '' || rd_muc_luong === 'Chọn mức lương') {
    rd_muc_luong = "Thỏa Thuận";
  }
  return rd_muc_luong;
}
// 
const getKingNghiemLamViec = (exp) => {
  for (let i = 0; i < data_exp.length; i++) {
    if (exp == i) {
      return data_exp[i];
    }
  }
  return "Chưa cập nhật";
};
//==================================
module.exports = {
  setCookie,
  getCookie,
  deleteCookie,
  getPlaceholdersCV,
  listLangcv,
  date,
  city_array,
  data_exp,
  data_salary,
  data_capBac,
  data_hinhthuc,
  data_Bangcap,
  data_right,
  new_money_type,
  district_array,
  data_quyMo,
  data_gender,
  data_BangCapUv,
  dataTopPicCv,
  getDistrict,
  formatDate,
  checkLogged,
  checkAuthentic,
  rewrite_url_News,
  rewrite_url_NewsCate,
  rewwriteNewsCate,
  rewrite_url_company,
  formatTimeStamp,
  formatTimeStamp2,
  convertToDateString,
  getInfoCV,
  rewriteUV,
  rewrite_url_CV,
  getSizeCompany,
  getMucLuong,
  getCityNameById,
  getCityidByAlias,
  getExpText,
  getSizeText,
  getRankText,
  getWorkText,
  rewrite_url_new,
  lay_tgian,
  extractMLContent,
  convertToSlugMucLuc,
  renderOTP,
  genurlSearhUv,
  renderMoney,
  replaceTitle,
  genurlSearhJob,
  getKingNghiemLamViec
};
