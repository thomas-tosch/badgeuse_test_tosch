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

                if(halfDay === true || halfDay === false || halfDay === null) {if(halfDay === true){halfDay = 0;} else if(halfDay === false || halfDay === null){halfDay = 1;}}
                    else {if(halfDay !== null){ err += '[halfDay] ';}}

                if(comment) {comment = htmlspecialchars(comment.trim());}
                if(comment === ''){comment = null;}

                // DEFINE DATA FOR DB

                if(err === '') {
                    db.query('SELECT MAX(ref_absence) AS max_ref FROM absences', (err, rows) => {

                        let newRef = rows[0].max_ref + 1;
                        let entryNumber = new DateDiff(endDate, startDate);
                        entryNumber = Number(entryNumber.days());
                        if(entryNumber === 0){entryNumber = 1;}
                        let entryCount = 0;

                        for (let i = 0; i < entryNumber; i++) {
                            let newDate = new Date(startDate.setDate(startDate.getDate() + i));

                            // INSERT TO DB
                            let content = [[id_user], [newRef], [2], [newDate], [halfDay], [reason], [comment], [null]];
                            db.query('INSERT INTO absences(id_user, ref_absence, id_status, absence_date, half_day, id_reason, comment_absences, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                                content, (err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            message: 'Nous avons eu un souçis avec la base de données.'
                                        });
                                        throw err;
                                    } else {
                                        entryCount++;
                                        if (entryCount === entryNumber) {
                                            res.json({
                                                success: true,
                                                message: 'Votre justification à été soumis. Un administrateur se chargera de la valider ou de la refuser.'
                                            });
                                        }
                                    }
                                });
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Une des données saisie n\'est pas valide: '+err
                    });
                }
            break
        }
    });
}
