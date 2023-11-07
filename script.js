const buttons = document.querySelectorAll(".btn")
const buttonsOperators = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const deleteButton = document.querySelector(".delete")

let firstNumber = undefined;
let secondNumber = undefined;
let operator = undefined;
let finalAnswer = undefined;
let legacyOperator = undefined;

let atFirstNumber = true;
let screenExtraShow = false;
let operationComplete = false;

buttons.forEach(button => {
    button.addEventListener("click", () => inputNumber(button.textContent));
});

buttonsOperators.forEach(buttonOperator => {
    buttonOperator.addEventListener("click", () => 
    inputOperator(buttonOperator.textContent));
});

clearButton.addEventListener("click", clearAll);

deleteButton.addEventListener("click", deleteNumber);

function deleteNumber() {
    const screenBottom = document.querySelector(".screen-bottom")
    if (screenBottom.textContent.length > 0) {
        screenBottom.textContent = screenBottom.textContent.slice(0, -1);
    };
}

function clearAll() {
    const screenBottom = document.querySelector(".screen-bottom")
    const screenExtra = document.querySelector(".screen-extra")
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    finalAnswer = undefined;
    legacyOperator = undefined;

    atFirstNumber = true;
    screenExtraShow = false;
    operationComplete = false;
    screenBottom.textContent = "0";
    screenExtra.textContent = "0";
    screenExtra.style.opacity = 0;
}

function inputNumber(number) {
    const screenBottom = document.querySelector(".screen-bottom")
    const screenExtra = document.querySelector(".screen-extra")
    if (screenExtraShow === true) {
        screenExtra.style.opacity = 0;
        screenBottom.style.opacity = 0;
        screenBottom.textContent = "0";
        screenExtraShow = false
    }
    if (operationComplete === true) {
        operationComplete = false
        firstNumber = finalAnswer;
        finalAnswer = undefined;
        secondNumber = undefined;
    }
    if (screenBottom.textContent === "0" && number !== "." && screenExtraShow === false) {
        screenBottom.style.opacity = 1;
        screenBottom.textContent = number;
    } else if (screenBottom.textContent.includes(".") && number === ".") {
        
    } else {
        screenBottom.textContent += number
    }
}

function inputOperator(operand) {
    const screenBottom = document.querySelector(".screen-bottom")
    const screenExtra = document.querySelector(".screen-extra")
    const lastCharacter = screenBottom.textContent.charAt(screenBottom.textContent.length - 1)
    operators = ["÷", "×", "+", "-", "="]
    if (operand === "=" && atFirstNumber === true)
        return

    if (atFirstNumber === true && operationComplete === false && operand !== "=") {
        firstNumber = screenBottom.textContent;
        screenExtra.textContent = `${firstNumber} ${operand}`;
        screenExtra.style.opacity = 1;
        screenExtraShow = true;
        atFirstNumber = false;
    } else if (operationComplete === true && operand !== "=") {
        operationComplete = false
        firstNumber = finalAnswer;
        finalAnswer = undefined;
        secondNumber = undefined;
        screenExtra.textContent = `${firstNumber} ${operand}`;
        screenExtra.style.opacity = 1;
        screenExtraShow = true;
        atFirstNumber = false;
    } else if (atFirstNumber === false) {
        if (operationComplete === true && operand === "=") {
            secondNumber = screenBottom.textContent
            screenExtra.textContent += ` ${legacyOperator} ${secondNumber}`;
            screenExtra.style.opacity = 1;
            screenExtraShow = true;
            operationComplete = true;
            equalsOperation(Number(firstNumber), Number(secondNumber), legacyOperator)
        } else {
            secondNumber = screenBottom.textContent
            screenExtra.textContent += ` ${secondNumber}`;
            screenExtra.style.opacity = 1;
            screenExtraShow = true;
            let equation = screenExtra.textContent.split(" ");
            let finalOperand = equation[equation.length -2]
            operationComplete = true;
            equalsOperation(Number(firstNumber), Number(secondNumber), finalOperand)
    }}
};

function equalsOperation(a, b, operand) {
    const screenBottom = document.querySelector(".screen-bottom")
    const screenExtra = document.querySelector(".screen-extra")
    if (operand === "÷") {
        screenBottom.textContent = divide(a, b)
    } else if (operand === "×") {
        screenBottom.textContent = multiply(a, b)
    } else if (operand === "-") {
        screenBottom.textContent = subtract(a,b)
    } else if (operand === "+") {
        screenBottom.textContent = add(a, b)
    }
    finalAnswer = screenBottom.textContent
    legacyOperator = operand
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function divide(a, b) {
    return a / b
}

function multiply(a, b) {
    return a * b
}