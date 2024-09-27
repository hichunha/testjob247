const versionSite = process.env.VERSION_SITE;
exports.index = async (req, res) => {
    try {
        let data = {
            useslick: 0,
            useselect2: 1,
            version: versionSite
        }
        return res.render('hintWork', { data });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        return res.status(500).send('Error fetching data');
    }
}