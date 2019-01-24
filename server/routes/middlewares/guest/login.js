require ('../../../config/database');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config');
let setMailContent = require ('../mailBuilder');
let createMail = require('../../../config/smtp');
let mailValid = require("email-validator");
let randomstring = require("randomstring");

module.exports = function(router) {

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

                                let passDb = result[0].mdp_user_badger;

                                // compare the password
                                bcrypt.compare(passForm, passDb, (error, isMatch) => {
                                    if (!isMatch) {
                                        res.json({success: false, message: "Le mot de passe est incorrect !"});
                                    } else {
                                        // generate a token
                                        const token = jwt.sign({id_user: result[0].id_user}, config.auth.SECRET_KEY, {expiresIn: '3h'});
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

            // REQUEST FOR FORGOT PASS
            case 'reqForgotPass':
                let mail = req.body.mail.trim();

                if(mailValid.validate(mail)) { //if mail is valide, return true

                    // check if the mail exist in db
                    db.query('SELECT id_user, mail_user FROM users WHERE mail_user = ?', [mail], (err, rows) => {
                        if(err) throw err;
                        if(rows.length !== 0){
                            let id_user = rows[0].id_user;
                            let key = randomstring.generate(25);

                            // update the keyTemp
                            let param = [[key], [id_user]];
                            db.query("UPDATE users_badger SET keyTemp = ? WHERE id_user = ?", param, (err, result) => {
                                if (err) throw err;

                                if (result.length !== 0) {

                                    // we build the mail template
                                    variable = {id_user: id_user, keyTemp: key};
                                    setMailContent('forgotPass', variable, (mailContent) => {

                                        // we sent the mail
                                        let subject = "Mot de passe oublié";
                                        smtp.sendMail(createMail(mail, subject, mailContent), function (error) {
                                            if (error) throw error;
                                            res.json
                                            ({
                                                success: true,
                                                message: "Un mail à été envoyé à l'adresse que vous avez saisie.<br><br>" +
                                                    "<small>Pensez à vérifier dans vos couriers indésirables si vous ne recevez pas l'e-mail dans votre boite de reception.</small>"
                                            });
                                        });
                                    });
                                }

                                // on effectue une tache en backend au bout de 10 min, qui effacera la keyTemp dans la bdd
                                setTimeout(function(){
                                    db.query("UPDATE users_badger SET keyTemp = NULL WHERE id_user = ?", [id_user], (err) => {
                                        if(err){console.log(err);}
                                    });
                                }, 600000);
                            });

                        } else {
                            res.json({
                                success: false,
                                message: "L'adresse e-mail saisie ne correspond à aucun compte."
                            });
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: "L'adresse email saisie n'est pas valide !"
                    });
                }
            break
        }
    });
}