let express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    cors       = require('cors'),
    config     = require('./src/server/config/config');

// required only to send cross data from frontend to backend
/*
app.use(cors({
    origin : 'http://'+ config.auth.HOST_ANGULAR,
    credentials: true
}));
*/
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://7811b8f322f64154b421b050b410aad7@sentry.io/1792315' });

app.use(cors({
    origin : [`http://${config.auth.HOST_ANGULAR}:${config.auth.PORT_ANGULAR}`, process.env.HEROKU_FRONT],
    //origin : `http://${config.auth.HOST_ANGULAR}`,
    credentials: true
}));

// Socket.io app
require('./src/server/config/socket')(app);

// Parse Application to Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
require('./src/server/routes/index')(app);

// Listening port of the server
app.listen(config.auth.PORT_EXPRESS, () => {
    console.log(`Badgeuse app started on port ${config.auth.PORT_EXPRESS}`);
});

console.log('=============================')
