require ('../../../config/database');
const ip = require('ip');
const publicIp = require('public-ip');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // INSERT OR UPDATE THE POINT BADGE
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

                 // add a point on db badger for START
                if(presence) {
                    let content_badger_start = [
                        [id_user]
                    ];
                    db.query('INSERT INTO badger(id_user) VALUES (?)', content_badger_start, (err) => {
                        if(err) {
                            res.json({
                                success: false
                            });
                            throw err;
                        } else {
                            res.json({
                                success: true,
                                title: title,
                                message: message
                            });
                        }
                    });
                }
                else {
                    let content_badger_end = [
                        [id_user]
                    ];
                    db.query('UPDATE badger ' +
                        'SET ' +
                        'end_point = CURRENT_TIMESTAMP, ' +
                        'duration = IF(' +
                            'IF(HOUR(start_point) < 12,1,0) = 1 ' +
                            'AND IF(HOUR(CURRENT_TIME) > 14,1,0) = 1,' +
                                'TIMEDIFF( DATE_ADD(end_point, INTERVAL -1 HOUR), start_point),' +
                                'TIMEDIFF( end_point, start_point )) ' +
                        '' +
                        'WHERE start_point > CURRENT_DATE AND id_user = ? ' +
                        'AND end_point is NULL ', content_badger_end, (err)=> {
                        if(err) {
                            res.json({
                                success: false
                            });
                            throw err;
                        } else {
                            res.json({
                                success: true,
                                title: title,
                                message: message
                            });
                        }
                    })
                }
            break;

            // Check if the user is in the UHA 4.0 area
            case 'getAccessBadger':
                (async () => {
                    let ipPublic = await publicIp.v4();

                    let localIp = ip.address();
                    if (ipPublic === '193.50.153.129' && /10[.][03][.]1[.]\d{1,3}/.test(localIp)) {
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