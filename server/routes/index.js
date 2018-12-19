let test = require('./controllers/test');


module.exports = function(app)
{

    app.use('/test', test);

};