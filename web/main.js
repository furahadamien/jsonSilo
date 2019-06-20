
let form = document.querySelector('#myform');
let myButton = document.querySelector('#myButton');

myButton.addEventListener('click', function(ev){
  var myFile = document.getElementById('myFile').files[0];
  var oData = new FormData(form);
  var oReq = new XMLHttpRequest();

  oReq.open("POST","http://localhost:3000/stories", true);
  oReq.onload = function(oevent){
    if(oReq.status == 200){
      console.log('done');
    }else{
      console.log('not done');
    }
  };
  oReq.send(oData);
  ev.preventDefault()

}, false);