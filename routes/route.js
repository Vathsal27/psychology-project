const express = require('express');
const router = express.Router();
const path = require('path');
const { modelOutput } = require('../controller/geminiModel');

router.post('/result', modelOutput);

router.get('/', (req, res) => {
    const filePath = path.join(__dirname + '/..' + '/public/extended.html');
    return res.sendFile(filePath);
});

router.get('/test', (req, res) => {
    const filePath = path.join(__dirname + '/..' + '/public/extended.html');
    return res.sendFile(filePath);
});

router.post('/test-result', (req, res) => {
    console.log({ data: req.body });
    return res.status(200).json({
        data: req.body
    });
});

module.exports = router;