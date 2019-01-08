require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');

module.exports = function(router) {

    //on reçoit les données envoyer par Angular dans 'req'.
    //on renvoie les données vers angular dans 'res'.
    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // CHECK THE CONNECTION OF USER
            case 'tryConnect':
                const passForm = req.body.password.trim();
                const usermailForm = req.body.userMail.trim();

                // Password and Usermail min/max length
                const passLengthMin = 5,
                    passLengthMax = 255,
                    userMailLengthMin = 5,
                    userMailLengthMax = 255;

                if (usermailForm.length >= userMailLengthMin && usermailForm.length <= userMailLengthMax) {
                    if (passForm.length >= passLengthMin && passForm.length <= passLengthMax) {
                        // Read the Sql table if the userMail exist
                        db.query('SELECT * FROM users WHERE mail_user=?', [usermailForm], (err, result) => {

                            if (err) {
                                res.json
                                ({
                                    success: false,
                                    message: "Une erreur est survenue, veuillez reéssayer ultérieurement."
                                });
                                throw err;
                            }

                            if (result.length !== 0) {

                                let passDb = result[0].mdp_user;

                                bcrypt.compare(passForm, passDb, (error, isMatch) => {
                                    if (!isMatch) {
                                        res.json({success: false, message: "Le mot de passe est incorrect !"});
                                    } else {
                                        const token = jwt.sign({userId: result[0].id_user}, config.auth.SECRET_KEY, {expiresIn: '1h'});
                                        res.json({
                                            success: true,
                                            message: "Vous allez être redirigé dans quelques instants.",
                                            token: token,
                                            user: {prenom_user: result[0].prenom_user, mail_user: result[0].mail_user}
                                        });
                                    }
                                });
                            } else{
                                res.json({success: false, message: "Le nom de compte n'éxiste pas !"});
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "Le mot de passe doit avoir un minimum de " + passLengthMin + " caractères et ne doit pas dépasser " + passLengthMax + " caractères !"
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: "Le nom d'utilisateur doit avoir un minimum de " + passLengthMin + " caractères et ne doit pas dépasser " + passLengthMax + " caractères !"
                    });
                }
            break;
        }
    });
}