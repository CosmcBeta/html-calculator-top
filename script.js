function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function substract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    console.log("ran");
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case "÷":
            result = divide(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "-":
            result = substract(num1, num2);
            break;
        case "+":
            result = add(num1, num2);
            break;
        default:
            result = "ERROR";
            break;
    }
    return result;
}

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let isFirst = true;
let reset = false;

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

function whichOper(oper) {
    if (oper === "C") {
        display.textContent = "";
        firstNum = "";
        secondNum = "";
        operator = "";
        result = "";
        isFirst = true;
    } else if (oper === "=") {
        result = operate(operator, firstNum, secondNum);
        reset = true;
    } else if (oper === ".") {
        if (isFirst) {
            if (!firstNum.includes('.')) {
                firstNum += ".";
            }
        } else {
            if (!secondNum.includes('.')) {
                secondNum += ".";
            }
        }
    } else if (oper === '±') {
        if (isFirst) {
            firstNum = (firstNum.includes("-")) ? firstNum.slice(1) : "-" + firstNum;
        } else {
            secondNum = (secondNum.includes("-")) ? secondNum.slice(1) : "-" + secondNum;
        }
    } else if (oper === '⌫') {
        if (isFirst) {
            firstNum = firstNum.slice(0, -1);
        } else {
            secondNum = secondNum.slice(0, -1);
        }
    } else {
        if (firstNum && secondNum) {
            firstNum = operate(operator, firstNum, secondNum);
            secondNum = "";
            operator = "";
        }
        operator = oper;
        isFirst = false;
    }
}

const values = [
  "⌫", "C", "C", "÷",
  "7", "8", "9", "x",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "±", "0", ".", "="
];

values.forEach(val => {
    const button = document.createElement("button");
    button.classList.add("btn");

    button.textContent = val;

    if (isNaN(val)) {
        button.classList.add("oper");
        button.addEventListener("click", () => {
            whichOper(val);
            display.textContent = firstNum + " " + operator + " " + secondNum;
            if (result) {
                result = (result === Infinity) ? "ERROR" : result;
                display.textContent = firstNum + " " + operator + " " + secondNum + " = " + result;
            }
        })

    } else {
        button.classList.add("number");
        button.addEventListener("click", () => {
            if (result === "ERROR" || reset) {
                whichOper("C");
                reset = false;
            }
            if (isFirst) {
                firstNum += val;
            } else {
                secondNum += val;
            }
            display.textContent = firstNum + " " + operator + " " + secondNum;
        })

    }



    buttons.appendChild(button);
});