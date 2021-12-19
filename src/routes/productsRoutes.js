const express = require ('express');
const router = express.Router();
const multer = require('multer');
const {body} = require ('express-validator');
const { isAdmin }  = require('../middlewares/authMiddleware');

const MAX_FILE_SIZE = 20971520; // in bytes

//Validations
const validateAdd = [
    body('name').notEmpty().withMessage('El campo nombre debe ser completado').bail()
    .isLength({min:5, max: undefined}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description').notEmpty().withMessage('El campo descripcion debe ser completado').bail()
    .isLength({min:20, max: undefined}).withMessage('La descripcion debe tener al menos 20 caracteres'),
    body('category_id').notEmpty().withMessage('El campo categoria debe ser completado'),
    body('price').notEmpty().withMessage('El campo precio debe ser completado'),
    body(image).custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if(!file) {
            throw new Error ('Debe subirse una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
            throw new Error ('Las extensiones validas son .jpg, .jpeg, .png o .gif')
        }}
        return true;
    })
];

const validateEditProduct = [

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

router.post('/create', isAdmin, uploads.single('image'), validateAdd, productsController.add);

router.get('/:id', productsController.detail);

router.get('/edit/:id', isAdmin, productsController.edit);

router.put('/edit/:id', isAdmin, uploads.single('image'), validateEditProduct, productsController.editProduct);

router.delete('/delete/:id', isAdmin, productsController.delete);



module.exports = router;