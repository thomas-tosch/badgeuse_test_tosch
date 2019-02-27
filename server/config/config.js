const ipLocal = require('ip');
/**
 * for developpement. Comment and uncomment the line of ip of you need
 */
// const ip = 'localhost';
const ip = ipLocal.address();

//fait le lien entre angular et expresse
const AUTH = {
    HOST_EXPRESS : ip, // use for view in console, systeme don'tn need this
    PORT_EXPRESS : 8080, // use for listen this port on backend
    HOST_ANGULAR : ip, // use for multi-cross origin request
    PORT_ANGULAR : 4200, // port for dev on localhost, not use in prod
    SECRET_KEY: makeId()
};

exports.auth = AUTH;

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
