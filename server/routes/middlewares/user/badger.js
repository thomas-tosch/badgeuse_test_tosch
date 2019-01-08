require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // GET ALL DATA OF USER CONNECTED
            case 'setPresence':
                 let id_user = req.body.id_user;
                 let presence = !req.body.presence;

                 let content = [
                   [presence],
                   [id_user]
                 ];
                 db.query('UPDATE users SET presence = ? WHERE id_user = ?', content, (err, rows)=> {
                     if(err) throw err;
                    res.json({success: true});
                 })
            break
        }
    });
}