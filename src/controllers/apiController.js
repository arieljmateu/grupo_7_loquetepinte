const db = require('../database/models');
require('dotenv').config();

const URL = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;


module.exports = {
    userList:  (req, res ) => {
        const limit = parseInt(req.query.limit) || null;
        const offset  = parseInt(req.query.offset) || 0;

        db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email'],
            offset: offset,
            limit: limit,
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
                if (user) {
                    user['avatar'] = `${URL}/images/users/${user.avatar}`;
                    res.json(user)    
                } else {
                    res.status(404).json({error: "User not found"});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errors: err});
            })
    },
    productList: (req, res ) => {
        const limit = parseInt(req.query.limit) || null;
        const offset  = parseInt(req.query.offset) || 0;

        db.Product.findAll({
            attributes: ['id', 'name', 'description'],
            include: [
                {model: db.Category, as: 'category', attributes: ['name']}
            ],
            offset: offset,
            limit: limit,
                raw: true // we only want dataValues
        })
            .then(products => {
                let countByCategory = {}
                products.forEach((product, idx) => {
                    if (!countByCategory[product['category.name']]){
                        countByCategory[product['category.name']]=1;
                    } else {
                        countByCategory[product['category.name']]++;
                    } //creates an object with the categories and amounts of products in them

                    delete products[idx]['category.name'];
                });

                res.json({
                    count: products.length,
                    countByCategory,
                    products: products.map(product => (
                        {
                            ...product,
                            dbRelations: ['color_id', 'size_id', 'category_id', 'discount_id'],
                            detail: `${URL}/api/products/${product.id}`
                        })),
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errors: err});
            })
    },
    productDetails: (req, res) => {
        db.Product.findByPk(req.params.id , {
            attributes: ['id', 'name', 'description', 'price', 'image', 'color_id', 'size_id', 'category_id', 'discount_id'],
            include: [
                {model: db.Category, as: 'category'},
                {model: db.Color, as: 'color'},
                {model: db.Size, as: 'size'},
                {model: db.Discount, as: 'discount'}
            ],
            raw: true // we only want dataValues
        })
            .then(product => {
                product.image = `${URL}/images/products/${product.image}`;
                res.json({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    color: product['color.name'],
                    color_id: product.color_id,
                    size: product['size.name'],
                    size_id: product.size_id,
                    category: product['category.name'],
                    category_id: product.category_id,
                    discount: product['discount.discount_percent']
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errors: err});
            })
    },
}