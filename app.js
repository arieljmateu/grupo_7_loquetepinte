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
app.get('/login', (req, res) => {
    res.sendFile('views/login.html', {root: __dirname });
});
app.get('/register', (req, res) => {
    res.sendFile('views/register.html', {root: __dirname });
});
app.get('/producto', (req, res) => {
    res.sendFile('views/producto.html', {root: __dirname });
});
app.get('/cart', (req, res) => {
    res.sendFile('views/cart.html', {root: __dirname });
});
app.get('/test', (req, res) => {
    res.sendFile('views/test.html', {root: __dirname });
});