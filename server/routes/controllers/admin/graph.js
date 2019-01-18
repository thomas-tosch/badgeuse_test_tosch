let express = require('express');
let router = express.Router();
require('../../middlewares/admin/graph')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : Graph');
});

module.exports = router;