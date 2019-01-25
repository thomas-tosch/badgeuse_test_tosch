require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // GET ALL DATA OF USER CONNECTED
            case 'getDataUser':
                let id_user = req.body.id_user;
                db.query('SELECT *, ' +
                        'users.id_user AS id_user, ' +
                        'IF(badger.id_point IS NULL,0,1) AS presence ' +
                        '' +
                        'FROM users ' +
                        '' +
                        'INNER JOIN users_extend ON users.id_user = users_extend.id_user ' +
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
        }
    });
}