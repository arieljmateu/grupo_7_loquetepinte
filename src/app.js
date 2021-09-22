const express = require('express');
const config = require('./config');
const path = require('path')
const app = express();

const mainRoutes = require('./routes/mainRoutes');

const productsRoutes = require('./routes/productsRoutes');

const usersRoutes = require('./routes/usersRoutes');




const server = app.listen(config.app.port, config.app.host , () => {
    console.log(`Running on http://${config.app.host}:${config.app.port}`);
}).on('error', (e) => {
   console.error(e.message);
});



app.set('views', path.join (__dirname , 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join (__dirname,'../public')));

app.use('/', mainRoutes);

app.use('/products', productsRoutes);

app.use('/users', usersRoutes);

app.listen(3000, () => {
    console.log('Servidor levantado en el puerto 3000');
})