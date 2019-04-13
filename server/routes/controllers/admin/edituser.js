let express = require('express');
let router = express.Router();
require('../../middlewares/admin/edituser')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : edituser');
});

module.exports = router;