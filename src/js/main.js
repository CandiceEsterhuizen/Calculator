(function () {
    
    function Calculator() {
        this.$inputs = {
            interestRate: document.getElementById('interest-rate'), 
            investment: document.getElementById('investment')
        },
        this.$outputs = {
           // interestRate : 
        }
        this.chart = {
                tag: document.getElementById('chart')
                , object: ''
        }, 
        this._model = {
            interestRate : 0,
            investment : 0,
            periods : [20, 60],
            derived: {
                interestRate: function(){
                    return (this._model.interestRate / 100) + 1;
                }.bind(this),
                investment: function(){
                    //return Math.round(this._model.investment * this._model.derived.interestRate());
                }.bind(this),
            },
            
        }
        
    }
    
    Calculator.prototype.bindUIEvents = function () {
        var that = this;
        Object.keys(this.$inputs).forEach(function (key) {
            if (that.$inputs[key].value.trim() !== '') {
                classie.add(that.$inputs[key].parentNode, 'input--filled');
            }
            that.$inputs[key].addEventListener('focus', onInputFocus);
            that.$inputs[key].addEventListener('blur', onInputBlur);
            that.$inputs[key].addEventListener('input', function(){onInputChange(key)});
        })
    }
    
    Calculator.prototype.updateOutputs = function () {
        var that = this;
        Object.keys(this._model.derived).forEach(function (key) {
            for(var i=0; i<that._model.periods.length; i++){
                that.chart.object.data.datasets[i].data = compoundInterest(that._model.periods[i], that._model.derived.interestRate(), that._model.investment);
            }
            that.chart.object.update();
        })
    }

    function compoundInterest(period, interestRate, investment){
        //console.log("Calculation initial: "+period+" "+interestRate+" "+investment);
        var steps = period / 5;
        var output = new Array(5);
        
        for(var i = 0; i <= 5; i++){
            var temp = steps * i;
            output[i] = Math.round(Math.pow(interestRate, temp) * investment);
        }
        
        var goal = Math.round((Math.pow(interestRate, period) * investment));
        //console.log("Calculation: "+output+"      Goal: "+goal);
        return output;
    }
    
    function onInputFocus(evt) {
        classie.add(evt.target.parentNode, 'input--filled');
    }

    function onInputBlur(evt) {
        
        if (evt.target.value.trim() === '') {
            classie.remove(evt.target.parentNode, 'input--filled');
        }
    }

    function onInputChange(key) {
        
        var element =  myCalculator.$inputs[key];
        var value = parseFloat(element.value);
        var max = element.getAttribute('max');
        var min = element.getAttribute('min');
        
        if(value > max)
            value = max;
        else if(value < min)
            value = min;
        
        myCalculator._model[key] = value;
        //console.log("** "+key+" "+value);
        
        myCalculator.updateOutputs();
    }

    function setupChart(element) {
        var myChart = new Chart(element, {
            type: 'line', 
            data: {
                labels: ["0", "12 months", "24 months", "36 months", "48 months", "60 months"], 
                datasets: [{
                    label: 'Monthly', 
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'], 
                    borderColor: ['rgba(255,99,132,1)'], 
                    borderWidth: 1
                },
                {
                    label: 'Semesterly',
                    data: [0, 0, 0, 0, 0, 0], 
                    backgroundColor: ['rgba(0, 99, 132, 0.2)'],
                    borderColor: ['rgba(0,99,132,1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        return myChart;
    }
    
    var myCalculator = new Calculator();
    myCalculator.bindUIEvents();
    myCalculator.chart.object = setupChart(myCalculator.chart.tag);
    
    //console.log("Chart: "+myCalculator.chart.object.data.datasets[0]);
    //myCalculator.chart.object.data.datasets[0].data = [0, 1, 2, 3, 4];
    //myCalculator.chart.object.update();
    //compoundInterest(60, 1.1, 100);
})();