const express = require('express');
const config = require('./config');
const path = require('path')
const app = express();


// set view engine
app.set('views', path.join (__dirname , 'views'));
app.set('view engine', 'ejs');


// public folder
app.use(express.static('public'));


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// routers
const mainRoutes     = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes    = require('./routes/usersRoutes');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);


// init server
const server = app.listen(config.app.port, config.app.host , () => {
    console.log(`Running on http://${config.app.host}:${config.app.port}`);
}).on('error', (e) => {
   console.error(e.message);
});
