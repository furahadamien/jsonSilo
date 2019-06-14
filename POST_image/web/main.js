
let queryBox = document.querySelector('#queryBox');
let queryButton = document.querySelector('#queryButton');
let jsonResponse = document.querySelector('#jsonResponse');
let url = document.querySelector('#url');
const TEST_JSON =  {"name": {
  "type": "file",
  "value": "File",
  "popup": {
    "menuitem": "NONE"
  }
}};
function addStory(){
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        let response = (httpRequest.responseText);
        jsonResponse.textContent = response;
       console.log(JSON.parse(JSON.stringify(response)));
      }
    }
  };
  httpRequest.open('POST', 'http://localhost:3000/stories');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send(queryBox.value);
}
queryButton.addEventListener('click', addStory);
