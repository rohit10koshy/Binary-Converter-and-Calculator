async function convertToBinary() {
    const decimalInput = document.getElementById('decimalInput').value;
    if (isNaN(decimalInput) || decimalInput < 0) {
        document.getElementById('result').innerText = 'Enter valid positive decimal number.';
        return;
    }
    const response = await fetch('/convert-to-binary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decimal: Number(decimalInput) }),
    });
    const data = await response.json();
    document.getElementById('result').innerText = 'Binary: ' + data.binary;
}

async function convertToDecimal() {
    const binaryInput = document.getElementById('binaryInput').value;
    if (!/^[01]+$/.test(binaryInput)) {
        document.getElementById('result').innerText = 'Enter valid binary number.';
        return;
    }
    const response = await fetch('/convert-to-decimal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ binary: binaryInput }),
    });
    const data = await response.json();
    document.getElementById('result').innerText = 'Decimal: ' + data.decimal;
}

async function calculateExpression() {
    const expression = document.getElementById('calcDisplay').innerText;
    if (!expression.trim()) {
        document.getElementById('calcResult').innerText = 'Enter An expression.';
        return;
    }
    const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
    });
    const data = await response.json();
    if (data.result !== undefined) {
        document.getElementById('calcResult').innerText = 'Result: ' + data.result;
    } else {
        document.getElementById('calcResult').innerText = 'Error: ' + (data.error || 'Invalid expression');
    }
}

function appendCalc(value) {
    const display = document.getElementById('calcDisplay');
    display.innerText += value;
    document.getElementById('calcResult').innerText = '';
}

function clearCalc() {
    document.getElementById('calcDisplay').innerText = '';
    document.getElementById('calcResult').innerText = '';
}

function showSection(section) {
    const converter = document.getElementById('converter');
    const calculator = document.getElementById('calculator');
    const binaryCalculator = document.getElementById('binaryCalculator');
    const btnConverter = document.getElementById('btnConverter');
    const btnCalculator = document.getElementById('btnCalculator');
    const btnBinaryCalc = document.getElementById('btnBinaryCalc');

    if (section === 'converter') {
        converter.style.display = 'block';
        calculator.style.display = 'none';
        binaryCalculator.style.display = 'none';
        btnConverter.disabled = true;
        btnCalculator.disabled = false;
        btnBinaryCalc.disabled = false;
    } else if (section === 'calculator') {
        converter.style.display = 'none';
        calculator.style.display = 'block';
        binaryCalculator.style.display = 'none';
        btnConverter.disabled = false;
        btnCalculator.disabled = true;
        btnBinaryCalc.disabled = false;
    } else if (section === 'binaryCalculator') {
        converter.style.display = 'none';
        calculator.style.display = 'none';
        binaryCalculator.style.display = 'block';
        btnConverter.disabled = false;
        btnCalculator.disabled = false;
        btnBinaryCalc.disabled = true;
    }
}

async function binaryCalculate(operation) {
    const bin1 = document.getElementById('binaryInput1').value.trim();
    const bin2 = document.getElementById('binaryInput2').value.trim();
    const resultDiv = document.getElementById('binaryCalcResult');

    // Validate binary inputs
    if (!/^[01]+$/.test(bin1)) {
        resultDiv.innerText = 'Enter a valid first binary number.';
        return;
    }
    if (!/^[01]+$/.test(bin2)) {
        resultDiv.innerText = 'Enter a valid second binary number.';
        return;
    }

    try {
        const response = await fetch(`/binary-${operation}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ binary1: bin1, binary2: bin2 }),
        });
        const data = await response.json();
        if (response.ok) {
            resultDiv.innerText = 'Result: ' + data.result;
        } else {
            resultDiv.innerText = 'Error: ' + (data.error || '❌');
        }
    } catch (error) {
        resultDiv.innerText = 'Error: ' + error.message;
    }
}

function clearBinaryCalc() {
    document.getElementById('binaryInput1').value = '';
    document.getElementById('binaryInput2').value = '';
    document.getElementById('binaryCalcResult').innerText = '';
}

// Initialize with converter visible and button disabled
document.addEventListener('DOMContentLoaded', () => {
    showSection('converter');
});
