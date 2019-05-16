document.addEventListener('DOMContentLoaded', startCalculator)

// set the total to zero and creates an array called entries
var entries = [];
var total = 0;

//set a temp workspace
var temp = '';

// take a number entry (operand), store it, so need to determine if input is a number (NaN)
$("button").on('click', function() {

// set var val to the number thats entered
    var val = $(this).text();
// test whether its a number (does sequence of input matter - i.e. if "." is b4 or after #)
    if (!isNaN(val) || val === '.') {
        temp += val;
        $("#answer").val(temp.substring(0,10));

// take an operator, store it (maybe into a string?)
// take the last part of the equation (could be a operand or an operator), store it (maybe into a string?)
// when the next entry is received, work out the product of the first 3 entries
// if the fourth entry is an =, display the product and replace the product in the string (like the first entry)
// if the fourth entry is + - * /, add to string and repeat until all clear is pressed
// if c is pressed, clear the last entry

// Push number
//} else {
    entries.push(temp);
    entries.push(val);
    temp = '';
    }
})

