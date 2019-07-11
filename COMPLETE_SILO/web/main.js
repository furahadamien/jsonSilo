/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */

 //DOM elements
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

// data sent to the sever
let story = {"FullName" : '',
    "imageUrl" : ""}; 

/**
 * Uploads an image to the file system
 * @param {callback} callback Function to call upon completion
 */
function addImage(callback){
  let myFile = document.getElementById('myFile').files[0];
  let Data = new FormData(form);
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("POST","/images", true);
  httpRequest.onload = function(oevent){
    if(httpRequest.status == 200){
      let response = (httpRequest.responseText);
      picture.src = `/images/${response}`
      //update the DOM
      textImage.textContent = 'your picture is now available at:'
      imageUrl.textContent = window.location.href + `images/${response}`;
      linkImage.href = window.location.href + `images/${response}`;
      story.imageUrl = window.location.href + `images/${response}`;
      story.FullName = queryBox.value;
      story = JSON.stringify(story);
      ans = response;
      error.textContent = '';
      callback();
    }else if(httpRequest.status == 204){
      error.textContent = 'wrong file format';
    }else if(httpRequest.status == 422){
      error.textContent = 'We could not detect any file';
    }
    else{
      textImage.textContent = 'something went wrong while uploading image';
    } 
  };
  httpRequest.send(Data);   
} 

/**
 * Obtains story and sends it to the database
 */
function addStory(){ 
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        story = JSON.stringify(story);
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
  httpRequest.send(story);
}

function log(event){
  name.textContent = queryBox.value;
}

function publishStory(){
  addImage(addStory);
}
window.addEventListener("keyup", log);
queryButton.addEventListener('click',publishStory);