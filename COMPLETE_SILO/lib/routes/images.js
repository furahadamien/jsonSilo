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
   destination: './uploads',
   filename: function(req, file, callback){
     callback(null, Date.now()+file.originalname);
   }
 });
 
 var upload = multer({storage: storage}).single('myFile');
 
 router.route('/').post((req, res) => {
   upload(req, res, function(err){
     console.log("file is " ,req.file);
     if(err){
       res.send("error uploading");
     }
     res.end("file uploaded");
   });
 });
 
 
 module.exports = router;
 