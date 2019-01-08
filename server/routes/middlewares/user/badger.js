require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // UPDATE THE PRESENCE OF USER ON DB.
            case 'setPresence':
                 let id_user = req.body.id_user;
                 let presence = !req.body.presence;

                // update the presence
                 let content_users = [
                   [presence],
                   [id_user]
                 ];
                 db.query('UPDATE users SET presence = ? WHERE id_user = ?', content_users, (err)=> {
                     if(err) throw err;
                    res.json({success: true});
                 });

                 // add a point on db badger
                let content_badger = [
                    [id_user],
                    [presence]
                ];
                db.query('INSERT INTO badger(id_user, status_point) VALUES (?,?)', content_badger, (err)=> {
                    if(err) throw err;
                    // TODO : renvoyer une reponse
                });
            break

        }
    });
}