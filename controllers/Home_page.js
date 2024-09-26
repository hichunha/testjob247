const { setCookie, getCookie, rewrite_url_News, rewrite_url_company, data_salary, city_array, checkAuthentic, rewrite_url_new, renderMoney } = require('../function/functions');
const { homepage, getListCate, Call, InForAccount } = require('../function/functions_api');
const linkapi_candidate = process.env.DOMAIN_API_CANDIDATE;
const versionSite = process.env.VERSION_SITE;
exports.index = async (req, res) => {
    try {
        let data = {
            useslick: 0,
            useselect2: 1,
            version: versionSite
        }
        const token = getCookie(req, "tokentcvvn");
        const Token = (token && token != undefined) ? `Bearer ${token}` : "";
        const cate_array = await getListCate();
        const datahomepage = await homepage(Token, 5000);
        const CongTyNoiBat = datahomepage.dataCompany;
        const VLHD = datahomepage.ViecLamHapDan;
        const VLTH = datahomepage.ViecLamThuongHieu;
        const VLTG = datahomepage.ViecLamTuyenGap;
        const tinTucNoiBat = datahomepage.tinTucNoiBat;
        const ViecLamHapDan = VLHD.map((item) => {
            return {
                ...item,
                link_new: rewrite_url_new(item.new_alias, item.new_id, item.new_title),
                link_cpn: rewrite_url_company(item.usc_id, item.usc_company, item.usc_alias),
            };
        });
        const ViecLamThuongHieu = VLTH.map((item) => {
            return {
                ...item,
                link_new: rewrite_url_new(item.new_alias, item.new_id, item.new_title),
                link_cpn: rewrite_url_company(item.usc_id, item.usc_company, item.usc_alias),
            };
        });
        const ViecLamTuyenGap = VLTG.map((item) => {
            return {
                ...item,
                link_new: rewrite_url_new(item.new_alias, item.new_id, item.new_title),
                link_cpn: rewrite_url_company(item.usc_id, item.usc_company, item.usc_alias),
            };
        });
        // SEO
        let seo = {};
        let meta_h1 = `Topcvvn.com - tạo CV độc đáo, tìm việc làm cực nhanh`;
        let meta_title = `Website số 1 tạo CV ấn tượng, tìm việc làm chất lượng`;
        let meta_des = `Tạo CV và tìm việc hiệu quả tại Topcvvn.com. Cung cấp kho mẫu CV online chuyên nghiệp, cập nhật xu hướng mới nhất, giúp bạn dễ dàng tìm việc nhanh chóng.`;
        let canonical = "https://topcvvn.com";
        seo.meta_h1 = meta_h1;
        seo.meta_title = meta_title;
        seo.meta_des = meta_des;
        seo.meta_canonical = canonical;
        // Hàm Lấy dữ liệu Tài khoản đổ ra header
        const DataAccount = await InForAccount(req, res);
        checkAuthentic(res, req, DataAccount);
        // trả về view 
        // console.log(ViecLamHapDan);
        // 
        return res.render('home', { data, seo, rewrite_url_new, renderMoney, DataAccount, data_salary, CongTyNoiBat, ViecLamHapDan, ViecLamThuongHieu, tinTucNoiBat, ViecLamTuyenGap, cate_array, city_array, Token, getCookie, rewrite_url_company });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        return res.status(500).send('Error fetching data');
    }
}
exports.SaveNew = async (req, res) => {
    try {
        const token = getCookie(req, "tokentcvvn");
        const Token = (token && token != undefined) ? `Bearer ${token}` : "";
        const { id_tin } = req.body;
        const data = await Call(linkapi_candidate + "/api/Topcv247/candidate/SaveNew", {
            id_tin,
        }, Token, 0);
        return res.status(200).json(data.data)
    } catch (err) {
        return res.status(err.code).send({ message: err.message })
    }
}
