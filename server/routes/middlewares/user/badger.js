require ('../../../config/database');
const ip = require('ip');
const publicIp = require('public-ip');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // UPDATE THE PRESENCE OF USER ON DB.
            case 'setPresence':
                 let id_user = req.body.id_user;
                 let presence = !req.body.presence;
                 let message;
                 let title;

                 // set the response message
                 if(presence) {
                     title = 'Bonjour !';
                     message = 'Vous avez pointé PRESENT.';
                 }
                 else {
                     title = 'Au revoir !';
                     message = 'Vous avez pointé ABSENT.';
                 }

                // update the presence
                 let content_users = [
                   [presence],
                   [id_user]
                 ];
                 db.query('UPDATE users_badger SET presence = ? WHERE id_user = ?', content_users, (err)=> {
                     if(err) throw err;

                 });

                 // add a point on db badger for START
                if(presence) {
                    let content_badger_start = [
                        [id_user]
                    ];
                    db.query('INSERT INTO badger(id_user) VALUES (?)', content_badger_start, (err) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            title: title,
                            message: message
                        });
                    });
                }
                else {
                    let content_badger_end = [
                        [id_user]
                    ];
                    db.query('UPDATE badger SET end_point = CURRENT_TIMESTAMP, duration = TIMEDIFF( end_point, start_point ) WHERE id_user = ? AND end_point is NULL ', content_badger_end, (err)=> {
                        if (err) throw err;
                        res.json({
                            success: true,
                            title: title,
                            message: message
                        });
                    })
                }
            break

            case 'getAccessBadger':

                (async () => {
                    let ipPublic = await publicIp.v4()

                    let localIp = ip.address();
                    if (ipPublic === '193.50.153.129' && /10[.]3[.]1[.]\d{1,3}/.test(localIp)) {
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }

                })();

            break

        }
    });
};

// TODO : faire un système automatique permettant de dépointé les utilisateur à minuit tout les jours pour ceux qui ont oublié de dépointer avec CRON
// TODO : Si l'utilisateur à un status de pointage différent de start ou end, le'empecher de pointer.
// TODO : Faire une procédure de vérification lors du pointage, que le dernier pointage à bien un status 'start/end' différent.