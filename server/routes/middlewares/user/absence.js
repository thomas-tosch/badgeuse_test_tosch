require ('../../../config/database');
const isDateFormat = require('is-date-format');
const htmlspecialchars = require('htmlspecialchars');

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
                let err = '';

                let reason = Number(req.body.reason);
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;
                let dateOnly = req.body.dateOnly;
                let halfDay = req.body.halfDay;
                let comment = req.body.comment;

                // CHECK ALL DATA FROM FORMULAR
                if(reason && Number.isInteger(reason)) {}
                    else {err += '[reason] ';}
                if(startDate && isDateFormat(startDate, 'yyyy-mm-dd')) {startDate = startDate.trim();}
                    else {if(startDate !== null){ err += '[startDate] ';}}
                if(endDate && isDateFormat(endDate, 'yyyy-mm-dd')) {endDate = endDate.trim();}
                    else {if(endDate !== null){ err += '[endDate] ';}}
                if(dateOnly && isDateFormat(dateOnly, 'yyyy-mm-dd')) {dateOnly = dateOnly.trim();}
                    else {if(dateOnly !== null){ err += '[dateOnly] ';}}
                if(halfDay === true || halfDay === false) {}
                    else {if(halfDay !== null){ err += '[halfDay] ';}}
                if(comment) {comment = htmlspecialchars(comment.trim());}

                // insert to db

                // callback a response
                res.json({
                    success: true
                });
                console.log('ERROR: ', err);
            break
        }
    });
}
