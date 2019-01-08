let login = require('./controllers/guest/login');
let user = require('./controllers/user/user');
let badger = require('./controllers/user/badger');


module.exports = function(app)
{

    app.use('/login', login);
    app.use('/user', user);
    app.use('/badger', badger);

};