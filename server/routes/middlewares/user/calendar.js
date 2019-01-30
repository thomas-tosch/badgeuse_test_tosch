require ('../../../config/database');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;
        let absence = req.body.absence;

        db.query('SELECT * ' +
            'FROM absences'
            , [absence], (err, rows)=> { });

    });
}