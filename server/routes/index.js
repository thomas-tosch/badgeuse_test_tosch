let login = require('./controllers/guest/login');


module.exports = function(app)
{

    app.use('/login', login);

};