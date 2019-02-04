require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {

        let absences = req.body.absences;

        db.query('SELECT absence_date FROM absences', [absences], (err, resultat) => {

            if(err) {
                res.json({
                    success: false
                });
                throw err;
            } else {

                res.json({
                    list: resultat
                });
            }
        });

    });
};