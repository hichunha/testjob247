const { InForAccount } = require('../function/functions_api');
const versionSite = process.env.VERSION_SITE;
exports.index = async (req, res) => {
    let data = {
        useslick: 0,
        useselect2: 0,
        version: versionSite
    }
    // Hàm Lấy dữ liệu Tài khoản đổ ra header
    const DataAccount = await InForAccount(req, res);
    // trả về view 
    return res.render('404', { data, DataAccount });
}