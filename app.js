const express = require('express');
const config = require('./config');

const app = express();

const server = app.listen(config.app.port, config.app.host , () => {
    console.log(`Running on http://${config.app.host}:${config.app.port}`);
}).on('error', (e) => {
   console.error(e.message);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('views/index.html', {root: __dirname });
});