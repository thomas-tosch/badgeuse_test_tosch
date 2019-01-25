let mysql = require('mysql');

db = mysql.createConnection(
    {
            host     : 'localhost',
            port     : 3306,
            user     : 'uhaSQL',
            password : 'uha',
            database : 'badgeuse',
    });