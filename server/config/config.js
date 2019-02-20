/**
 * for developpement. Comment and uncomment the line of ip of you need
 */
const ip = 'localhost';
// const ip = '10.3.1.56';

//fait le lien entre angular et expresse
const AUTH = {
    HOST_EXPRESS : ip,
    PORT_EXPRESS : 8080,
    HOST_ANGULAR : ip,
    PORT_ANGULAR : 4200,
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