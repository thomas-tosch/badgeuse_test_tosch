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
function edituser(router) {
    router.put('/', (request, response) => {

        const edituser_value = request.body.edituser;

        edituser(edituser_value)
        .then((id) => {
            return edituser(id);
        })
        .then((result) => {
            response.status(HttpStatus.OK).send({message: result ? "Success" : "Failed"})
        })
        .catch((err) => {
            dbError(err, "request", response)
        });
    })
}

/**
 * Put new user in the db.
 * @param edituser_value
 * @param res
 * @returns array containing users
 * @returns res.statusCode 404 if not found, 500 if db error
 */
// Edit user into the db on the users table
function edituser(edituser_value, res) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE `users` SET `prenom_user` = ?, `nom_user` = ?, `mail_user` = ?, `id_role` = ? WHERE `users`.`id_user` = ? ;"
        ,[edituser_value['prenom_user'],edituser_value['nom_user'],edituser_value['mail_user'],edituser_value['id_role'],edituser_value['id_user']],
        (err, results) => {
            if (err) {
                reject(dbError(err, "edituser", res));
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

module.exports = edituser;