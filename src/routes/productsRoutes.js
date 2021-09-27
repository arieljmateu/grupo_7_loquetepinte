const express = require ('express');
const router = express.Router()
const multer = require('multer');

const productsController = require('../controllers/productsController');

router.get('/', productsController.index);

router.get('/create', productsController.create);

router.post('/create', productsController.add);

router.get('/:id', productsController.detail);



module.exports = router;