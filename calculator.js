//eeech I want to append NOT add
document.getElementById("workings").classList.add("calculator_screen");
document.addEventListener('DOMContentLoaded', startCalculator);

// set the totals to zero
var total = 0;
var entries = [];
var firstOperand = '';
var secondOperand = '';
var operator = '';

//set temp workspaces
var temp = '';
var numTemp ='';
var product = '';
var tempEntries = [];
var poppedEntries = [];

//set the display
let display = document.getElementById("workings");

//notes: Need to sort out if +- or -+ is clicked, in that order
//notes: Need to change sign if +/- is clicked

function startCalculator () {
    document.addEventListener('click', keyedInput);
}

//get the input and check if its an operand or an operator
function keyedInput () {
    var inputButton = event.target;
    var getValue = inputButton.value;

    //test if the input is a number by using built in Number()
    var checkIfNum = Number(getValue);

    //check for valid first entry, which are numbers or "+" or "-" or "."
    //"%" "*" "/" "=" are not acceptable and return "Error"
    //take into account the product from the prior answer is a valid starting point
    if (temp == null) {
        if (checkIfNum === NaN && getValue === "%" || getValue === "*" || getValue === "/" || getValue === "=" || getValue === "C") {
        display.value = "ERROR";
        return;
        }
    } 
    
    //everytime a valid entry is hit, it is added to an operand until an operator is encounterd. "C" "=" require a different process
    if (operator === null && checkIfNum !== NaN || operator === null && getValue === ".") {

        //if there is value in the product already from a previous calculation
        //need to reset to '' if new number or "." is keyed
        if (firstOperand !==null) {
            temp = '';
            firstOperand = '';
        }
        
        //add input to firstOperand
        temp += getValue;
        numTemp += getValue;
        display.value = temp;
        entries.push(temp);
        tempEntries.push(numTemp);
        firstOperand = numTemp;

    } else {
        if (operator !== null && checkIfNum !== NaN || operator !== null && getValue === ".") {
        
            //add input to secondOperand
            temp += getValue;
            numTemp += getValue;
            display.value = temp;
            entries.push(temp);
            tempEntries.push(numTemp);
            secondOperand = numTemp;
        }
    }

    //if "C" is entered, reset everything if firstOperand or get rid of the last entry for secondOperand
    if (checkIfNum === NaN && getValue == "C") {
        if (operator == null) {
            window.location.reload();
        } else {
            if (operator !== null) {
                temp = firstOperand += operator;
                entries.push(temp);
                display.value = temp;
                secondOperand = '';
            }
        }
    }
            
    //set operator, check for exponentiation "**"
    if (checkIfNum === NaN && operator == null && getValue !== "=") {
        operator += getValue;
        temp += getValue;
        entries.push(temp);
        display.value = temp;
    }

    if (checkIfNum === NaN && operator == "*" && getValue === "*" && secondOperand == '') {
        operator += getValue;
        temp += getValue;
        entries.push(temp);
        display.value = temp;
    } 
        
    //get total if "=" or another operator is encountered. 
    if (getValue !== "C" && getValue === "+" || getValue === "-" || getValue === "%" || getValue === "*" || getValue === "/" || getValue === "=") {
        if (operator === "+") {
            product = firstOperand += secondOperand;
        } else if (operator === "-") {
            product = firstOperand -= secondOperand;
            }
        else if (operator === "*") {
            product = firstOperand *= secondOperand;
            }
        else if (operator === "**") {
            product = firstOperand *= firstOperand;
            }
        else if (operator === "/") {
            product = firstOperand /= secondOperand;
            }
        else if (operator === "%") {
            product = firstOperand %= secondOperand;
            }
        
        //display product
        total = product;
        display.value = total;

        //reset firstOperand with product
        firstOperand = product;

        //If the new operator is not "=", reset the equation and use total as first Operand
        if (getValue !== "=") {

            //reset operator
            operator = getValue;

            //reset temp with firstOperand and operator
            temp = firstOperand += operator;

            //clear all other fields
            entries = [];
            secondOperand = '';
            numTemp ='';
            product = '';
            tempEntries = [];
            poppedEntries = [];
        
        } else {
            //If the new operator is "=", clear fields other than the total to be used again unless C is pressed.
            if (getValue === "=") {

            //reset temp with firstOperand
            temp = firstOperand;

            //clear all other fields
            entries = [];
            secondOperand = '';
            operator = '';
            numTemp ='';
            product = '';
            tempEntries = [];
            poppedEntries = [];
            }
        }
    }
}
