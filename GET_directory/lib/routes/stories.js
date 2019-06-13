/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */

const express = require('express');
const path = require('path');
const responseHandler = require('./responsehandler');

let router = express.Router();
let response = '';
router.route('/')
  .get(function(req, res) {
  retrieveStory(req, res);
  });

  function retrieveStory(req, res){
    switch(req.accepts(['json','html'])){
      case 'html':
        res.sendFile(path.resolve(__dirname + '/../../web/stories/index.html'));
        break;
        default:
          let id = req.params.id;
          let stories = req.jsonsilo.stories;
          stories.retrieve(id, function(data, status){
          response = responseHandler.prepareResponse(req, status, data);
          res.status(status).json(response); 
          });
          break;
    }
    
  }
module.exports = router;
