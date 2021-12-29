const inputSc = document.querySelector('.input');

const outputSc = document.querySelector('.output');

let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        commandCenter(e.target.textContent);
    });
});


window.addEventListener("keydown", keyPressed);

function keyPressed(e) {
    switch (e.key) {
        case 'Escape':
            commandCenter('C');
            break;
        case '=':
        case 'Enter':
            commandCenter('=');
            break;
        case 'Backspace':
            commandCenter('⌫');
            break;
        case '.':
            commandCenter('.');
            break;
        case '-':
            commandCenter('-');
            break;
        case '/':
        case '+':
            commandCenter(e.key);
            break;
        case '*':
            commandCenter("x");
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            commandCenter(e.key);
            break;
    }
}

function commandCenter(e) {
    switch(e){
        case 'C':
            clearScreen();
            break;
        case '=':
            try{
                operate();
                inputSc.textContent = '';
            } catch {
                inputSc.textContent = "Error";
            }
            break;
        case '⌫':
            deleteCharacter();
            break;
        case '.':
            addDot(e);
            break;
        case '-':
            addMinus(e);
            break;
        case '/':
        case 'x':
        case '+':
            addOperation(e);
            break;
        default:
            addNumber(e);
    }
    if (inputSc.textContent.match(/^(\-)*[0-9]+\s[\+\-\/x]\s(\-)*[0-9]+$/)) {
        operate();
    } else if (inputSc.textContent.match(/^(\-)*[0-9]+\s[\+\-\/x]\s(\-)*[0-9]+\s[\+\-\/x]$/)) {
        let resolve = inputSc.textContent.split(" ");
        inputSc.textContent = outputSc.textContent + " " + resolve.pop();
    }
}

function clearScreen() {
    inputSc.textContent = '';
    outputSc.textContent = '';
}

function addDot(eText) {
    const dotRelated = inputSc.textContent.split(" ").pop();

    if (dotRelated.match(/[.]/)) {
        return;
    }
    if (dotRelated === "" ||
        inputSc.textContent.match(/\d\s[\+x\/\-]\s\-$/)) {
        inputSc.textContent += "0" + eText; 
    } else if (inputSc.textContent === "Error") {
        inputSc.textContent = "";
        inputSc.textContent += "0" + eText;
    } else if (dotRelated && dotRelated.match(/^[\+\-\/x]$/)) {
        inputSc.textContent += " 0" + eText;
    } else {
        inputSc.textContent += eText;
    }
}

function addMinus(eText) {
    const dotRelated = inputSc.textContent.split(" ").pop();

    if (inputSc.textContent === "Error" || (inputSc.textContent === "" && outputSc.textContent === "")) {
        inputSc.textContent = "-";
    } else if (inputSc.textContent === "" && 
               outputSc.textContent.match(/[0-9]/)) {
        inputSc.textContent += outputSc.textContent + " " +  eText;
        outputSc.textContent = '';
    } else if (dotRelated[dotRelated.length-1] === "."){
        inputSc.textContent = inputSc.textContent.slice(0,-1) + " " + eText;
    } else if (inputSc.textContent.match(/(\d\s)*[\+x\/\-]\s\-$/) ||
               inputSc.textContent === "-") {
        return;
    } else {
        inputSc.textContent += " " + eText;
    }
}

function addOperation(eText) {
    const dotRelated = inputSc.textContent.split(" ").pop();
    const lastLetterIsOperation = inputSc.textContent.slice(-1).match(/[\+\-\/x]/);

    if (inputSc.textContent === "Error" || 
        (inputSc.textContent === "" && outputSc.textContent === "") ||
        inputSc.textContent.match(/[\+x\/]\s\-$/) ||
        inputSc.textContent.match(/^\-$/)) {
        return;
    }  else if (inputSc.textContent.length === 0 && 
                outputSc.textContent.match(/[0-9]/)) {
        inputSc.textContent += outputSc.textContent + " " +  eText;
        outputSc.textContent = '';
    } else if (dotRelated[dotRelated.length-1] === "."){
        inputSc.textContent = inputSc.textContent.slice(0,-1) + " " + eText;
    } else if (lastLetterIsOperation) {
        inputSc.textContent = inputSc.textContent.slice(0,-1) + eText;
    } else {
        inputSc.textContent += " " + eText;
    }
}

function addNumber(eText) {
    const nrLength = inputSc.textContent.split(" ");
    if (inputSc.textContent !== "Error" && nrLength.length === 1 && nrLength[0].replace("-", "").length > 0 && 
        nrLength[0].match(/\d+/g).join("").length === 13) {
        return;
    } else if (inputSc.textContent !== "Error" && nrLength.length === 3 && nrLength[2].replace("-", "").length > 0 &&
               nrLength[2].match(/\d+/g).join("").length === 13) {
        return;
    }
    const dotRelated = inputSc.textContent.split(" ").pop();
    
    if (inputSc.textContent === "Error") {
        inputSc.textContent = eText;
    } else if (inputSc.textContent.length === 0 && 
                outputSc.textContent.match(/[0-9]/) &&
                eText.match(/[0-9]/)) {
        inputSc.textContent +=  eText;
        outputSc.textContent = '';
    } else if (inputSc.textContent.match(/\d\s[\+\-\/x]$/)) {
        inputSc.textContent += " " +  eText;
    } else if (dotRelated === "0") {
        inputSc.textContent = inputSc.textContent.slice(0,-1) + eText;
    }
     else {
        inputSc.textContent += eText;
    }
}

function deleteCharacter() {
    if (inputSc.textContent === "Error") {
        return;
    }
    if (inputSc.textContent === "" && outputSc.textContent.length > 0) {
        outputSc.textContent = "";
    }
    if (inputSc.textContent.slice(-2,-1) === " "){
        inputSc.textContent = inputSc.textContent.slice(0, -2);
    } else {
        inputSc.textContent = inputSc.textContent.slice(0, -1);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function parseThis(str) {
    if (str.match(/[.]/)) {
        return parseFloat(str);
    } else {
        return parseInt(str);
    }
}

function operate() {
    const calcArgs = inputSc.textContent.split(" ");
    let firstArg = parseThis(calcArgs[0]);
    let secondArg = parseThis(calcArgs[2]);
    switch (calcArgs[1]) {
        case '+':
            outputSc.textContent = add(firstArg, secondArg);
            break;
        case '-':
            outputSc.textContent = subtract(firstArg, secondArg);
            break;
        case 'x':
            outputSc.textContent = multiply(firstArg, secondArg);
            break;
        case '/':
            if (secondArg === 0) {
                outputSc.textContent = "infinity";    
            } else {
                outputSc.textContent = divide(firstArg, secondArg);
            }
            break;
    }
}