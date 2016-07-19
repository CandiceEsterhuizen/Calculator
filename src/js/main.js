function tempFunction(event){
    console.log('Input was clicked: '+event.target.getAttribute('placeholder'));
}

window.onload = function() {

/*function singleInvestments (interestRate, period, initialInvestment) {
      var interestRate = document.getElementById("interest-rate").value;
        var period = document.getElementById("period").value;
        var initialInvestment = document.getElementById("init-investment").value;
        console.log("interestRate " + interestRate + " period " + period + " initialInvestment " + initialInvestment);*/

    
    console.log('Hello World!');
    
    var investInput = document.getElementById("investment");
    
    
    investInput.addEventListener("click", tempFunction);
};

