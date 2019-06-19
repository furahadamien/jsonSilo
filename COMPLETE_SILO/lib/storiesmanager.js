/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */


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
  insert(story, callback){
    this.database.insert(story,function(err, newDoc){
      if(err) {
        return callback(400);
      } 
      else{
        return callback(200, {stories: newDoc});
      }
    });
  }

  retrieve(id, cb){
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