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
function uuid(router) {
    router.post('/', (request, response, next) => {

        const uuid_value = request.body.uuid;

        getUserId(uuid_value)
            .then((id) => {
                return isPresent(id);
            })
            .then((result) => {
                return setPresence(result[0], result[1])
            })
            .then((result) => {
                response.status(HttpStatus.OK).send({message: result ? "Success" : "Failed"})
            })
            .catch((err) => {
                dbError(err, "requestHandler", response)
            });
    })
}


/**
 * Checks if the DB contains user for a given uuid then returns it.
 * @param uuid_value
 * @returns Promise<any> - id of the User from the given UUID
 */
function getUserId(uuid_value) {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id_user FROM `users` u INNER JOIN `users_extend` ue ON ue.id_user = u.id_user ' +
            'WHERE ue.card = ?', [uuid_value],
            (err, results) => {
                try {
                    resolve(results[0].id_user);
                } catch (err) {
                    reject(err);
                }
            }
        );
    })
}


/**
 *  Switching the user (identified by it's id) presence state.
 * @param presence - Boolean that tells whether to set 'present' or 'absent'
 * @param id - User id comming from initial UUID
 * @returns {Promise<any>}
 */
function setPresence(presence, id) {
    return new Promise((resolve, reject) => {
        if (presence) {
            db.query('UPDATE badger ' +
                'SET ' +
                'end_point = CURRENT_TIMESTAMP, ' +
                'duration = IF(' +
                'IF(HOUR(start_point) < 12,1,0) = 1 ' +
                'AND IF(HOUR(CURRENT_TIME) > 14,1,0) = 1,' +
                'TIMEDIFF( DATE_ADD(end_point, INTERVAL -1 HOUR), start_point),' +
                'TIMEDIFF( end_point, start_point )) ' +
                '' +
                'WHERE start_point > CURRENT_DATE AND id_user = ? ' +
                'AND end_point is NULL ', [id],
                (err, results) => {
                    try {
                        resolve(results);
                    } catch (err) {
                        return reject(err);
                    }
                });
        } else {
            db.query('INSERT INTO badger(id_user) VALUES (?)', [id],
                (err, results) => {
                    try {
                        resolve(results)
                    } catch (err) {
                        return reject(err);
                    }
                });
        }
    })
}


/**
 *  This function will check from the table 'badger' that our user (known from id) isn't currently present.
 *  It'll check for current_date for forgotten 'absent' the previous day
 * @param id - the user id
 * @returns {Promise<any>, int} - a Boolean of the user state (present or not) and the user id (to pass it further)
 */
function isPresent(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM `badger` WHERE id_user = ? AND start_point > CURRENT_DATE AND end_point IS NULL ' +
            'ORDER BY id_point DESC LIMIT 1', [id],
            (err, results) => {
                try {
                    resolve([results.length, id]);
                } catch (err) {
                    return reject(err);
                }
            })
    })
}


function dbError(err, from, res) {
    switch (err.Name) {
        case Errors.NotFound:
            return res.status(HttpStatus.NOT_FOUND).send({status: 404, message: err.message, from: from}); // 404
        case Errors.BadRequest:
            return res.status(HttpStatus.BAD_REQUEST).send({status: 400, message: err.message, from: from}); // 400
        case Errors.Forbidden:
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({status: 500, message: err.message, from: from}); // 500
        default:
            break;
    }
}

module.exports = uuid;
