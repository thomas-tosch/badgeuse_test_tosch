require ('../../../config/database');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // CHECK THE CONNECTION OF USER
            case 'tryConnect':
                const passForm = req.body.password.trim();
                const usermailForm = req.body.userMail.trim();

                // Password and Usermail min/max length
                const passLengthMin = 3,
                    passLengthMax = 255,
                    userMailLengthMin = 5,
                    userMailLengthMax = 255;

                if (usermailForm.length >= userMailLengthMin && usermailForm.length <= userMailLengthMax) {
                    if (passForm.length >= passLengthMin && passForm.length <= passLengthMax) {
                        // Read the Sql table if the userMail exist
                        db.query('SELECT * FROM users INNER JOIN users_badger ON users.id_user = users_badger.id_user WHERE mail_user=?', [usermailForm], (err, result) => {

                            if (err) {
                                res.json
                                ({
                                    success: false,
                                    message: "Une erreur est survenue, veuillez reéssayer ultérieurement."
                                });
                                throw err;
                            }

                            if (result.length !== 0) {

                                let passDb = result[0].mdp_temp_user;
                                let passCript = sha1('uha'+passForm);

                                // compare the password
                                if(passCript === passDb) {
                                    // generate a token
                                    const token = jwt.sign({id_user: result[0].id_user}, config.auth.SECRET_KEY, {expiresIn: '3h'});
                                    res.json({
                                        success: true,
                                        message: "Vous allez être redirigé dans quelques instants.",
                                        token: token,
                                        user: {prenom_user: result[0].prenom_user, mail_user: result[0].mail_user}
                                    });
                                } else {
                                    res.json({success: false, message: "Le mot de passe est incorrect !"});
                                }
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