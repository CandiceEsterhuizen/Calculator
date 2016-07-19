function tempFunction(event){
    console.log('Input was clicked: '+event.target.getAttribute('placeholder'));
}

window.onload = function() {
    
    console.log('Hello World!');
    
    var investInput = document.getElementById("investment");
    
    
    investInput.addEventListener("click", tempFunction);
};