
let queryBox = document.querySelector('#queryBox');
let queryButton = document.querySelector('#queryButton');

function addStory() {
 // let url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/stories/id';
  let httpRequest = new XMLHttpRequest();
  console.log('called twice', JSON.stringify(queryBox.value));

  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status == 200){
        let response = JSON.parse(httpRequest.responseText);
        //console.log(response);
      }
    }
  };
  httpRequest.open('POST', 'http://localhost:3000/stories');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.setRequestHeader('Accept', 'application/json');
  //httpRequest.send();
  console.log(JSON.stringify(queryBox.value));
  httpRequest.send(queryBox.value);
}
queryButton.addEventListener('click', addStory);
