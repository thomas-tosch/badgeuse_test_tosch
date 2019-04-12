let express = require('express');
let router = express.Router();
require('../../middlewares/admin/cruduser')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/', (res) => {
    res.send('Badgeuse intelligente : CRUDUSER');
});

router.put('/', (res) => {
    res.send('Badgeuse intelligente : CRUDUSER');
});

router.delete('/', (res) => {
    res.send('Badgeuse intelligente : CRUDUSER');
});

module.exports = router;