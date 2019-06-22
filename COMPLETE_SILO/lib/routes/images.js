/**
  * Copyright reelyActive 2019
  * We believe in an open Internet of Things
  */


 const express = require('express');
 const multer = require('multer');
 const path = require('path');
 const sharp = require('sharp');
 const fs = require('fs');
 var router = express.Router();
 
 var storage = multer.diskStorage({
   destination: './photos',
   filename: function(req, file, callback){
     callback(null, file.originalname);
   }
 });
 
 var upload = multer({storage: storage,
  fileFilter: function(req, file, cb){
    //validate file is an image
    const filetypes = /jpeg|jpg|png|gif|tiff|psd/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype); 

    if(mimetype && extname){
      console.log("failled test");
      return cb(null,true);
    } else {
      cb('Error: Please, make you that the file you are uploading is an image');
    }
  }
}).single('myFile');
 
router.route('/:id').get((req, res) => {
res.sendFile(path.resolve(__dirname + '../../../' + `/photos/${req.params.id}`));
});

 router.route('/').post((req, res) => {
   upload(req, res, function(err){
     console.log("file is " ,req.file);
     if(err){
       res.send("error uploading");
     }

     //image resizing using the sharp module
    sharp(path.resolve(__dirname + '../../../' + `/photos/${req.file.originalname}`))
      .resize(300, 300).toBuffer(function(err, buffer) {
        if(err){
          console.log("this is the error ",err);
        }
        else{
          console.log("images resized");
          fs.writeFile(path.resolve(__dirname + '../../../' + `/photos/${req.file.originalname}`), buffer, function(e) {
          });
        }
      });
    res.end(req.file.originalname);
   });

 });
 
 
 module.exports = router;
 