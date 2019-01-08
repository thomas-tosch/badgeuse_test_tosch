let login = require('./controllers/guest/login');
let user = require('./controllers/user/user');


module.exports = function(app)
{

    app.use('/login', login);
    app.use('/user', user);

};