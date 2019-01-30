let login = require('./controllers/guest/login');
let user = require('./controllers/user/user');
let badger = require('./controllers/user/badger');
let liste = require('./controllers/admin/liste');
let alerte = require('./controllers/user/alerte');
let hebdo = require('./controllers/admin/hebdo');
let calendar = require('./controllers/user/calendar');


module.exports = function(app)
{

    app.use('/login', login);
    app.use('/user', user);
    app.use('/badger', badger);
    app.use('/liste', liste);
    app.use('/alerte', alerte);
    app.use('/hebdo', hebdo);
    app.use('/calendar', calendar);

};
