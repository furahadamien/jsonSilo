/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */


const TEST_JSON =  {"name": {
  "type": "file",
  "value": "File",
  "popup": {
    "menuitem": "NONE"
  }
}};

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
    self.identifierLength = options.identifierLength;
  }

 retrieve(id, cb){
   let identifier = id;
   this.database.find(identifier, function(err, stories){
    let status = 200;
    let data = { stories: stories };
    cb(data, status);
   });

 }

  find (id, cb){
    this.database.find({ _id: id }, function(err, docs){
    let result= docs[0];
    let json = TEST_JSON;
    if(result != null){
      json = result.json;
    }
    cb(json);
    });
  }
}


module.exports = StoriesManager;