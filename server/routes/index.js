let login = require('./controllers/guest/login');
let user = require('./controllers/user/user');
let badger = require('./controllers/user/badger');
let newPass = require('./controllers/guest/newPass');
let graph = require('./controllers/admin/graph');
let liste = require('./controllers/admin/liste');


module.exports = function(app)
{

    app.use('/login', login);
    app.use('/user', user);
    app.use('/badger', badger);
    app.use('/newPass', newPass);
    app.use('/graph', graph);
    app.use('/liste', liste);

};