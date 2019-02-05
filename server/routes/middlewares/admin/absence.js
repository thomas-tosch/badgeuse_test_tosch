require ('../../../config/database');


module.exports = function(router) {

    router.post('/', (req, res) => {


        const action = req.body.action;

        switch (action) {

             // Get the user list for graphic week with filter and order by
             case 'getUserListAbsence':
                 // let startDate = req.body.absenceDate;

                 let content = [

               ];

                 db.query('SELECT * FROM absences WHERE id_status = 2', content, (err, rows) => {
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
                    })
                break


        }
    });
}
