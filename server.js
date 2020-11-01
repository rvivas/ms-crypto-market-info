const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


//All routes
app.use(require('./src/paths/paths-config'));


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
