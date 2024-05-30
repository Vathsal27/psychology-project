require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const model = require('./routes/route');
const bodyParser = require('body-parser');

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', model);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
