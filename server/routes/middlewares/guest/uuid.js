require('../../../config/database');
const Errors = require('../../../error/errors');
const HttpStatus = require('http-status-codes');
/**
 *  Receives an UUID from our RaspberryPi (or other devices
 *  from a student card.
 *  Processes it into our DB to change user state.
 *  No intermediate step like login.js.
 * @param router
 */
const uuid = function (router) {
    router.post('/', (req, res) => {
        try {
            const uuid_value = req.body.uuid;
            getUser(uuid_value, res)
        } catch (e) {

        }
    })
};

/**
 * Checks if the DB contains user for a given uuid then returns it.
 * @param uuid_value
 * @param res
 * @returns array containing user linked to the given uuid
 * @returns res.statusCode 404 if not found, 500 if db error
 */
function getUser(uuid_value, res) {
    db.query('SELECT u.id_user FROM users AS u' +
        ' INNER JOIN users_extend AS ue ON ue.id_user = u.id_user WHERE ue.card =?', [uuid_value],
        (err, result) => {
            try {
                // returns the User as an array
                return result[0];
            } catch (err) {
                // Checks if our err is a Not
                if (err instanceof Errors.NotFound) {
                    // Returns a 404 with err.message in payload
                    return res.status(HttpStatus.NOT_FOUND).send({message: err.message}); // 404
                }
                // else it must be a 500, db error
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: err, message: err.message}); // 500
            }
        }
    )
}

module.exports = uuid(router);
