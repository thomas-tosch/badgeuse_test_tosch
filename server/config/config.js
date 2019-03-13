const ipLocal = require('ip');

/**
 * Generate random key id for the user connection, please don't touch
 * @returns {string}
 */
function makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/**
 * Define the listen port et multi cross origin request
 * @type {{PORT_EXPRESS: number, HOST_ANGULAR: (*|*), SECRET_KEY: string}}
 */
const AUTH = {
    PORT_EXPRESS : 8080, // use for listen this port on backend
//    HOST_ANGULAR : ipLocal.address(), // use for multi-cross origin request with client
    HOST_ANGULAR : '145.239.32.254', // use for multi-cross origin request with client
    PORT_ANGULAR : 81,
    SECRET_KEY: makeId() // secret key for token crypt
};

/**
 * export AUTH attribute
 */
exports.auth = AUTH;

