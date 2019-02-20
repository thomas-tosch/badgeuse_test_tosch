let express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    cors       = require('cors'),
    config     = require('./server/config/config');

// required only to send cross data from frontend to backend
app.use(cors({
    origin : `http://${config.auth.HOST_ANGULAR}:${config.auth.PORT_ANGULAR}`, // uncomment this line for on local developement
    // origin : `http://${config.auth.HOST_ANGULAR}`, // uncomment this line for server prod
    credentials: true
}));

// Socket.io app
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
