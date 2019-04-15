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
function adduser(router) {
    router.post('/', (request, response) => {
        
        const adduser_value = request.body.adduser;

        adduser(adduser_value)
        .then((id) => {
            return postuser(id);
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
 * Add new user in the db.
 * @param adduser_value
 * @param res
 * @returns array containing users 
 * @returns res.statusCode 404 if not found, 500 if db error
 */
// Add user into the db on the users table
function postuser(adduser_value, res) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO `users` (`prenom_user`, `nom_user`, `mail_user`, `id_role`) VALUES (?, ?, ?, ?);"
        ,[adduser_value['prenom_user'],adduser_value['nom_user'],adduser_value['mail_user'],adduser_value['id_role']],
        (err, results) => {
            if (err) {
                reject(dbError(err, "adduser_value", res));
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

module.exports = adduser;