require ('../../../config/database');

    module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // GET ALL DISCONNECT TIME OF USER CONNECTED
            case 'getDataAlerte':
                let id_user = req.body.id_user;
                db.query('SELECT * ' +
                        'FROM badger ' +
                        'WHERE id_user = ? ' +
                        'AND end_point IS NULL ' +
                        'AND start_point < current_date ' +
                        'AND start_point > (current_date() - 3) ' +
                        'ORDER BY start_point DESC ' +
                        'LIMIT 1'
                    , [id_user], (err, rows)=> {
                    if (err) throw err;

                    if (rows.length > 0) {
                        res.json({user: rows[0], success: true});
                    }
                    else{
                        res.json({succes: false});
                    };
                });
                break
        }
    });
 }
