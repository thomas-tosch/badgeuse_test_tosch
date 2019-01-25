require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;
        let id_user = req.body.id_user;

        switch (action) {

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
                    , [id_user], (err, rows)=> {
                    if(err) throw err;
                    res.json({user: rows[0]});
                })
            break

            // GET ID OF USER REQUESTED
            case 'getIdUser':
                let userName = req.body.userName;
                db.query('SELECT * ' +
                        'FROM users ' +
                        'WHERE CONCAT(users.nom_user, \' \', users.prenom_user) = ?'
                    , [userName], (err, rows)=> {
                    if(err) throw err;
                    res.json({user: rows[0].id_user});
                })
            break

            // UPDATE THE USER GROUP
            case 'updateGroup':
                let id_group = req.body.id_group;
                let content = [
                    [id_group],
                    [id_user]
                ]
                db.query('UPDATE users_extend SET id_group = ? WHERE id_user = ?', content, (err)=>{
                    if(err) {
                        res.json({
                            success: false,
                            message: "Une erreur est survenue lors de la mise à jour de l'information."
                        });
                    } else {
                        res.json({
                            success: true,
                            message: "L'information à bien été mise à jour."
                        });
                    }
                });
            break
        }
    });
}