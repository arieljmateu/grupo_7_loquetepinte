const express = require ('express');
const router = express.Router()


const productsController = require('../controllers/productsController');

router.get('/products', productsController.products);

router.get('/create-product', productsController.createProduct);

router.post('/create-product', productsController.addProduct);




module.exports = router;