var getImage = document.querySelector("#picture").files[0];
var xhr = new XMLHttpRequest(); 
xhr.open("POST", "/Core/AJAX/DoPostStatus.php");
xhr.setRequestHeader("Content-Type", "image/png");
xhr.onload = function (oEvent) { 
    // Uploaded.
};
xhr.send(getImage);