require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {

        let absences = req.body.absences;

        db.query('SELECT absence_date FROM absences', [absences], () => {

            res.json({
                message: 'Test' + absences
            });
        });

    });
}