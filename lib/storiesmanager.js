/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */


const nedb = require('nedb');
const NeDBManager = require('./nedbmanager');


class StoriesManager {
  /**
   * AssociationManager constructor
   * Manages the persistent JSON entries
 * @param {Object} options The options as a JSON object.
 * @constructor
 */
  constructor(options, database) {
    let self = this;

    options = options || {};

    self.database = database;
    let filename = NeDBManager.database;
    //self.db = new nedb({filename: filename, autoload: true });
    self.identifierLength = options.identifierLength;
  }


 retrieve(id, cb){
   let identifier = id;
   //let query = { _id: identifier };
   //let projection = {};
  
   this.database.find(identifier, function(err, stories){
    let status = 200;
    let data = { stories: stories };
    //console.log(data);
    console.log('passes');
    cb(data, status);
   });

 }

  find (id, cb){
    this.database.find({ _id: id }, function(err, docs){
    let result= docs[0];
    let json = {};
    if(result != null){
      json = result.json;
    }
    cb(json);
    });
  }

  insert(story, callback){
    this.database.insert(story,
      function(err, newDoc){
        //console.log(err, newDoc);
        if(err) {
          return callback(400);
        } 
        else{
         //console.log(newDoc);
          return callback(200, {stories: newDoc});
        }

      });
  }


  
}


module.exports = StoriesManager;