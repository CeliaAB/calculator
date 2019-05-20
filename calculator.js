document.addEventListener('DOMContentLoaded', startCalculator)

// set the totals to zero
var entries = [];
var total = 0;
firstOperand = 0;
secondOperand = 0;

//set temp workspaces
var temp = '';
var product = '';
var operator = '';
var tempEntries = [];
var poppedEntries = [];

//set the display
let display = document.getElementById("workings");

//notes: Need to sort out if +- or -+ is clicked, in that order
//notes: I need a place to store the product if say ** or ÷÷ is clicked maybe "err" for the second?
//notes: I need a place to store the product if C is clicked to show what is currently solution
//notes: I need to display product if = is clicked to show what is currently solution
//notes: Need to change sign if +/- is clicked
//notes: Need to make sure 2 decimals are not clicked maybe "err" for the second?
//notes: maybe keep a copy of the display so that when C is clicked its not appended to the display string
//need to deal with if there's a product in the display already when an operator is keyed

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
        if (checkIfNum == NaN && getValue === "%" || getValue === "*" || getValue === "/" || getValue === "=" || getValue === "C") {
        display.value = "ERROR";
        return;
        } else {

            //everytime a valid entry is hit, it is added to an operand until an operator is encounterd. "C" "=" require a different process
            if (checkIfNum !== NaN && operator == null) {
                
                //add input to firstOperand
                temp += getValue;
                display.value = temp;
                tempEntries.push(temp);
            
            } else {
                if (checkIfNum !== NaN && operator !== null) {
                
                    //add input to secondOperand
                    temp += getValue;
                    display.value = temp;
                    tempEntries.push(temp);
                }

                //if "C" is entered then get rid of the last entry
                if (getValue == "C") {
                    poppedEntries = tempEntries.pop();
                    temp = tempEntries[tempEntries.length - 1];
                    display.value = temp;
                
                } else 
                    
                //set firstOperand if an operator is encountered other than "="
                if (checkIfNum === NaN && operator == null && getValue !== "=") { 
                    firstOperand += temp;
                    operator += getValue;
                } else 
                    if (checkIfNum === NaN && operator == null && getValue === "=") {
                        display.value = "ERROR";
                        temp = '';
                        return;
                    }
                
                //set secondOperand if an operator including "=" is encountered
                if (checkIfNum === NaN && operator !== null) {            
                    secondOperand+= temp;

                    //check if "=" has been entered. If it has, get total and clear fields.
                    //If its another operator, reset the equation and use total as first Operand
                    if (getValue !== "C" && getValue === "+" ||getValue === "-" ||getValue === "%" || getValue === "*" || getValue === "/" || getValue === "=") {
                        if (operator === "+") {
                            product = firstOperand += secondOperand;
                        }
                        else if (operator === "-") {
                            product = firstOperand -= secondOperand;
                        }
                        else if (operator === "*") {
                            product = firstOperand *= secondOperand;
                        }
                        else if (operator === "/") {
                            product = firstOperand /= secondOperand;
                        }
                        else if (operator === "%") {
                            product = firstOperand %= secondOperand;
                        }
                        total = product;
                        display.value = total;
                        secondOperand = 0;
                        tempEntries = [];
                        poppedEntries = [];

                        if (getValue === "=") {
                            firstOperand = 0;
                            operator = '';
                            temp = '';

                        } else {
                            //since operator is not an equal but the next operation we need to reset firstOperand
                            
                            firstOperand = product;
                            operator += getValue;
                            temp = product;
                            product = '';
                        }
                    }
                }
            }
        }
    }
}
