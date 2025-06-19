const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(__dirname));

// Endpoint-decimal to binary
app.post('/convert-to-binary', (req, res) => {
    const decimal = req.body.decimal;
    if (typeof decimal !== 'number') {
        return res.status(400).json({ error: 'Invalid input, please provide a decimal number.' });
    }
    const binary = (decimal >>> 0).toString(2);
    res.json({ binary });
});

const math = require('mathjs');

// Endpoint-binary to decimal
app.post('/convert-to-decimal', (req, res) => {
    const binary = req.body.binary;
    if (typeof binary !== 'string' || !/^[01]+$/.test(binary)) {
        return res.status(400).json({ error: 'Invalid input, please provide a binary number.' });
    }
    const decimal = parseInt(binary, 2);
    res.json({ decimal });
});

// Endpoint- scientific calculator 
app.post('/calculate', (req, res) => {
    const { expression } = req.body;
    try {

        const result = math.evaluate(expression);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid expression' });
    }
});

app.post('/binary-add', (req, res) => {
    const { binary1, binary2 } = req.body;
    if (typeof binary1 !== 'string' || !/^[01]+$/.test(binary1) || typeof binary2 !== 'string' || !/^[01]+$/.test(binary2)) {
        return res.status(400).json({ error: 'Invalid input, please provide valid binary numbers.' });
    }
    const sum = (parseInt(binary1, 2) + parseInt(binary2, 2)).toString(2);
    res.json({ result: sum });
});

app.post('/binary-subtract', (req, res) => {
    const { binary1, binary2 } = req.body;
    if (typeof binary1 !== 'string' || !/^[01]+$/.test(binary1) || typeof binary2 !== 'string' || !/^[01]+$/.test(binary2)) {
        return res.status(400).json({ error: 'Invalid input, please provide valid binary numbers.' });
    }
    const diff = parseInt(binary1, 2) - parseInt(binary2, 2);
    if (diff < 0) {
        return res.status(400).json({ error: 'Result is negative. Binary calculator supports only non-negative results.' });
    }
    res.json({ result: diff.toString(2) });
});

app.post('/binary-multiply', (req, res) => {
    const { binary1, binary2 } = req.body;
    if (typeof binary1 !== 'string' || !/^[01]+$/.test(binary1) || typeof binary2 !== 'string' || !/^[01]+$/.test(binary2)) {
        return res.status(400).json({ error: 'Invalid input, please provide valid binary numbers.' });
    }
    const product = (parseInt(binary1, 2) * parseInt(binary2, 2)).toString(2);
    res.json({ result: product });
});

app.post('/binary-divide', (req, res) => {
    const { binary1, binary2 } = req.body;
    if (typeof binary1 !== 'string' || !/^[01]+$/.test(binary1) || typeof binary2 !== 'string' || !/^[01]+$/.test(binary2)) {
        return res.status(400).json({ error: 'Invalid input, please provide valid binary numbers.' });
    }
    const divisor = parseInt(binary2, 2);
    if (divisor === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
    }
    const dividend = parseInt(binary1, 2);
    const quotient = Math.floor(dividend / divisor);
    res.json({ result: quotient.toString(2) });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
