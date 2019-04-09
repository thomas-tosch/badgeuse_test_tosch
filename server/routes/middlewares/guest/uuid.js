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
                return dbError(err)
            }
        }
    )
}

function setPresence(id) {
    is_on =
        db.query('SELECT * FROM badger WHERE id_user = ? AND end_point IS NULL AND start_point > CURRENT_DATE',
            [id], (err, rows) => {
                // if any end_point is nul today
                if (!rows || !rows.length) {
                    db.query('INSERT INTO badger(id_user) VALUES (?)', [id], (err) => {
                        if (err) {
                            dbError(err)
                        } else {
                            res.json({
                                success: true,
                                title: title,
                                message: message
                            });
                        }
                    });
                } else {
                    res.json({
                        success: false
                    });
                    throw err;
                }
            });
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
        'AND end_point is NULL ', content_badger_end, (err) => {
        if (err) {
            res.json({
                success: false
            });
            throw err;
        } else {
            res.json({
                success: true,
                title: title,
                message: message
            });
        }
    })
}

function isPresenceOn(id) {
    db.query('SELECT * FROM BADGER WHERE id_user = ? AND start_point > CURRENT_DATE AND end_point IS NULL ORDER Desc LIMIT 1', [id], (err, rows) => {
        if (!rows || !rows.length) {
            return dbError(err)
        }
    })
}

function dbError(err) {
    if (err instanceof Errors.NotFound) {
        // Returns a 404 with err.message in payload
        return res.status(HttpStatus.NOT_FOUND).send({message: err.message}); // 404
    }
    // else it must be a 500, db error
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: err, message: err.message}); // 500
}

module.exports = uuid(router);
