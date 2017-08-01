let answer   = document.getElementById('answer');
let attempt  = document.getElementById('attempt');
let message  = document.getElementById('message');
let results  = document.getElementById('results');
let code     = document.getElementById('code');
let guessing = document.getElementById('guessing-div');
let replay   = document.getElementById('replay-div');

function guess() {
    let input = document.getElementById('user-guess');
    
    if (answer.value == "" || attempt.value == "") {
        setHiddenFields();
    }
    
    if (validateInput(input.value)) {
        attempt.value++;
    } else {
        return false;
    }

    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }

}

function setHiddenFields() {
    attempt.value = "0"; 
    answer.value = (Math.floor(Math.random() * 10000)).toString();
        
    while (answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }
     
}

function setMessage(string) {
    message.innerHTML = string; 
}

function validateInput(number) {
    if (number.length == 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(result) {
    let resultText          = document.createTextNode(result);
    let rowElement          = document.createElement("div");
    rowElement.className    = "row";
    let guessElement        = document.createElement("span");
    guessElement.className  = "col-md-6";
    guessElement.appendChild(resultText);
    let resultElement       = document.createElement("div");
    resultElement.className = "col-md-6";

    results.appendChild(rowElement);
    rowElement.appendChild(guessElement);
    rowElement.appendChild(resultElement);


    for (i = 0; i < result.length; i++) {
        let resultElementIcon = document.createElement("span");

        if(result.charAt(i) === answer.value.charAt(i)) {
            resultElementIcon.className = "glyphicon glyphicon-ok";
        } else if (answer.value.indexOf(result.charAt(i)) > -1) {
            resultElementIcon.className = "glyphicon glyphicon-transfer";
        } else {
            resultElementIcon.className = "glyphicon glyphicon-remove";
        }
        resultElement.appendChild(resultElementIcon);
    }

    if (result === answer.value) {
        return true;
    } 
    return false;

}

function showAnswer(isCorrect) {
    code.innerHTML = answer.value;
    if (isCorrect) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
}

function showReplay() {
    replay.style.display = "block";
    guessing.style.display = "none";
}