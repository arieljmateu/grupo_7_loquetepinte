const express = require ('express');
const router = express.Router()

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/cart', mainController.cart);

router.get('/test', mainController.test);

module.exports = router;