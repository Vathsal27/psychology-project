const express = require('express');
const router = express.Router();
const path = require('path');
const { modelOutput } = require('../controller/geminiModel');

router.post('/result', modelOutput);

router.get('/', (req, res) => {
    const filePath = path.join(__dirname + '/..' + '/public/form.html');
    return res.sendFile(filePath);
});

module.exports = router;