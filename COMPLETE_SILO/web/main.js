let queryBox = document.querySelector('#personName');
let queryButton = document.querySelector('#queryButton');
let jsonResponse = document.querySelector('#jsonResponse');
let url = document.querySelector('#url');
let name = document.querySelector('#name');
let picture = document.querySelector('#picture');
let storyUrl = document.querySelector('#storyUrl');
let link = document.querySelector('#hyperlink');
let text = document.querySelector('#text');
const TEST_JSON =  {"name": {
  "type": "file",
  "value": "File",
  "popup": {
    "menuitem": "NONE"
  }
}};

function addStory(){
  
  var dictstring = '';
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){

    var dict = {"FullName" : queryBox.value };
    dict = JSON.stringify(dict);
    dictstring = JSON.parse(dict);
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        let response = (httpRequest.responseText);
        responseParsed = JSON.parse((response));
        jsonResponse.textContent = (JSON.stringify(responseParsed, null,2));
        console.log(JSON.stringify(responseParsed, null, 2));
        url.textContent = responseParsed._links.self.href + '/' + responseParsed.stories._id;
       text.textContent = 'your story is now available at:'
        storyUrl.textContent = url.textContent ;
        link.href = url.textContent;
      }
    }
  };

  httpRequest.open('POST', 'http://localhost:3000/stories');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send(JSON.stringify(dictstring));
}
function log(event){
  name.textContent = queryBox.value;
}
window.addEventListener("textInput", log);
queryButton.addEventListener('click', addStory);