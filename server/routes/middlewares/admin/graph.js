require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            //
            case 'getDb':

                db.query('SELECT * FROM badger ORDER BY date_point', (err, rows)=> {
                    if(err) throw err;

                    res.json({message: rows});
                //    TODO : séparer chaque élement tu tableau ici, ainsi que le datetime.

                })
                break
        }
    });
}