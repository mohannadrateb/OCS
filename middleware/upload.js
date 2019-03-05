const multer = require("multer");
const path = require("path");
const fs = require('fs');


var Storage = multer.diskStorage({
    destination: function(req,file,callback){
        const user = req.params.id;
        const uploadPath = process.env.UPLOAD_PATH || "uploads";
        const dir = `${uploadPath}/${user}`;
        
        // check  if there is the directory that belongs to the user or no
         try{
            fs.accessSync(dir)
         }
         catch(error){
            fs.mkdir(dir, function (err) {
                 if (!err) {
                   callback(null, dir);
                 }
               });

         };
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
      }
});

module.exports =  
    multer({
    storage: Storage,
    limits:{
        fileSize: 2 * 1024 * 1024 
    },
    fileFilter: function (req, file, callback) {
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
          return callback(null, true);
        }
        return callback(new Error('Only images are allowed!'))
        //callback("Not an image file");
      }
}).single('myfile');











