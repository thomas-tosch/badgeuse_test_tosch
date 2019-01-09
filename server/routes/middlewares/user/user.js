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
                db.query('SELECT * FROM users WHERE id_user = ?', [id_user], (err, rows)=> {
                    if(err) throw err;
                    res.json({user: rows[0]});
                })
            break
        }
    });
}