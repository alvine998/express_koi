module.exports = (app) => {
    const multer = require("multer");
    
    // Use Multer
    var storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './resources/uploads')
        },
        filename: (res, file, callBack) => {
            callBack(null, file.fieldname + '_' + file.originalname)
        }
    });
    
    var upload = multer({
        storage: storage
    });
    

    app.post("/upload", upload.single('images'), (req,res) => {
        if(!req.file){
            console.log("No file upload");
        } else {
            console.log(req.file.filename)
            res.status(200).send({
                message: "success",
                info : req.file.filename
            })
        }
    })
}