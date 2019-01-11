require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            //
            case 'getDb': //DATE_FORMAT("2018-09-24", "%d/%m/%Y")

                db.query('SELECT id_user, DATE_FORMAT(CAST(start_point AS DATE), "%d-%m-%Y") date_point, CAST(start_point as TIME) startTime, CAST(end_point as TIME) endTime FROM badger ORDER BY date_point', (err, rows)=> {
                    if(err) throw err;

                    res.json({message: rows});
                //    TODO : séparer chaque élement tu tableau ici, ainsi que le datetime.

                })
                break
        }
    });
}