let express = require('express');
let router = express.Router();
require('../../middlewares/guest/newPass')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : NewPass');
});

module.exports = router;