/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


// DOM elements
let jsonResponse = document.querySelector('#jsonResponse');
let identifier = document.querySelector('#identifier');
let url = document.querySelector('#url');
let name = document.querySelector('#name');
let picture = document.querySelector('#picture');
let queryBox = document.querySelector('#queryBox');
let queryButton = document.querySelector('#queryButton');
const TEST_JSON =  {"name": {
  "type": "file",
  "value": "File",
  "popup": {
    "menuitem": "NONE"
  }
}};
// Initialisation: GET the stories and display in DOM
getStories(window.location.href, function(status, response) {
  jsonResponse.textContent = JSON.stringify(response, null, 2);
  //url.textContent = stories.url;
  //name.textContent = personName.value; 
 //console.log(response);
  //picture.textContent = stories.picture
});

function getStories(url, callback) {
  
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      return callback(httpRequest.status, TEST_JSON);
    }
  };
  httpRequest.open('GET', url);
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send();
}
