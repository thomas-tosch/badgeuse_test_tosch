require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {

        let absences = req.body.absences;

        db.query('SELECT * FROM absences', [absences], () => {

            res.json({
                message: 'Test' + absences
            });
        });

        console.log("Test" + absences);

    });
};