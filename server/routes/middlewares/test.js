

module.exports = function(router) {

    //on reçoit les données envoyer par Angular dans 'req'.
    //on renvoie les données vers angular dans 'res'.
    router.post('/', (req, res) => {

       const action = req.body.action;

       switch (action) {

           case 'test':
               res.json({
                   success: true,
                   message: 'Ce message vient tout droit d\'express !'
               });
           break;
       }
    });
}