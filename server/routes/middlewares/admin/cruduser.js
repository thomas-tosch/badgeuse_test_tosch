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
    router.post('/', postrequestHandler)
    router.put('/', putrequestHandler)
    router.delete('/', deleterequestHandler)
}

function postrequestHandler(request, response) {
    try {
        const postuser_value = request.body.postuser;

        let id = postUser(postuser_value, response).then((rows) => {
            return rows
        });
        if (!id instanceof Promise) {
            console.log(id)
        }
    } catch (e) {

    }
}

postuser_value = [
    "prenom_user",
    "nom_user",
    "mail_user",
    "id_role"
]

function putrequestHandler(request, response) {
    try {
        const putuser_value = request.body.putuser;

        let id = putUser(putuser_value, response).then((rows) => {
            return rows
        });
        if (!id instanceof Promise) {
            console.log(id)
        }
    } catch (e) {

    }
}

putuser_value = [
    "prenom_user",
    "nom_user",
    "mail_user",
    "id_role",
    "id_user"
]

function deleterequestHandler(request, response) {
    try {
        const deleteuser_value = request.body.deleteuser;

        let id = deleteUser(deleteuser_value, response).then((rows) => {
            return rows
        });
        if (!id instanceof Promise) {
            console.log(id)
        }
    } catch (e) {

    }
}

deleteuser_value = [
    "id_user"
]

/**
 * Add new user in the db.
 * @param postuser_value
 * @param res
 * @returns array containing users 
 * @returns res.statusCode 404 if not found, 500 if db error
 */
// Add user into the db on the users table
function postUser(postuser_value, res) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO `users` (`prenom_user`, `nom_user`, `mail_user`, `id_role`) VALUES (?, ?, ?, ?);"
        ,[postuser_value],
        (err, results) => {
            if (err) {
                reject(dbError(err, "postUser", res));
            }
            resolve(results);
        }
        );
    })
}

/**
 * Put new user in the db.
 * @param putuser_value
 * @param res
 * @returns array containing users
 * @returns res.statusCode 404 if not found, 500 if db error
 */
// Edit user into the db on the users table
function putUser(putuser_value, res) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE `users` SET `prenom_user` = ?, `nom_user` = ?, `mail_user` = ?, `id_role` = ? WHERE `users`.`id_user` = ? ;"
        ,[putuser_value],
        (err, results) => {
            if (err) {
                reject(dbError(err, "putUser", res));
            }
            resolve(results);
        }
        );
    })
}

/**
 * Delete new user in the db.
 * @param deleteuser_value
 * @param res
 * @returns array containing id_user 
 * @returns res.statusCode 404 if not found, 500 if db error
 */
// Delete user into the db on the users table
function deleteUser(deleteuser_value, res) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM `users` WHERE `users`.`id_user` = ?;"
        ,[deleteuser_value],
        (err, results) => {
            if (err) {
                reject(dbError(err, "deleteUser", res));
            }
            resolve(results);
        }
        );
    })    
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