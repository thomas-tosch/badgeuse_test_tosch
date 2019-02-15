//fait le lien entre angular et expresse
const AUTH = {
    HOST_EXPRESS : "10.3.1.53",
    PORT_EXPRESS : 3000,
    HOST_ANGULAR : "10.3.1.53",
    PORT_ANGULAR : 8084,
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