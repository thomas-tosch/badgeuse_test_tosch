require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {


        const action = req.body.action;

        switch (action) {

            // Get the user list for see the presence
            case 'getUserList':

                let content = [
                ];
                db.query('SELECT ' +
                    'users.id_user AS userId, ' +
                    'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' +
                    'IF(badger.id_point IS NULL,0,1) AS presence ' +
                    '' +
                    'FROM users ' +
                    '' +
                    'INNER JOIN users_extend ON users.id_user = users_extend.id_user ' +
                    'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NULL AND start_point > CURRENT_DATE) badger ON users.id_user = badger.id_user ' +
                    '' +
                    'GROUP BY userId ' +
                    '' +
                    'ORDER BY presence'
                    , content, (err, rows) => {
                        if(err) throw err;
                        res.json({list: rows});
                    })
                break
        }
    });
}