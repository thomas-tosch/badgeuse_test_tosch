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