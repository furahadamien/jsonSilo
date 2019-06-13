/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */

const express = require('express');
const path = require('path');
const responseHandler = require('./responsehandler');

let router = express.Router();
router.route('/')
  .post(function(req, res){
    addStory(req, res);
  });

  function addStory(req, res){
    //console.log(req.body);
    let story = req.body;
    let stories = req.jsonsilo.stories;
    stories.insert(story, function(status, data){
      let response = responseHandler.prepareResponse(req, status, data);
      console.log(response);
      res.status(status).json(response);
    });
  }

module.exports = router;
