require ('../../../config/database');

module.exports = function(router) {

    router.post('/', (req, res) => {

        const action = req.body.action;

        switch (action) {

            // GET REASON DATA
            case 'getReason':
                db.query('SELECT * FROM reason ORDER BY id_reason', (err, rows) => {
                    if(err) {
                        res.json({
                            success: false
                        });
                        throw err;
                    } else {
                        res.json({
                            success: true,
                            list: rows
                        });
                    }
                })

            break

            // REQUEST ABSENCE TO DB
            case 'absenceRequest':
                let reason = req.body.reason.trim();
                let startDate = req.body.startDate.trim();
                let endDate = req.body.endDate.trim();
                let dateOnly = req.body.dateOnly.trim();
                let halfDay = req.body.halfDay.trim();
                let comment = req.body.comment.trim();

                // check all data

                // insert to db

                // callback a response
                res.json({
                    success: true
                });
            break
        }
    });
}
