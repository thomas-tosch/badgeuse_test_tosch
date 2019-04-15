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
function deleteuser(router) {
    router.delete('/', (request, response) => {

    const deleteuser_value = request.body.deleteuser;

    deleteuser(deleteuser_value)
        .then((id) => {
            return deleteuser(id);
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
 * Delete new user in the db.
 * @param deleteuser_value
 * @param res
 * @returns array containing id_user 
 * @returns res.statusCode 404 if not found, 500 if db error
 */
// Delete user into the db on the users table
function deleteuser(deleteuser_value, res) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM `users` WHERE `users`.`id_user` = ?;"
        ,[deleteuser_value['id_user']],
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

module.exports = deleteuser;