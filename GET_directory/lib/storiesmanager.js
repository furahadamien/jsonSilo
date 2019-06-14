/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */


const nedb = require('nedb');
let STORY_DB = 'story.db';

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
  }
  retrieve(id, cb){
    //return cb({"this":"data"}, 200)
    let identifier = id;
    this.database.find({ _id: id }, {}, function(err, stories){
      let status = 200;
      let data = { stories: stories };
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
}
module.exports = StoriesManager;