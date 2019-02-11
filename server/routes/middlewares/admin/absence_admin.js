require ('../../../config/database');
const Entities = require('html-entities').AllHtmlEntities;


module.exports = function(router) {

    router.post('/', (req, res) => {


        const action = req.body.action;

        switch (action) {

             // GET ABSENCE LIST FOR ADMIN
             case 'getUserListAbsence':
                 // let startDate = req.body.absenceDate;

                 let content = [

               ];

                 db.query('SELECT ' +
                     'CONCAT(users.nom_user, \' \', users.prenom_user) AS absName, ' +
                     'absences.ref_absence AS ref, ' +
                     'MIN(absences.absence_date) AS minDate, ' +
                     'MAX(absences.absence_date) AS maxDate, ' +
                     'absences.half_day AS halfDay, ' +
                     'absences.comment_absences as comment, ' +
                     'absences.certificate as certificate, ' +
                     '' +
                     'reason.nom_reason AS absReason ' +
                     '' +
                     'FROM absences ' +
                     '' +
                     'INNER JOIN users ON absences.id_user = users.id_user ' +
                     'INNER JOIN reason ON absences.id_reason = reason.id_reason ' +
                     'WHERE id_status = 2 ' +
                     //'' +
                     'GROUP BY ref ' +
                     //'' +
                     'ORDER BY ref' // select order by
                     , content, (err, rows) => {
                   // console.log(rows);
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
                    });
                break


        }
    });
}
