const db = require('../database/models');
require('dotenv').config();

const URL = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;


module.exports = {
    userList:  (req, res ) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email'],
            raw: true // we only want dataValues
        })
            .then(users => {                  
                res.json({
                    count: users.length,
                    users: users.map(user => ({...user, detail: `${URL}/api/users/${user.id}`}))
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errors: err});
            })
    },
    userDetails: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name', 'email', 'avatar'],
            raw: true // we only want dataValues
        })
            .then(user => {
                user.avatar = `${URL}/images/users/${user.avatar}`;
                res.json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errors: err});
            })
    },
    productList: (req, res ) => {
        res.json({ok: true});
    },
    productDetails: (req, res) => {
        db.Product.findByPk(req.params.id /*, {
            attributes: { exclude: ['color_id', 'category_id', 'description', 'price', 'image'] },
            raw: true // we only want dataValues
        }*/)
            .then(product => {
           //     product.image = `${URL}/images/products/${product.image}`;
                res.json({product})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errors: err});
            })
    },
}