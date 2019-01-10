require('../../../config/database');
let bcrypt = require('bcrypt');

module.exports = function(router)
{
    router.post('/', (req, res) =>
    {
        const accesNewPass = req.body.accesNewPass;
        const idUser = req.body.idUser;
        const keyTempUrl = req.body.keyTemp;

        // check if the gest is authorized
        if(!accesNewPass) {

            db.query("SELECT * FROM users WHERE id_user=?", [idUser], (err, result) => {

                if (err) {
                    res.json
                    ({
                        success: false,
                        message: "Une erreur est survenue, veuillez reéssayer ultérieurement."
                    });
                }

                if (result.length !== 0) {

                    let keyTempDb = result[0].keyTemp;
                    if (keyTempUrl === keyTempDb) {

                        res.json({
                            //on envoie TRUE pour activer le formulaire
                            success: true
                        });

                    } else {
                        res.json({
                            success: false,
                            message: "Vous n'êtes pas autorisé à accéder à cette page !"
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: "Vous n'êtes pas autorisé à accéder à cette page !"
                    });
                }
            });
        }
        // if the gest is authorized access, check the new password, script and update to users table.
        else {

            const newPass = req.body.newPass.trim();
            const confPass = req.body.confPass.trim();
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{5,255}$/;

            if (regex.test(newPass)) {

                if(newPass === confPass) {

                    // hash the password
                    bcrypt.hash(newPass, 10, function (err, hash) {

                        if (err){console.log(err);}

                        // check if the id_user is on db
                        let param = [[hash], [idUser]];
                        db.query("UPDATE users SET mdp_user=?, keyTemp=NULL WHERE id_user=?", param, (err, result) => {

                            if (err) {
                                res.json
                                ({
                                    success: false,
                                    message: "Une erreur est survenue, veuillez reéssayer ultérieurement."
                                });

                            }

                            if (result.length !== 0) {
                                res.json
                                ({
                                    success: true,
                                    message: "Le mot de passe a été modifié avec succès ! <br>" +
                                        "<small>Connectez-vous avec votre nouveau mot de passe.</small>"
                                });
                            }
                        });
                    });
                } else {
                    res.json({
                        success: false,
                        message: "Les mots de passe ne sont pas identitques."
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: "Le mot de passe doit avoir au minimum 5 caractères alphanumériques et une taille maximale de 255 caractères alphanumériques."
                });
            }
        }
    });
};
