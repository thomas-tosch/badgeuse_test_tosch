let mysql = require('mysql');

// TODO : changer les coordonées mysql

db = mysql.createConnection(
    {
        host     : '127.0.0.1',
        port     : 3306,
        user     : 'UHA',
        password : 'UHA',
        database : 'uha',
    });