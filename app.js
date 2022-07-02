// The Game variables

const inputEl = document.getElementById("input-el");
const checkBtn = document.getElementById("check-btn");

const maxOperandAddition = 100
const maxOperandSubstraction = 100
const maxOperandMultiplication = 100
const maxOperandDivision = 100

var correctAnswerCount = 0;   

const timerDuration = 69;

function startTimer(timerDuration) {
    setInterval(function () {
        var timeElapsed = 0;
        document.getElementById("timer").innerHTML = timerDuration-timeElapsed;
        timeElapsed++;
    }, 1000);
}

// dark mode toggle
function dark() {
    var backgrd = document.body;
    backgrd.classList.toggle("light-body");
    var element = document.getElementById("math-games");
    element.classList.toggle("light-mode");
    if (document.getElementById("dark-mode").innerHTML == "Dark Mode") {
        document.getElementById("dark-mode").innerHTML = "Light Mode";
    }
    else if (document.getElementById("dark-mode").innerHTML == "Light Mode") {
        document.getElementById("dark-mode").innerHTML = "Dark Mode";
    }
}

// function to show endgame page
function endgame() {
    document.getElementById("operand1").innerHTML = "Score:";
    document.getElementById("operator").innerHTML = correctAnswerCount;
    document.getElementById("check-btn").innerHTML = "Start";
    if (correctAnswerCount > 20) {
        document.getElementById("operand2").innerHTML = "Nice!";
    }
    else if (correctAnswerCount > 25) {
        document.getElementById("operand2").innerHTML = "Great!";
    }
    else if (correctAnswerCount > 30) {
        document.getElementById("operand2").innerHTML = "Excellent!";
    }
    else {
        document.getElementById("operand2").innerHTML = "";
    }
    correctAnswerCount = 0;
}

// functionality for Check/Enter button
function getInput() {
    if (document.getElementById("check-btn").innerHTML == "Submit") {
        let userInput = parseInt(inputEl.value);
        
        // get correct answer
        var realAns = 0
        const op1 = parseInt(document.getElementById("operand1").innerHTML);
        const op2 = parseInt(document.getElementById("operand2").innerHTML);
        const operator = document.getElementById("operator").innerHTML;
        if (operator == "+") {
            realAns = op1+op2;
        }
        else if (operator == "-") {
            realAns = op1-op2;
        }
        else if (operator == "x") {
            realAns = op1*op2;
        }
        else if (operator == "/") {
            realAns = op1/op2;
        }
        if (userInput==realAns) {
            correctAnswerCount++;
        } else {
            inputEl.value = '';
            inputEl.focus();
            return;
        }
    }
    else if (document.getElementById("check-btn").innerHTML == "Start") {
        // Start the timer
        var timeRemaining = timerDuration;
        var downloadTimer = setInterval(function () {
            if (timeRemaining > 0) {
            document.getElementById("timer").innerHTML = timeRemaining;
            timeRemaining--;
            }
            else {
                clearInterval(downloadTimer);
                document.getElementById("timer").innerHTML = "Done";
                endgame();
            }
        }, 1000);
        document.getElementById("check-btn").innerHTML = "Submit";
    }

    inputEl.value = '';
    inputEl.focus();
    generateQuestion();
}

// generate random int
function getRandomInt(max) {
    return Math.floor(Math.random()*max+1)
}

// find factors of n
function findDivisors(n)
{
    const factors = [] 
    // Note that this loop runs till square root
    for(let i = 1; i <= Math.sqrt(n); i++)
    {
        if (n % i == 0)
        {
            // If divisors are equal, print only one
            if (parseInt(n / i, 10) == i)
                {factors.push(i);}
                 
            // Otherwise print both
            else
            {
                factors.push(i);
                factors.push(parseInt(n / i, 10));
            }
        }
    }
    console.log(factors)
    return factors
}

// function to generate new question
function generateQuestion() {
    op = getRandomInt(3)
    console.log("operator is ",  op);
    if (op == 0) {
        document.getElementById("operand1").innerHTML = getRandomInt(maxOperandAddition);
        document.getElementById("operator").innerHTML = "+";
        document.getElementById("operand2").innerHTML = getRandomInt(maxOperandAddition);
    }

    else if (op == 1) {
        const temp = getRandomInt(maxOperandSubstraction);
        document.getElementById("operand1").innerHTML = temp;
        document.getElementById("operator").innerHTML = "-";
        document.getElementById("operand2").innerHTML = getRandomInt(temp);
    }
    
    else if (op == 2) {
        document.getElementById("operand1").innerHTML = getRandomInt(maxOperandMultiplication);
        document.getElementById("operator").innerHTML = "x";
        document.getElementById("operand2").innerHTML = getRandomInt(maxOperandMultiplication);
    }

    else if (op == 3) {
        const temp = getRandomInt(maxOperandDivision);
        const divisors = findDivisors(temp);
        document.getElementById("operand1").innerHTML = temp;
        document.getElementById("operator").innerHTML = "/";
        document.getElementById("operand2").innerHTML = divisors[getRandomInt(divisors.length-1)];
    }
}

// submit by clicking on submit or hitting enter
inputEl.onkeydown = function(event) {
    if (event.keyCode == 13) {
        getInput();
    }
}
checkBtn.addEventListener("click", getInput)