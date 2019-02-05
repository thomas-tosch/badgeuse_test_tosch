require ('../../../config/database');
const isDateFormat = require('is-date-format');
const htmlspecialchars = require('htmlspecialchars');
const  DateDiff = require('date-diff');

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

                let id_user = Number(req.body.id_user);
                let reason = Number(req.body.reason);
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;
                let dateOnly = req.body.dateOnly;
                let halfDay = req.body.halfDay;
                let comment = req.body.comment;

                // CHECK ALL DATA FROM FORMULAR
                if(reason && Number.isInteger(reason)) {}
                    else {err += '[reason] ';}
                if(startDate && isDateFormat(startDate, 'yyyy-mm-dd')) {startDate = new Date(startDate.trim());}
                    else {if(startDate !== null){ err += '[startDate] ';}}
                if(endDate && isDateFormat(endDate, 'yyyy-mm-dd')) {endDate = new Date(endDate.trim());}
                    else {if(endDate !== null){ err += '[endDate] ';}}
                if(dateOnly && isDateFormat(dateOnly, 'yyyy-mm-dd')) {dateOnly = new Date(dateOnly.trim()); startDate = dateOnly; endDate = dateOnly;}
                    else {if(dateOnly !== null){ err += '[dateOnly] ';}}
                if(halfDay === true || halfDay === false) {if(halfDay === true){halfDay = 1;} else if(halfDay === false){halfDay = 0;}}
                    else {if(halfDay !== null){ err += '[halfDay] ';}}
                if(comment) {comment = htmlspecialchars(comment.trim());}

                // DEFINE DATA FOR DB

                db.query('SELECT MAX(ref_absence) AS max_ref FROM absences', (err, rows) => {
                    // console.log(rows[0]);
                    let newRef = rows[0].max_ref + 1;


                    let entryNumber = new DateDiff(endDate, startDate);
                    // console.log(startDate);

                    for(let i = 0; i < Number(entryNumber.days()); i++) {
                        let newDate = new Date(startDate.setDate(startDate.getDate() + i));

                        let content = {
                            id_user: id_user,
                            ref_absence: newRef,
                            id_status: 2,
                            absence_date: newDate,
                            half_day: halfDay,
                            id_reason: reason,
                            comment_absences: comment,
                            certificate: null
                        }
                        console.log(content);

                        // INSERT TO DB
                        db.query('INSERT INTO absences (id_user, ref_absence, id_status, absence_date, half_day, id_reason, comment_absences, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            content, (err) => {
                            if(err) {
                                throw err;
                            }
                            console.log('ok');
                            });
                    }
                });




                // callback a response
                res.json({
                    success: true
                });
                console.log('ERROR: ', err);
            break
        }
    });
}
