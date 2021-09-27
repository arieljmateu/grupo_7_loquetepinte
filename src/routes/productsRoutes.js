const express = require ('express');
const router = express.Router()
const multer = require('multer');

const productsController = require('../controllers/productsController');

router.get('/products', productsController.products);

router.get('/create-product', productsController.createProduct);

router.post('/create-product', productsController.addProduct);

router.get('/products-list', productsController.productsList);



module.exports = router;