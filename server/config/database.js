let mysql = require('mysql');

db = mysql.createPool(
    {
            host     : '127.0.0.1',
            port     : 3306,
            user     : 'uhaSQL',
            password : 'uha',
            database : 'badgeuse',
<<<<<<< HEAD
            multipleStatements: true // ATTENTION CETTE INFORMATIONS PEUT-ETRE A LORIGINE DE GROS PROBLEMES
    });
=======
    });
>>>>>>> e32eb847186c25f667098713d2b7c680cb2444df
