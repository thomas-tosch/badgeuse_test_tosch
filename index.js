let express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    cors       = require('cors'),
    config     = require('./server/config/config'),
    path       = require('path');


// required only to send cross data from frontend to backend
app.use(cors({
    origin : `http://${config.auth.HOST_ANGULAR}:${config.auth.PORT_ANGULAR}`,
    // headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
    credentials: true
}));

require('./server/config/socket')(app);

// Parse Application to Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
require('./server/routes/index')(app);

// Listening port of the server
app.listen(config.auth.PORT_EXPRESS, () => {
    console.log(`This app running on http://${config.auth.HOST_EXPRESS}:${config.auth.PORT_EXPRESS}`);
});
