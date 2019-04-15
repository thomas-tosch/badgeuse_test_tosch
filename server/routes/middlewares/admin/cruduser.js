require('../../../config/database');
const Errors = require('../../../error/errors');
const HttpStatus = require('http-status-codes');

/**
 *  CrudUser for add/edit/delete user in db for 
 *  the student card.
 *  Processes it into our DB to change user state.
 *  No intermediate step like login.js.
 * @param router
 */
function crudUser(router) {
    router.post('/', addUser)
    router.put('/', editUser)
    router.delete('/', deleteUser)
    router.get('/', getUser)
}

function addUser(request, response) {
    const adduser_value = request.body.content;
    return Promise((resolve, reject) => {
        db.query("INSERT INTO `users` (`prenom_user`, `nom_user`, `mail_user`, `id_role`) VALUES (?, ?, ?, ?);"
        ,[adduser_value['prenom_user'],adduser_value['nom_user'],adduser_value['mail_user'],
        adduser_value['id_role']] ,
        (err, results) => {
            console.log(results)
            if (err) {
                reject(err)
            resolve(results)
        };
    })
    .then(() => {
        db.query("SELECT LAST_INSERT_ID()",
        (err, results) => {
            console.log(results)
            if (err) {
                reject(err)
            }
            resolve(results)
        });
    })
    .then((results) => {
        db.query("INSERT INTO user_exteing (id_user, card) VALUES (?, ?)", [results, adduser_value['card']],
        (err, results) => {
            console.log(results)
            if (err) {
                reject(err)
            }
            resolve(results)
        });
    })
})}

function editUser(request, response) {
    const edituser_value = request.body.content;
        db.query("UPDATE `users` SET `prenom_user` = ?, `nom_user` = ?, `mail_user` = ?, `id_role` = ? WHERE `users`.`id_user` = ? ;"
        ,[edituser_value['prenom_user'],edituser_value['nom_user'],edituser_value['mail_user'],edituser_value['id_role'],edituser_value['id_user']],
        (err, results) => {
            if (err) {
                (dbError(err, "edituser", response));
            }
            response.status(HttpStatus.OK).send({message: results ? "Success" : "Failed"})
        });
}



function deleteUser(request, response) {
    const deleteuser_value = request.body.content; 
        db.query("DELETE FROM `users` WHERE `users`.`id_user` = ?;"
        ,[deleteuser_value['id_user']],
        (err, results) => {
            if (err) {
                (dbError(err, "deleteUser", response));
            }
            response.status(HttpStatus.OK).send({message: results ? "Success" : "Failed"})
        });   
}

function getUser(request, response) {
    const getuser_value = request.body.content;
        db.query("SELECT *, ue.card FROM users u INNER JOIN users_extend ue ON u.id_user = ue.id_user;" 
        ,[getuser_value],
        (err, results) => {
            console.log(results)
            if (err) {
                (dbError(err, "deleteUser", response));
            }
            response.status(HttpStatus.OK).send(results)
        });   

}



function dbError(err, from, res) {
    if (err instanceof Errors.NotFound) {
        // Returns a 404 with err.message in payload
        return res.status(HttpStatus.NOT_FOUND).send({status: 404, message: err.message, from: from}); // 404
    }
    // else it must be a 500, db error
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({status: 500, message: err.message, from: from}); // 500
}

module.exports = crudUser;