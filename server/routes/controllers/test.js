let express = require('express');
let router = express.Router();
require('./../middlewares/test')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Page de test');
});

module.exports = router;