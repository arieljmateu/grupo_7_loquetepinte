const express = require ('express');
const router = express.Router()


const productsController = require('../controllers/productsController');

router.get('/product', productsController.product);




module.exports = router;