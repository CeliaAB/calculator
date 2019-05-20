// take an operand or operator, store it 
// if "=" is entered, display the product and replace the product in the working area - not sure if this should be kept for next calc
// if C is pressed, clear the last entry

document.addEventListener('DOMContentLoaded', startCalculator)

// set the total to zero and creates an array called entries
var entries = [];
var total = 0;

//set a temp workspace
var temp = '';
var lastEntry = '';

//set the display
let display = document.getElementById("workings");

//notes: Need to sort out if +- is clicked, in that order
//notes: I need a place to store the product if say ** or ÷÷ is clicked maybe "err" for the second?
//notes: I need a place to store the product if C is clicked to show what is currently solution
//notes: I need to display product if = is clicked to show what is currently solution
//notes: I need a decide what to show and logic if % is clicked
//notes: Need to change sign if +/- is clicked
//notes: Need to make sure 2 decimals are not clicked maybe "err" for the second?
//notes: maybe keep a copy of the display so that when C is clicked its not appended to the display string

function startCalculator () {
    document.addEventListener('click', keyedInput);
}

//get the input and check if its an operand or an operator
function keyedInput () {
    document.addEventListener('click', workings)
    var inputButton = event.target;
    var getValue = inputButton.value;

    //test if the input is a number by using built in Number()
    var checkIfNum = Number(getValue);

    //if the input is a number or a decimal add to temp
    if (checkIfNum != NaN || getValue === ".") {
        temp += getValue;
        display.value = temp;
        entries.push(temp);
    } 

    //if everytime a valid entry is hit, temp is pushed to entries, then getting rid
    //of the last entry if "C" is hit means the correct string is now the last entry
    
    //call a function to delete the last entry when "C" is hit (AC has been cleared in html)
    if (getValue === "C") {
            entries.pop();
            temp = entries[entries.length - 1];
            display.value = temp;
    }

    //if the input is an "=" get the product by working through entries
    if (getValue === "=") {
        //the arithmetic is to start with the first operand, then use operator with the next and so on    
        //as there are number entries and operators, need to test for each
        var lastEntry = entries[entries.length -1];
        var product = Number(entries[0]);
        for (var i = 1; i < entries.length; i ++) {
            var nextNum = Number(entries[i+1]);
            var operator = entries[i];

            //work through the array, in order because calculators aren't honouring operator priority
            if (operator === "+") {
                product += nextNum;
            }
            else if (operator === "-") {
                product -= nextNum;
            }
            else if (operator === "*") {
                product *= nextNum;
            }
            else if (operator === "/") {
                product /= nextNum;
            }
            else if (operator === "%") {
                product %= nextNum;
            }
        }
        display.value = product;
        //reset work area
        //entries = [];
        //temp = '';
    }
}
