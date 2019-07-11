/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */

const multer = require('multer');
const path = require('path');

class ImagesManager {
  /**
  * ImagesManager constructor
  * Manages the persistent JSON entries
  * @param {Object} options The options as a JSON object.
  * @constructor
  */
  constructor(options) {
    let self = this;
    options = options || {};
    self.storage = multer.diskStorage({
      destination: './images',
      filename: function(req, file, callback){
        callback(null, file.originalname);
      }
    });
     self.upload = multer({storage: self.storage,
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
  }
}
module.exports = ImagesManager;