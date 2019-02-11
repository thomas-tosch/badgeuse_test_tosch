require ('../../../config/database');


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
                     '' +
                     'reason.nom_reason AS absReason, ' +
                     '' +
                     'CASE WHEN half_day < 1 THEN "Non" ELSE "Oui" END AS miAbs' +
                     '' +
                     ' FROM ((absences ' +
                     '' +
                     'INNER JOIN users ON absences.id_user = users.id_user) ' +
                     'INNER JOIN reason ON absences.id_reason = reason.id_reason) ' +
                     //'LEFT JOIN (SELECT id_user, ref_absence, id_status, absence_date, id_reason FROM absences WHERE id_status = 2 AND GROUP BY ref_absence) absences ON users.id_user = absences.id_user ' + // join users table table with absence table. Select all between date and summe de absence day
                     'WHERE id_status = 2'
                     //'' +
                     //'GROUP BY red_absence ' +
                     //'' +
                     //'ORDER BY ??, absName' // select order by
                     , content, (err, rows) => {
                   console.log(rows);
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
