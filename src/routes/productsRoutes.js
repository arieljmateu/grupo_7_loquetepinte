const express = require ('express');
const router = express.Router()
const multer = require('multer');

const MAX_FILE_SIZE = 20971520; // in bytes

const uploads = multer({
    dest: 'public/images/products/',
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

const productsController = require('../controllers/productsController');

router.get('/', productsController.index);

router.get('/create', productsController.create);

router.post('/create', uploads.single('image'), productsController.add);

router.get('/:id', productsController.detail);

router.get('/edit/:id', productsController.edit);

router.put('/edit/:id', uploads.single('image'), productsController.editProduct);

router.delete('/delete/:id', productsController.delete);



module.exports = router;