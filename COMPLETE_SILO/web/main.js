/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */

let form = document.querySelector('#myForm');
let queryBox = document.querySelector('#personName');
let queryButton = document.querySelector('#queryButton');
let jsonResponse = document.querySelector('#jsonResponse');
let url = document.querySelector('#url');
let name = document.querySelector('#name');
let picture = document.querySelector('#picture');
let storyUrl = document.querySelector('#storyUrl');
let link = document.querySelector('#hyperlink');
let text = document.querySelector('#text');
let linkImage = document.querySelector('#hyperlinkImage');
let textImage = document.querySelector('#textImage');
let imageUrl = document.querySelector('#imageUrl');
let error = document.querySelector('#error');

let dictstring = '';
let dict = {"FullName" : '',
    "imageUrl" : ""};

function addImage(callback){
  let myFile = document.getElementById('myFile').files[0];
  let Data = new FormData(form);
  let Req = new XMLHttpRequest();
  let ans = '';
  Req.open("POST","/images", true);
  Req.onload = function(oevent){
    if(Req.status == 200){
      let response = (Req.responseText);
      picture.src = `/photos/${response}`
      textImage.textContent = 'your picture is now available at:'
      imageUrl.textContent = window.location.href + `images/${response}`;
      linkImage.href = window.location.href + `images/${response}`;
      dict.imageUrl = window.location.href + `images/${response}`;
      dict.FullName = queryBox.value;
      dict = JSON.stringify(dict);
      dictstring = JSON.parse(dict); 
      ans = response;
      error.textContent = '';
      callback(ans);
    }else if(Req.status == 204){
      error.textContent = 'wrong file format';
    }else if(Req.status == 422){
      error.textContent = 'We could not detect any file';
    }
    else{
      textImage.textContent = 'something went wrong while uploading image';
    } 
  };
  Req.send(Data);   
} 
function addStory(ans){ 
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        dict = JSON.stringify(dict);
        dictstring = JSON.parse(dict);
        let response = (httpRequest.responseText);
        responseParsed = JSON.parse((response));
        jsonResponse.textContent = (JSON.stringify(responseParsed, null,2));
        url.textContent = responseParsed._links.self.href + '/' + responseParsed.stories._id;
        text.textContent = 'your story is now available at:'
        storyUrl.textContent = url.textContent ;
        link.href = url.textContent;
      }
    }
  };
  httpRequest.open('POST', '/stories');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send(JSON.stringify(dictstring));
}
function log(event){
  name.textContent = queryBox.value;
}

function publishStory(){
  addImage(addStory);
}
window.addEventListener("keyup", log);
queryButton.addEventListener('click',publishStory);