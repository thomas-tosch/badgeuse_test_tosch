let login = require('./controllers/login');


module.exports = function(app)
{

    app.use('/login', login);

};