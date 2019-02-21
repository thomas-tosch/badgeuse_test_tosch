require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');


module.exports = function(router) {

    router.post('/', (req, res) => {

        if(tokenList.checkToken(req.body.token)) {


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
                        [startDate],
                        [endDate],
                        [filterGroup],
                        [orderBy]
                    ];
                    db.query('SELECT ' +
                        'users.id_user AS userId, ' +
                        'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' + // first name + last name = userName
                        '' +
                        'users_extend.id_group AS id_group, ' +
                        '' +
                        'IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(badger.duration))), 0) AS duration,' + // if duration is null, set zero
                        '' +
                        'absences.day ' + // It's a number of day of absence
                        '' +
                        'FROM users ' +
                        '' +
                        'LEFT JOIN users_extend ON users.id_user = users_extend.id_user ' + // join users table with users_extend table
                        'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NOT NULL AND start_point BETWEEN ? AND ? ) badger ON users.id_user = badger.id_user ' + // join users table with badger table. Select only the complete line between date.
                        'LEFT JOIN (SELECT id_user, absence_date, SUM(IF(half_day = 1,1,0.5)) AS day FROM absences WHERE id_status = 1 AND absence_date BETWEEN ? AND ? GROUP BY ref_absence) absences ON users.id_user = absences.id_user ' + // join users table table with absence table. Select all between date and summe de absence day
                        '' +
                        'WHERE FIND_IN_SET(id_group, ?) ' + // filter group
                        '' +
                        'GROUP BY userId ' +
                        '' +
                        'ORDER BY ??, userName' // select order by
                        , content, (err, rows) => {
                            if (err) {
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
                        });
                break

            }
        } else {
            res.send('Vous n\'avez rien à faire ici !');
        }
    });
};