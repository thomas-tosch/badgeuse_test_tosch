require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {

        let id_user = req.body.id_user;

        db.query('SELECT SUBSTR(absence_date, 1, 10) AS day, id_status AS status, id_absences AS id FROM absences WHERE id_user = ?', [id_user], (err, resultat) => {

            if (err) {
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