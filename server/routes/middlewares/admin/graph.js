require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            //
            case 'getDb':
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;


                let content = [
                    [startDate],
                    [endDate]
                ];
                db.query('SELECT CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, DATE_FORMAT(CAST(start_point AS DATE), "%d-%m-%Y") date_point, CAST(start_point as TIME) startTime, CAST(end_point as TIME) endTime, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF( end_point, start_point )))) AS duration FROM badger INNER JOIN users ON badger.id_user = users.id_user WHERE end_point IS NOT NULL AND start_point BETWEEN ? AND ? GROUP BY userName ORDER BY userName ', content, (err, rows)=> {
                    if(err) throw err;

                    res.json({message: rows});


                })
                break
        }
    });
}