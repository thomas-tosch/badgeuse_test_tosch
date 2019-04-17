require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');

module.exports = function(router) {

    router.post('/', (req, res) => {

        if(tokenList.checkToken(req.body.token)) {
            const action = req.body.action;
            let id_user = req.body.id_user;

            switch (action) {

                // SEND ERRORTOKEN FALSE
                case 'checkToken':
                    res.json({
                        errorToken: false
                    });
                break;

                // GET ALL DATA OF USER CONNECTED
                case 'getDataUser':

                    db.query('SELECT *, ' +
                        'users.id_user AS id_user, ' +
                        'user_groups.nom_group AS nom_group, ' +
                        'users_extend.id_group AS id_group, ' +
                        'roles.nom_role AS nom_role, ' +
                        'IF(badger.id_point IS NULL,0,1) AS presence ' +
                        '' +
                        'FROM users ' +
                        '' +
                        'INNER JOIN users_extend ON users.id_user = users_extend.id_user ' +
                        'LEFT JOIN user_groups ON users_extend.id_group = user_groups.id_group ' +
                        'LEFT JOIN roles ON users.id_role = roles.id_role ' +
                        'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NULL AND start_point > CURRENT_DATE) badger ON users.id_user = badger.id_user ' +
                        '' +
                        'WHERE users.id_user = ?'
                        , [id_user], (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                throw err;
                            } else {
                                res.json({
                                    success: true,
                                    user: rows[0]
                                });
                            }
                        });
                    break;

                // GET ID OF USER REQUESTED
                case 'getIdUser':
                    let userName = req.body.userName;
                    db.query('SELECT * ' +
                        'FROM users ' +
                        'WHERE CONCAT(users.nom_user, \' \', users.prenom_user) = ?'
                        , [userName], (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                throw err;
                            } else {
                                res.json({
                                    success: true,
                                    user: rows[0].id_user
                                });
                            }
                        });
                    break;

                // UPDATE THE USER GROUP
                case 'updateGroup':
                    let id_group = req.body.id_group;
                    let content = [
                        [id_group],
                        [id_user]
                    ];
                    db.query('UPDATE users_extend SET id_group = ? WHERE id_user = ?', content, (err) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: "Une erreur est survenue lors de la mise à jour de l'information."
                            });
                        } else {
                            res.json({
                                success: true,
                                message: "L'information a bien été mise à jour."
                            });
                        }
                    });
                    break;

                case 'getPieChart':
                    db.query("select sum(if(half_day=0,7,4)) as day, a.id_user, u.nom_user, r.nom_reason as reason from absences a,reason r,users u where u.id_user = a.id_user and a.id_reason = r.id_reason and absence_date between '2019-04-15' and '2019-04-19' and a.id_user = ? group by a.id_reason, a.id_user union Select SEC_TO_TIME(SUM(TIME_TO_SEC(`duration`))), b.id_user, u.nom_user, '' as reason from badger b, users u where u.id_user = b.id_user and start_point between '2019-04-15' and '2019-04-19' and b.id_user=? group by b.id_user",
                    [id_user, id_user], (err, rows) => {
                        if (err) {
                            res.json({
                                success:false
                            });
                            throw err;
                        } else {
                            res.json({
                                success: true,
                                pieData: [parseInt(rows[0].day),parseInt(rows[1].day),parseInt(rows[2].day),parseInt(rows[3].day)]
                            });
                        }
                });
                break;

            }
        } else {
            // res.send('Vous n\'avez rien à faire ici !');
            res.json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici !'
            });
        }
    });
};
