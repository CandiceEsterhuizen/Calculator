(function () {
    
    function Calculator() {
        this.$inputs = {
            menu: {
                
            },
            compoundInterest: {
                interestRate: document.getElementById('interest-rate'), 
                investment: document.getElementById('investment')
            }

        },
        this.$outputs = {
           // interestRate : 
        }
        this.chart = {
                tag: document.getElementById('chart')
                , object: ''
        }, 
        this._model = {
            compoundInterest:{
                interestRate : 0,
                investment : 0,
                periods : [5, 10, 20/*, 60*/],
                derived: {
                    interestRate: function(){
                        return (this._model.compoundInterest.interestRate / 100) + 1;
                    }.bind(this),
                    investment: function(){
                        //return Math.round(this._model.investment * this._model.derived.interestRate());
                    }.bind(this),
                },
            }
        };
        this.init();
    }
    
    Calculator.prototype.init = function() {
        console.log("Init");
        //document.getElementById('mainNav').style.display = "block";
    }
    
    Calculator.prototype.bindUIEvents = function () {
        var that = this;
        Object.keys(this.$inputs).forEach(function (keyMain) {
            
            Object.keys(that.$inputs[keyMain]).forEach(function (keySub) {
                
                //console.log("keyMain: "+keyMain+"  $inputs[keyMain]:"+that.$inputs[keyMain]+"  keySub:"+keySub+"  $inputs[keyMain][keySub]:"+that.$inputs[keyMain][keySub])
                
                if (that.$inputs[keyMain][keySub].value.trim() !== '') {
                    classie.add(that.$inputs[keyMain][keySub].parentNode, 'input--filled');
                }
                that.$inputs[keyMain][keySub].addEventListener('focus', onInputFocus);
                that.$inputs[keyMain][keySub].addEventListener('blur', onInputBlur);
                that.$inputs[keyMain][keySub].addEventListener('input', function(){onInputChange(keyMain, keySub)});
            })
        })
    }
    
    Calculator.prototype.updateOutputs = function (keyMain) {
        var that = this;
        //Object.keys(this._model[keyMain].derived).forEach(function (subKey) {
            
            for(var i=0; i<that._model[keyMain].periods.length; i++){
                console.log(that._model[keyMain].periods[i]+" "+that._model[keyMain].derived.interestRate()+" "+that._model[keyMain].investment);
                that.chart.object.data.datasets[i].data = compoundInterest(that._model[keyMain].periods[i], that._model[keyMain].derived.interestRate(), that._model[keyMain].investment);
            }
            that.chart.object.update();
            
            
            /*for(var i=0; i<that._model.periods.length; i++){
                that.chart.object.data.datasets[i].data = compoundInterest(that._model.periods[i], that._model.derived.interestRate(), that._model.investment);
            }
            that.chart.object.update();*/
        //})
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

    function onInputChange(main, sub) {
        
        var element =  myCalculator.$inputs[main][sub];
        var value = parseFloat(element.value);
        var max = element.getAttribute('max');
        var min = element.getAttribute('min');
        
        if(value > max)
            value = max;
        else if(value < min)
            value = min;
        
        myCalculator._model[main][sub] = value;
        
        myCalculator.updateOutputs(main);
    }

    function setupChart(element) {
        var myChart = new Chart(element, {
            type: 'line', 
            data: {
                labels: ["0", "12 months", "24 months", "36 months", "48 months", "60 months"], 
                datasets: [{
                    label: 'Yearly', 
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: ['rgba(119, 136, 153, 0.2)'],
                    borderColor: ['rgba(119, 136, 153, 1)'],
                    borderWidth: 1
                },
                {
                    label: 'Semesterly',
                    data: [0, 0, 0, 0, 0, 0], 
                    backgroundColor: ['rgba(128, 128, 128, 0.2)'],
                    borderColor: ['rgba(128, 128, 128, 1)'],
                    borderWidth: 1
                },
                {
                    label: 'Quaterly',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: ['rgba(192, 192, 192, 0.2)'], 
                    borderColor: ['rgba(192, 192, 192, 1)'], 
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
})();