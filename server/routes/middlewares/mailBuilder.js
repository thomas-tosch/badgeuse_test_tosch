let fs = require('read-file');
let html;

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

module.exports = function setMailContent(model, variable, callback) {

    readModuleFile('../../public/mailTemplate/'+model+'.html', function (err, words) {
        html = words;

        if(model === 'forgotPass') {
            html = html.replace('{id_user}', variable.id_user);
            html = html.replace('{keyTemp}', variable.keyTemp);
        }


        return callback(html);
    });


};