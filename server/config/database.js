let mysql = require('mysql');

db = mysql.createPool(
    {
            host     : 'mariadb',
            port     : 3306,
            user     : 'uhaSQL',
            password : 'uha',
            database : 'badgeuse',
            multipleStatements: true // ATTENTION CETTE INFORMATIONS PEUT-ETRE A LORIGINE DE GROS PROBLEMES
    });
