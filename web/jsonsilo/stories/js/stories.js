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

// Initialisation: GET the stories and display in DOM
getStories(window.location.href, function(status, response) {
  jsonResponse.textContent = JSON.stringify(response, null, 2);
  url.textContent = stories.url;
  name.textContent = personName.value; //stories.name ;
 console.log(personName.value);
  picture.textContent = stories.picture
});



function getStories(url, callback) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      return callback(httpRequest.status, JSON.parse(httpRequest.responseText));
    }
  };
  httpRequest.open('GET', url);
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send();
}

function addStory() {
  let url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/stories/id';
  let httpRequest = new XMLHttpRequest();
  console.log('called');

  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        let response = JSON.parse(httpRequest.responseText);
      }
    }
  };
  httpRequest.open('POST', 'http://localhost:3000/stories/1');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send(JSON.stringify(queryBox.value));
}
queryButton.addEventListener('click', addStory);