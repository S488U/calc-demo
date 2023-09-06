document.addEventListener('DOMContentLoaded', () => {
    let currentInput = '';
    let currentOperator = '';
    let firstOperand = '';

    const resultDisplay = document.getElementById('result');
    const digitButtons = document.querySelectorAll('.digit-btn');
    const operatorButtons = document.querySelectorAll('.operator-btn');
    const equalsButton = document.getElementById('btnEquals');
    const clearButton = document.querySelector('#btnClear');

    function appendValue(value) {
        currentInput += value;
        resultDisplay.value = currentInput;
    }

    function setOperator(operator) {
        if (currentInput !== '') {
            currentOperator = operator;
            firstOperand = currentInput;
            currentInput = '';
        }
    }

    function calculate() {
        if (currentInput !== '' && firstOperand !== '') {
            let result = 0;
            switch (currentOperator) {
                case '+':
                    result = parseFloat(firstOperand) + parseFloat(currentInput);
                    break;
                case '-':
                    result = parseFloat(firstOperand) - parseFloat(currentInput);
                    break;
                case '*':
                    result = parseFloat(firstOperand) * parseFloat(currentInput);
                    break;
                case '/':
                    result = parseFloat(firstOperand) / parseFloat(currentInput);
                    break;
            }
            resultDisplay.value = result;
            currentInput = result.toString();
            firstOperand = '';
            currentOperator = '';
        }
    }

    function clearAll() {
        currentInput = '';
        firstOperand = '';
        currentOperator = '';
        resultDisplay.value = '';
    }

    // Event listeners for digit buttons (0-9)
    for (let i = 0; i < 10; i++) {
        digitButtons[i].addEventListener('click', (event) => {
            appendValue(event.target.textContent);
        });
    }

    // Event listeners for operator buttons (+, -, *, /)
    operatorButtons.forEach((operatorBtn) => {
        operatorBtn.addEventListener('click', () => {
            setOperator(operatorBtn.textContent);
        });
    });

    equalsButton.addEventListener('click', () => {
        calculate();
    });

    clearButton.addEventListener('click', () => {
        clearAll();
    });

    // Event listener for keyboard input
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (/[0-9]/.test(key)) {
            appendValue(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            setOperator(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            clearAll();
        }
    });

});