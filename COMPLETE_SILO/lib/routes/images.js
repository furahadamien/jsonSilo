/**
  * Copyright reelyActive 2019-2019
  * We believe in an open Internet of Things
  */

const express = require('express');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
let router = express.Router();

 
router.route('/:id').get(function(req, res){
  getImage(req, res);
});

router.route('/').post(function(req, res) {
  uploadImage(req, res);
});

function uploadImage(req, res){
  let images = req.jsonsilo.images;
  images.upload(req, res, function(err, data){
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
 