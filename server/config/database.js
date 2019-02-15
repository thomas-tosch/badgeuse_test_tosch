let mysql = require('mysql');

db = mysql.createConnection(
    {
            host     : '10.3.1.53',
            port     : 3307,
            user     : 'uhaSQL',
            password : 'uha',
            database : 'badgeuse',
    });