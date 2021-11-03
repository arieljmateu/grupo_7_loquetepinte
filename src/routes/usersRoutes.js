const express = require ('express');
const multer = require('multer');
const path = require('path')
const { body } = require('express-validator')

const router = express.Router()

const MAX_FILE_SIZE = 20971520; // in bytes

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users/');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

const uploads = multer({storage});

const usersController = require('../controllers/usersController');

let validations = [
    body('firstName').notEmpty().withMessage('Debes escribir un nombre'),
    body('lastName').notEmpty().withMessage('Debes escribir un apellido'),
    body('email')
        .notEmpty().withMessage('Debes escribir un email').bail()
        .isEmail().withMessage('Debes escribir una dirección de correo válida'),
    body('password').notEmpty().withMessage('Debes escribir una contraseña'),
    body('password2')
        .notEmpty().withMessage('Debes confirmar tu contraseña')
        .not().equals(body('password')).withMessage('Las contraseñas deben coincidir'),
    body('address').notEmpty().withMessage('Debes escribir una dirección'),
    body('image').custom((value, {req}) =>{
       let file = req.file;
       let acceptedExtensions = ['.jpg', '.png', '.gif'];
       if (!file) {
           throw new Error('Tienes que subir una imagen')
       } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error('Solo pueden subirse imágenes .jpg, .png o .gif')
        }
       }
       
       return true;
    })
]

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddelware');




router.get('/login', guestMiddleware, usersController.login);

router.post('/login', usersController.doLogin);

router.get('/register', guestMiddleware, usersController.register);

router.post('/register', uploads.single('image'), validations, usersController.registerNew);

router.get("/profile", authMiddleware, usersController.profile);

router.get('/logout', usersController.logout)




module.exports = router;