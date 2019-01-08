let mysql = require('mysql');

// TODO : changer les coordonées mysql

// db = mysql.createConnection(
//     {
//         host     : 'localhost',
//         port     : 3306,
//         user     : 'badint',
//         password : '123456',
//         database : 'badint',
//     });

db = mysql.createConnection(
    {
            host     : 'localhost',
            port     : 3306,
            user     : 'uhaSQL',
            password : 'uha',
            database : 'showroom',
    });