require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req) => {

        let absence = req.body.absence;

        db.query('SELECT * FROM absences', [absence], (req, res) => {

            res.json({
                message: 'Test' + absence
            });
        });

    });
}