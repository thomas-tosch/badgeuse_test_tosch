let express = require('express');
let router = express.Router();
require('../../middlewares/user/monthly-calendar')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : Calendrier Mensuel');
});

module.exports = router;