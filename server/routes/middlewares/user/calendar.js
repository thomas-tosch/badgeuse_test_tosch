require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {

        let absence = req.body.absence;

        db.query('SELECT * FROM absences', [absence], (err, rows) => {

            res.json({
                success: true,
                message: absence
            });
        });

    });
}