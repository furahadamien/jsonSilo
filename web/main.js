
let queryBox = document.querySelector('#queryBox');
let queryButton = document.querySelector('#queryButton');
let jsonResponse = document.querySelector('#jsonResponse');
let url = document.querySelector('#url');
const TEST_JSON =  {"name": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": "NONE"
  }
}};
function addStory() {
 // let url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/stories/id';
  let httpRequest = new XMLHttpRequest();
  //console.log('called', (queryBox.value));
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        // let response = JSON.parse(httpRequest.responseText);
        let response = (httpRequest.responseText);
        jsonResponse.textContent = response;
        //url.textContent = response.meta.message.href;
        console.log(response);
        
      }
    }
  };
  
  httpRequest.open('POST', 'http://localhost:3000/stories');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  //console.log(JSON.parse(queryBox.value));
  httpRequest.send(queryBox.value);
}
queryButton.addEventListener('click', addStory);
