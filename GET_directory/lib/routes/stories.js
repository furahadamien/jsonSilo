/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */

const express = require('express');
const path = require('path');
const responseHandler = require('./responsehandler');
const StoriesManager = require('../storiesmanager');

let router = express.Router();
let response = '';

router.route('/:id')
  .get(function(req, res) { 
  retrieveStory(req, res);
  });

  function retrieveStory(req, res){
    switch(req.accepts(['json','html'])){
      case 'html':
      console.log('html', req.params.id);
        res.sendFile(path.resolve(__dirname + '/../../web/fstories/index.html'));
        break;
        default:
        console.log('json', req.body);
          let id = req.params.id;
          let stories = req.jsonsilo.stories;
          console.log((stories));
          stories.retrieve(id, function(data, status){ 
          console.log('req.params.id', req.params.id);
          response = responseHandler.prepareResponse(req, status, data);
          //console.log('req.params.id', req.params.id);
          res.status(status).json(response); 
          });
          break;
    }
  }
module.exports = router;
