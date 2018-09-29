const OPERATIONS = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '/': (x, y) => x / y,
    '*': (x, y) => x * y,
    '%': (x, y) => x % y,
}

// Helper functions.
const isValueSymbol = value =>
    value === '+' || value === '-' || value === '/' || value === '*' || value === '%';
    
const getFormattedValue = value => isValueSymbol(value) ? ` ${value} ` : value;

const calculateOperation = (operation, x, y) => OPERATIONS[operation](x,y);

const calculateResult = inputValues => inputValues.reduce((acc, next, index) => (
    isValueSymbol(next)
        ? calculateOperation(next, acc, Number(inputValues[index + 1]))
        : acc 
), Number(inputValues[0]));

const formatToSixDecimals = result => Math.round(result*1000000)/1000000;

const isPrevZeroAndNewSymbol = (prev, next) => prev === '0' && isValueSymbol(next);
const isPrevAndNewSymbol = (prev, next) => isValueSymbol(prev) && isValueSymbol(next);

// Main code and event handling.
window.onload = () => {
    const userInput = document.getElementById('user-input');
    const valuesArray = [];

    const registerEntry = event => {
        const valuePressed = event.target.innerHTML;
        const lastValue = valuesArray[valuesArray.length - 1];
        if (
            isPrevZeroAndNewSymbol(userInput.innerText, valuePressed) ||
            (lastValue && isPrevAndNewSymbol(lastValue.trim(), valuePressed))
        ) {
            return;
        }
        valuesArray.push(getFormattedValue(valuePressed));
        userInput.innerText = valuesArray.join('');
    }

    const resetAll = () => {
        userInput.innerText = 0;
        valuesArray.length = 0;
    }

    const resetOne = () => {
        valuesArray.pop();
        if (!valuesArray.length) {
            userInput.innerText = 0;
            return;
        }
        userInput.innerText = valuesArray.join('');
    }

    const printAndClearResult = result => {
        const formattedResult = formatToSixDecimals(result);
        document.getElementById('user-input').innerHTML = formattedResult;
        valuesArray.length = 0;
        if (result) {
            valuesArray.push(formattedResult);
        }
    }

    const getResult = () => {
        if (valuesArray.length) {
            const separatedValuesArray = valuesArray.join('').split(' ');
            const result = calculateResult(separatedValuesArray);
            printAndClearResult(result);
        }
    }

    const initializeCalculator = () => {
        const buttonElements = document.getElementsByClassName('calc-button');
        for (let buttonElement of buttonElements) {
            buttonElement.addEventListener('click', registerEntry);
        }

        const equalButton = document.getElementById('equals');
        equalButton.addEventListener('click', getResult);

        const resetButton = document.getElementById('reset-all');
        resetButton.addEventListener('click', resetAll);

        const resetOneButton = document.getElementById('reset-one');
        resetOneButton.addEventListener('click', resetOne);
    }

    initializeCalculator();
};