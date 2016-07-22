
/*function singleInterestHalfYear(intRate, period, initValue, output) {
    var final = 0;
    var  ii = initValue.value;
    var p = period.value;
    var ir = intRate.value;
    display = output;

    ir = ir/100; 
    var temp = (1 + ir);
    final = ii * Math.pow(temp, p);
    final = final.toFixed(2);
    console.log("final "+final);

    // document.getElementById("half-future-value").innerHTML = "R" + final;
}

window.onload = function() {
    var interestRateFV = document.getElementById("interest-rate-fv");
    var periodFV = document.getElementById("period-fv");
    var initialInvestmentFV = document.getElementById("init-investment-fv");

    // var initialInvestmentIR = document.getElementById("init-investment-ir");
    // var periodIR = document.getElementById("period-ir");
    // var futureValueIR = document.getElementById("future-value-ir");

    // var interestRateII = document.getElementById("interest-rate-ii");
    // var periodII = document.getElementById("period-ii");
    // var futureValueII = document.getElementById("future-value-ii");

    var output = document.getElementById("output");
    var btnCalculate = document.getElementById("btn-calculate").addEventListener("click", function() {
        singleInterestHalfYear(interestRateFV, periodFV, initialInvestmentFV, output);
    });
}*/

(function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function() {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call( document.querySelectorAll( 'input' ) ).forEach( function( inputEl ) {
        // in case the input is already filled..
        if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
        }

        // events:
        inputEl.addEventListener( 'focus', onInputFocus );
        inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
        classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
        if( ev.target.value.trim() === '' ) {
            classie.remove( ev.target.parentNode, 'input--filled' );
        }
    }
})();