let mysql = require('mysql');

db = mysql.createConnection(
    {
        host     : 'mariadb',
        port     : 3306,
        user     : 'uhaSQL',
        password : 'uha',
        database : 'badgeuse',
    });
