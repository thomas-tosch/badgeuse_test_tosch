require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {

        let id_user = req.body.id_user;

        db.query('SELECT SUBSTR(a.absence_date, 1, 10) AS day, a.id_status AS status, r.nom_reason AS reason FROM absences a INNER JOIN reason r ON a.id_reason = r.id_reason WHERE id_user = ? ', [id_user], (err, resultat) => {

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