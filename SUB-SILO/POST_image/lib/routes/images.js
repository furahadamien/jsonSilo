/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
var router = express.Router();

var fileName = '';
//disk storage
const STORAGE = multer.diskStorage({
  destination: './image/',
  filename: function(req, file, cb){
    fileName = file.fieldname + Date.now() + path.extname(file.originalname);
    cb(null,fileName);
  }
});
// image upload method
const upload = multer({
  storage: STORAGE,
  fileFilter: function(req, file, cb){
    //validate file is an image
    const filetypes = /jpeg|jpg|png|gif|tiff|psd/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype); 

    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Please, make you that the file you are uploading is an image');
    }
  }
}).single('myImage');

router.route('/').get( (req, res) => res.render('../../web/index'));

//Image upload route
router.route('/').post((req, res) => {
  upload(req, res, (err) => { 
    if(err){
      res.render('error', {
        msg: err
      });
    } else {
      if(req.file === undefined){
        res.render('error', {
          msg: 'Error: No file selected!'
        });
      } else {
        res.render('../../web/index', {
          msg: 'Image uploaded to the server, a resized version can be found at http://localhost:3000/imageResized',
          file: `../images/${req.file.filename}`
        });
      }
    }
    //image resizing using the sharp module
    sharp(__dirname + `/image/${fileName}`).resize(300, 300).toBuffer(function(err, buffer) {
      if(err){
        console.log(err);
      }
      else{
        fs.writeFile(__dirname + `/image/${fileName}`, buffer, function(e) {
        });
      }
    });
  });
  
 });


/**TO-DO 
 * change '/imageResized' to exact path to the image in app.get
 * figure out why router.route(`/images/${fileName}`).get does not work as a route( will help automatically castomize each image's root)
 */
router.route('/imageResized').get( (req, res) =>res.sendFile(__dirname + `/images/${fileName}`));


module.exports = router;