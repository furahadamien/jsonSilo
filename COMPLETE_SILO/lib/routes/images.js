/**
  * Copyright reelyActive 2019-2019
  * We believe in an open Internet of Things
  */


const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
let router = express.Router();
 
let storage = multer.diskStorage({
  destination: './images',
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
 
router.route('/:id').get(function(req, res){
  getImage(req, res);
});

router.route('/').post(function(req, res) {
  uploadImage(req, res);
});

function uploadImage(req, res){
  upload(req, res, function(err){
    if(err){ 
      res.status(204).end(); 
    }
    else if(req.file == undefined){
      res.status(422).end();
    }
    else{
    //image resizing using the sharp module
      sharp(path.resolve(__dirname + '../../../' + `/images/${req.file.originalname}`))
      .resize(300, 300).toBuffer(function(err, buffer) {
        if(err){
          res.send(err);
        }
        else{
          fs.writeFile(path.resolve(__dirname + '../../../' + `/images/${req.file.originalname}`),
            buffer, function(e) {
          });
        }
      });
      res.end(req.file.originalname);
    }
  });
}

function getImage(req, res){
  res.sendFile(path.resolve(__dirname + '../../../' + `/images/${req.params.id}`));
}

module.exports = router;
 