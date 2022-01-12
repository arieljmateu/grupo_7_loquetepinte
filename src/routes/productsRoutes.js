const express = require ('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {body} = require ('express-validator');
const { isAdmin }  = require('../middlewares/authMiddleware');
const db = require('../database/models');

const MAX_FILE_SIZE = 20971520; // in bytes

//Validations
const validations = [
    body('name')
        .notEmpty().withMessage('El campo nombre debe ser completado').bail()
        .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty().withMessage('El campo descripcion debe ser completado').bail()
        .isLength({min: 20}).withMessage('La descripcion debe tener al menos 20 caracteres'),
    body('price')
        .notEmpty().withMessage('El campo precio debe ser completado'),
    body('image')
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            
            if (!file) {
                throw new Error ('Debe subirse una imagen')
            } else {
                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones validas son .jpg, .jpeg, .png o .gif')
            }}
            return true;
        }),
    body('category_id')
        .notEmpty().withMessage('El campo categoria debe ser completado').bail(),
];


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

router.post('/create', isAdmin, uploads.single('image'), validations, productsController.add);

router.get('/edit/:id', isAdmin, productsController.edit);

router.put('/edit/:id', isAdmin, uploads.single('image'), validations, productsController.editProduct);

router.delete('/delete/:id', isAdmin, productsController.delete);

router.get('/category/:id', productsController.category);

router.get('/:id', productsController.detail);



module.exports = router;