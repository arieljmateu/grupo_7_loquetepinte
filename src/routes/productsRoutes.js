const express = require ('express');
const router = express.Router()


const productsController = require('../controllers/productsController');

router.get('/products', productsController.products);

router.get('/create-product', productsController.createProduct);




module.exports = router;