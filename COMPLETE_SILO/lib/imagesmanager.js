/**
 * Copyright reelyActive 2014-2019
 * We believe in an open Internet of Things
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
let router = express.Router();

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
  }


}
module.exports = ImagesManager;