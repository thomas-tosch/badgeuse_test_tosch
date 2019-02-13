require('../../../config/database');

module.exports = function (router) {

    router.post('/', (req, res) => {
        const action = req.body.action;
        let id_user = req.body.id_user;

        switch (action) {

            case 'getMonth' :

                db.query('SELECT SUBSTR(a.absence_date, 1, 10) AS day, ' +
                    'a.id_status AS status, ' +
                    'r.nom_reason AS reason, ' +
                    'a.half_day AS half ' +
                    'FROM absences a ' +
                    'INNER JOIN reason r ' +
                    'ON a.id_reason = r.id_reason ' +
                    'WHERE id_user = ? ', [id_user], (err, resultat) => {

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
                break;

            case 'getWeek' :

                db.query('SELECT SUBSTR(b.start_point, 1, 10) AS startHeure, ' +
                    'SUBSTR(b.start_point, 12, 19) AS startMinute, ' +
                    'SUBSTR(b.end_point, 1, 10) AS endHeure, ' +
                    'SUBSTR(b.end_point, 12, 19) AS endMinute ' +
                    'FROM badger b ' +
                    'WHERE id_user = ? AND b.end_point IS NOT NULL', [id_user], (err, resultat) => {

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
                break;
        }
    });
};