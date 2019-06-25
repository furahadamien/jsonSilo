/**
  * Copyright reelyActive 2019
  * We believe in an open Internet of Things
  */


const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
let router = express.Router();
 
let storage = multer.diskStorage({
  destination: './photos',
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
});
 
let upload = multer({storage: storage,
  fileFilter: function(req, file, cb){
    //validate file type
    const filetypes = /jpeg|jpg|png|gif|tiff|psd/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype); 

    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: wrong file format');
    }
  }
}).single('myFile');
 
router.route('/:id').get((req, res) => {
  res.sendFile(path.resolve(__dirname + '../../../' + `/photos/${req.params.id}`));
});

router.route('/').post((req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.status(204).end(); //No Content
    }else{
    //image resizing using the sharp module
      sharp(path.resolve(__dirname + '../../../' + `/photos/${req.file.originalname}`))
      .resize(300, 300).toBuffer(function(err, buffer) {
        if(err){
          res.send(err);
        }
        else{
          fs.writeFile(path.resolve(__dirname + '../../../' + `/photos/${req.file.originalname}`),
            buffer, function(e) {
          });
        }
      });
      res.end(req.file.originalname);
    }
  });
});

module.exports = router;
 