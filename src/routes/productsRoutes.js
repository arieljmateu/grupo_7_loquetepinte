const express = require ('express');
const router = express.Router();
const multer = require('multer');
const { isAdmin }  = require('../middlewares/authMiddleware');

const MAX_FILE_SIZE = 20971520; // in bytes

//Configuration for Multer
const uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images/products/");
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
        },
        limits: {
            fileSize: MAX_FILE_SIZE
        }
    })
});


const productsController = require('../controllers/productsController');

router.get('/', productsController.index);

router.get('/create', isAdmin, productsController.create);

router.post('/create', isAdmin, uploads.single('image'), productsController.add);

router.get('/:id', productsController.detail);

router.get('/edit/:id', isAdmin, productsController.edit);

router.put('/edit/:id', isAdmin, uploads.single('image'), productsController.editProduct);

router.delete('/delete/:id', isAdmin, productsController.delete);



module.exports = router;