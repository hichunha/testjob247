const {  } = require('../function/functions_api');
const versionSite = process.env.VERSION_SITE;
exports.index = async (req, res) => {
  let data = {
    useslick: 0,
    useselect2: 0,
    version: versionSite
  }
  // trả về view 
  return res.render('profile', { data });
}