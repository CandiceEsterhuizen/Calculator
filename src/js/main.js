window.onload = function() {
        
//        return singleInvestments();
    };
    
    
    
};
function singleInvestments (interestRate, period, initialInvestment) {
      var interestRate = document.getElementById("interest-rate").value;
        var period = document.getElementById("period").value;
        var initialInvestment = document.getElementById("init-investment").value;
        console.log("interestRate " + interestRate + " period " + period + " initialInvestment " + initialInvestment);