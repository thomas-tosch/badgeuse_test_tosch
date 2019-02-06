require('../../../config/database');
const fileUpload = require('express-fileupload');

module.exports = function(router) {

    router.use(fileUpload());

    router.post('/', (req, res) => {

        let imgFile = req.files.justificatif
        let fileName = req.files.justificatif.name;
        let filePath = './justificatif/';

        if (!imgFile) {
            console.log("No file received");

        } else {
            imgFile.mv(filePath + fileName, (err)=>{
                if(err) throw err;
                res.send('success')
            })


        }

    });
}

