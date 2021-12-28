const inputSc = document.querySelector('.input');

const outputSc = document.querySelector('.output');

let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.textContent){
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
                addDot(e.target.textContent);
                break;
            case '-':
                addMinus(e.target.textContent);
                break;
            case '/':
            case 'x':
            case '+':
                addOperation(e.target.textContent);
                break;
            default:
                addNumber(e.target.textContent);
        }
        if (inputSc.textContent.match(/^[0-9]+\s[\+\-\/x]\s[0-9]+$/)) {
            operate();
        } else if (inputSc.textContent.match(/^[0-9]+\s[\+\-\/x]\s[0-9]+\s[\+\-\/x]$/)) {
            console.log("test2");
            let resolve = inputSc.textContent.split(" ");
            inputSc.textContent = outputSc.textContent + " " + resolve.pop();
        }
    });
});

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

    if (inputSc.textContent === "Error" || inputSc.textContent === "") {
        inputSc.textContent = "-";
    } else if (inputSc.textContent.length === 0 && 
               outputSc.textContent.match(/[0-9]/)) {
        inputSc.textContent += outputSc.textContent + " " +  eText;
        outputSc.textContent = '';
    } else if (dotRelated[dotRelated.length-1] === "."){
        inputSc.textContent = inputSc.textContent.slice(0,-1) + " " + eText;
    } else if (inputSc.textContent.match(/\d\s[\+x\/\-]\s\-$/) ||
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
        inputSc.textContent.match(/[\+x\/]\s\-$/)) {
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