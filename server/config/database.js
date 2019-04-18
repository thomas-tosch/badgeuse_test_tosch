let mysql = require('mysql');

db = mysql.createPool(
    {
            host     : '127.0.0.1',
            port     : 3306,
            user     : 'uhaSQL',
            password : 'uha',
            database : 'badgeuse',
            multipleStatements: true // ATTENTION CETTE INFORMATIONS PEUT-ETRE A LORIGINE DE GROS PROBLEMES
    });