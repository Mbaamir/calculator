const displayTextBox= document.querySelector('.display');

            const numberBtnNodeList = document.querySelectorAll('.numberButtons');

            const operationNodeList= document.querySelectorAll('.operationButtons');

            const decimalBtn= document.querySelector('.decimalButton');

            const clearBtn = document.querySelector('.clearButton');

            const equalBtn = document.querySelector('.equalToButton');

            const backspaceBtn = document.querySelector('.backspaceButton');


            let latestNumber="";
            let previousNumber="";

            let calledOperationNew='';
            let calledOperationOld='';

            let iseqBtnResultStored=false;
            let isOperatorEntered=false;
            let isDecimalEntered=false;
            

                    
            operationNodeList.forEach( (opButton) =>{
                opButton.addEventListener('click', () => {
                    operatorButtonPress(opButton);
                }
                )
            })

            numberBtnNodeList.forEach((numberBtn) => {
                numberBtn.addEventListener('click',() => {
                    numberButtonPress(numberBtn);
                })
            })

            decimalBtn.addEventListener('click', decimalButtonPress);

            clearBtn.addEventListener('click',()=>{
                clearC();
            })

             equalBtn.addEventListener('click',()=>{
                 equalToPressed();
            })

            displayTextBox.addEventListener('transitionend', removeTransition);
            
            document.addEventListener('keydown',keyboardButtonPressed );
               
            backspaceBtn.addEventListener('click', backSpace);


             

            function keyboardButtonPressed(event){
               
                if(+event.key || (+event.key)===0) {
                numberButtonPress(false,event.key);
                }

                if((event.key == '+') || (event.key == '-') ||
                (event.key == '*')|| (event.key == '/')) {
                operatorButtonPress(false,event.key);
                }

                if (event.key=='Shift'){
                equalToPressed();
                }

                if (event.key=='\\'){
                    clearC();
                                }

                if (event.key=='Backspace'){
                    backSpace();
                }

                if (event.key=='.'){
                    decimalButtonPress();
                }

               }               
                
                
            function reduceLatestNumberLength() {
                    if ( isLatestNumberOver15()) {
                    latestNumber=(String(latestNumber)).slice(0,14);
                    console.log("splicing");
                                }
                            }

            function isLatestNumberOver15(){
                if(latestNumber){
                 if (String(latestNumber).length>14){
                    return true;
                    }
                }
                return false;
            }


            function removeTransition(e){
                if (e.propertyName!== 'box-shadow') return;
                displayTextBox.classList.remove('flashBox');
             }


            function numberButtonPress(numberBtn,keyboardValue) {
                  
            if (isLatestNumberOver15()) return;

                if(isOperatorEntered){
                    isOperatorEntered=false;
                }    
                
                if (iseqBtnResultStored) {
                        iseqBtnResultStored=false;
                        latestNumber='';
                    }
                    let theNumber='';
                    theNumber= numberBtn? numberBtn['value']:keyboardValue;

                    latestNumber += theNumber;
                    displayTextBox.textContent=latestNumber;
                }
            
            function decimalButtonPress(){

                if (isDecimalEntered) {
                    console.log(isDecimalEntered);
                    return;
                }
                if (isLatestNumberOver15()) return;
                if (iseqBtnResultStored) {
                        iseqBtnResultStored=false;
                        latestNumber='';
                }

                latestNumber += '.';
                displayTextBox.textContent=latestNumber;

                isDecimalEntered = true;
            }

            function operatorButtonPress(opButtonItem, keyBoardPress){
                if (isOperatorEntered) return;
                let theOperator='';
                theOperator= opButtonItem? opButtonItem['value']:keyBoardPress;

                calledOperationOld=calledOperationNew;
                calledOperationNew=theOperator;                

                if(!previousNumber){
                    updatesPrevNumber();
                    isDecimalEntered=false;
                    isOperatorEntered=true; 
                    return;
                }  
                    calculate();
                    isOperatorEntered=true;
            }


                              
            function clearC(){
                latestNumber='';
                previousNumber='';
                displayTextBox.textContent='0';
            }

            function backSpace(){
                console.log(latestNumber);
                latestNumber=latestNumber.slice(0,-1);
                displayTextBox.textContent=latestNumber;
            }

            function calculate() {
                latestNumber = operate(+previousNumber, +latestNumber, calledOperationOld);

                console.log("ISover15:"+isLatestNumberOver15());
                reduceLatestNumberLength();
                               
                displayTextBox.textContent=latestNumber;
                
                updatesPrevNumber();     
                }

            function updatesPrevNumber(){
               previousNumber=latestNumber;
               latestNumber="";
            }

            function equalToPressed() {
                if(latestNumber==='' || previousNumber=='') return;
                if(iseqBtnResultStored) return;

                latestNumber = operate(+previousNumber, +latestNumber, calledOperationNew);

                reduceLatestNumberLength();
                displayTextBox.textContent=latestNumber;

                previousNumber="";
                iseqBtnResultStored=true;
                flash();
                }

            function flash(){
                displayTextBox.classList.add('flashBox');
            }

    function add(x,y) {return x+y}
    function subtract(x,y) {return x-y}
    function multiply(x,y) {return x*y}
    function divide(x,y) {return x/y}

    function operate(x,y,mathOperation){
        
        let result='';
        isDecimalEntered=false; 
        

        switch(mathOperation){
            
            case 'add':
            case '+':
                return +add(x,y);
                break;

            case 'subtract':
            case '-':
                return +subtract(x,y);
                break;

            case 'multiply':
            case '*':
                return +multiply(x,y);
                break;

            case 'divide':
            case '/':
                if(+y==0){
                    alert('If you divide by 0 the universe will collapse');
                    return +divide(x,1);
                }
                return +divide(x,y);
                break;

            default:
                alert("ERROR");
        }
    }