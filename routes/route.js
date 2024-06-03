const express = require('express');
const router = express.Router();
const path = require('path');
const { modelOutput } = require('../controller/geminiModel');

router.post('/gemini', modelOutput);

router.get('/form', (req, res) => {
    const filePath = path.join(__dirname + '/..' + '/public/form.html');
    return res.sendFile(filePath);
});

module.exports = router;