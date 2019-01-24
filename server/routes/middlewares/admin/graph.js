require ('../../../config/database');require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {


        const action = req.body.action;

        switch (action) {

            case 'getUserList':

                let content = [
                ];
                db.query('SELECT ' +
                    'users.id_user AS userId, ' +
                    'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' +
                    'users_badger.id_group, ' +
                    'users_badger.presence AS presence ' +
                    '' +
                    'FROM users ' +
                    '' +
                    'INNER JOIN users_badger ON users.id_user = users_badger.id_user ' +
                    '' +
                    'ORDER BY presence DESC'
                    , content, (err, rows) => {
                        if(err) throw err;

                        res.json({list: rows});
                    })
                break


        }
    });
}


module.exports = function(router) {

    router.post('/', (req, res) => {


        const action = req.body.action;

        switch (action) {

            case 'getTotalTime':
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;
                let userGroup = req.body.userGroup;

                let content = [
                    [startDate],
                    [endDate],
                    [userGroup]
                ];
                db.query('SELECT ' +
                            'users.id_user AS userId, ' +
                            'badger.end_point, ' +
                            'badger.start_point, ' +
                            'badger.id_user AS badgerUserId, ' +
                            'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' +
                            'users_badger.id_group, ' +
                            'IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(badger.duration))), 0) AS duration ' +
                        'FROM users ' +
                        'INNER JOIN users_badger ON users.id_user = users_badger.id_user ' +
                        'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NOT NULL AND start_point BETWEEN ? AND ? ) badger ' +
                        'ON users.id_user = badger.id_user ' +
                        'WHERE users_badger.id_group = ? ' +
                        'GROUP BY userId ' +
                        'ORDER BY userName'
                    , content, (err, rows) => {
                    if(err) throw err;

                    res.json({message: rows});
                })
            break


        }
    });
}