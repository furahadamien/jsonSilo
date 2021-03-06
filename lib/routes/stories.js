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
  .post(function(req, res){
    //console.log(req.body);
    addStory(req, res);
  });

router.route('/:id')
  .get(function(req, res) {
    
  retrieveStory(req, res);
  //console.log(res);
  });

  function retrieveStory(req, res){
    
    switch(req.accepts(['json','html'])){
      case 'html':
      //console.log('req.params.id', req.body);
        
        res.sendFile(path.resolve(__dirname + '/../../web/jsonsilo/stories/index.html'));
        break;
        default:
          let id = req.params.id;
          let stories = req.jsonsilo.stories;
          stories.retrieve(id, function(data, status){
          console.log(data);
          response = responseHandler.prepareResponse(req, status, data);
          res.status(status).json(response); 
          console.log(response);
          });
          break;
    }
    
  }

  function addStory(req, res){
    console.log(req.body);
    let story = req.body;
    let stories = req.jsonsilo.stories;

    stories.insert(story, function(status, data){
      let response = responseHandler.prepareResponse(req, status, data);
      res.status(status).json(response);
    });
   
  }


module.exports = router;
