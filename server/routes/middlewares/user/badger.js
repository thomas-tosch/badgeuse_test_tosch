require ('../../../config/database');


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
                 db.query('UPDATE users SET presence = ? WHERE id_user = ?', content_users, (err)=> {
                     if(err) throw err;

                 });

                 // add a point on db badger
                let content_badger = [
                    [id_user],
                    [presence]
                ];
                db.query('INSERT INTO badger(id_user, StartEnd_point) VALUES (?,?)', content_badger, (err)=> {
                    if(err) throw err;
                    res.json({
                        success: true,
                        title: title,
                        message: message
                    });
                });
            break

        }
    });
};

// TODO : faire un système automatique permettant de dépointé les utilisateur à minuit tout les jours pour ceux qui ont oublié de dépointer
// TODO : faire un système automatique d'archivage après deux mois par exemple. (vider la bdd pour tout poitage après 2 mois et le transformer en fichier texte par exemple.
//        Prévoir un système permettant de lire un fichier texte sur demande.
// TODO : Si l'utilisateur à un status de pointage différent de start ou end, le'empecher de pointer.