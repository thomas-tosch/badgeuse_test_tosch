require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

    module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // GET ALL DISCONNECT TIME OF USER CONNECTED
            case 'getDataAlerte':
                let id_user = req.body.id_user;
                db.query('SELECT * FROM badger WHERE id_user = ? and end_point IS NULL and start_point < current_date () -1 ORDER BY start_point DESC LIMIT 1', [id_user], (err, rows)=> {
                    // console.log(rows[0]);
                    if (err) throw err;

                    res.json({user: rows[0],success:true});
                });
                break
        }
    });
 }
 // TODO limiter la recherche sur le temps
