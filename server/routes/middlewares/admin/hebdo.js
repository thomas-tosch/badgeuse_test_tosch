require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {


        const action = req.body.action;

        switch (action) {

            // Get the user list for graphic week with filter and order by
            case 'getUserListHebdo':
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;
                let filterGroup = req.body.filterGroup;
                let orderBy = req.body.orderBy;

                let content = [
                    [startDate],
                    [endDate],
                    [filterGroup],
                    [orderBy]
                ];
                db.query('SELECT ' +
                    'users.id_user AS userId, ' +
                    'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' +
                    '' +
                    'users_extend.id_group AS id_group, ' +
                    '' +
                    'IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(badger.duration))), 0) AS duration ' +
                    '' +
                    'FROM users ' +
                    '' +
                    'LEFT JOIN users_extend ON users.id_user = users_extend.id_user ' +
                    'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NOT NULL AND start_point BETWEEN ? AND ? ) badger ON users.id_user = badger.id_user ' +
                    '' +
                    'WHERE FIND_IN_SET(id_group, ?) ' +
                    '' +
                    'GROUP BY userId ' +
                    '' +
                    'ORDER BY ??, userName'
                    , content, (err, rows) => {
                        if(err) {
                            res.json({
                                success: false
                            });
                            throw err;
                        } else {
                            res.json({
                                success: true,
                                list: rows
                            });
                        }
                    })
                break


        }
    });
}