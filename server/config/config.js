//fait le lien entre angular et expresse
const AUTH = {
    HOST_EXPRESS : "localhost",
    PORT_EXPRESS : 8080,
    HOST_ANGULAR : "localhost",
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