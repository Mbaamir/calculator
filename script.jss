console.log(add(3,4));


function add(x,y) {return x+y}
function subtract(x,y) {return x-y}
function multiply(x,y) {return x*y}
function divide(x,y) {return x/y}

function operate (x,y,mathOperation){
    switch(mathOperation){
        case 'add':
            add(x,y);
            break;

        case 'subtract':
            subtract(x,y);
            break;

        case 'multiply':
            multiply(x,y);
            break;

        case 'divide':
            divide(x,y);
            break;

        default:
            alert("ERROR");
    }
}

    //  const number7= document.querySelector('.numberButtons[value=7]')
     //   const number8= document.querySelector('.numberButtons[value=8]')
      //  const number9= document.querySelector('.numberButtons[value=9]')
        // const number4= document.querySelector('.numberButtons[value=4]')
        // const number5= document.querySelector('.numberButtons[value=5]')
        // c onst number6= document.querySelector('.numberButtons[value=6]')
        // const number1= document.querySelector('.numberButtons[value=1]')
        // const number2= document.querySelector('.numberButtons[value=2]')
        // const number3= document.querySelector('.numberButtons[value=3]')
        // const number0= document.querySelector('.numberButtons[value=0]')