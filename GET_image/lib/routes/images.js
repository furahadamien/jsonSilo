/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */

const express = require('express');
const path = require('path');

let router = express.Router();

router.route('/:id')
  .get(function(req, res) {
   retrieveImage(req, res)
  });
router.route('/')
  .get(function(req, res){
    res.sendFile(path.resolve(__dirname +'/../../web/fimages/index.html'));
  })
function retrieveImage(req, res){
  res.sendFile(path.resolve(__dirname + `/../../images/${req.params.id}`));
}
module.exports = router;
