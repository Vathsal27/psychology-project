const express = require('express');
const router = express.Router();
const { modelOutput } = require('../controller/geminiModel');

router.get('/', modelOutput);

module.exports = router;