const express = require ('express');
const { isAdmin }  = require('../middlewares/authMiddleware');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/users/', /*isAdmin,*/ apiController.userList);
router.get('/users/:id', /*isAdmin,*/ apiController.userDetails);
router.get('/products/', /*isAdmin,*/ apiController.productList);
router.get('/products/:id', /*isAdmin,*/ apiController.productDetails);

module.exports = router;