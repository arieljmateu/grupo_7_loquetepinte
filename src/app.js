const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const userLoggedMiddleware = require('../src/middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');

// load process variables from .env if not in production
// (in production they should be set as enviroment variables)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// set view engine
app.set('views', path.join (__dirname , 'views'));
app.set('view engine', 'ejs');


// public folder
app.use(express.static('public'));


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session( {
    secret: "Lo que nos pinte",
    resave: false,
    saveUninitialized: false
}))
app.use(cookies());
app.use(userLoggedMiddleware);


// routers
const mainRoutes     = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes    = require('./routes/usersRoutes');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);


// init server
const server = app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
}).on('error', (e) => {
   console.error(e.message);
});
