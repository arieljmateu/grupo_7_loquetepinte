const express = require ('express');
const router = express.Router()
const multer = require('multer');

const MAX_FILE_SIZE = 20971520; // in bytes

const uploads = multer({
    dest: 'public/images/users/',
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

const usersController = require('../controllers/usersController');


router.get('/login', usersController.login);

router.post('/login', usersController.doLogin);

router.get('/register', usersController.register);

router.post('/register', uploads.single('image'), usersController.registerNew);




module.exports = router;