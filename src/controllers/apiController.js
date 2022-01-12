const db = require('../database/models');
require('dotenv').config();

const URL = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;


module.exports = {
    userList: async (req, res ) => {
        let page = parseInt(req.query.page) || null;
        let offset = null;
        let pagination = {};
        const limit = parseInt(req.query.limit) || 10;

        try {
            if (page) {
                const userCount = await db.User.count();
                const pagesCount = Math.ceil(userCount / limit);
                const endpoint = `${URL}${req.baseUrl}${req.path}`;

                page = Math.min(Math.max(page, 1), pagesCount);
                prevPage = page > 1 ? page - 1 : null;
                nextPage = page < pagesCount ? page + 1 : null;
                offset = (page - 1) * limit;
                pagination = {
                    first: `${endpoint}?page=1&limit=${limit}`,
                    prev: prevPage ? 
                        `${endpoint}?page=${prevPage}&limit=${limit}` :
                        null,
                    next: nextPage ? 
                        `${endpoint}?page=${nextPage}&limit=${limit}` :
                        null,
                    last: `${endpoint}?page=${pagesCount}&limit=${limit}`,
                }
            }

            const users = await db.User.findAll({
                attributes: ['id', 'first_name', 'last_name', 'email'],
                offset: offset,
                limit: page ? limit : null,
                raw: true // we only want dataValues
            });

            res.json({
                links: pagination,
                count: users.length,
                users: users.map(user => ({...user, detail: `${URL}/api/users/${user.id}`}))
            });
        } catch(err) {
                console.log(err);
                res.status(500).json({errors: err});
        }
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
    productList: async (req, res ) => {
        let page = parseInt(req.query.page) || null;
        let offset = null;
        let pagination = {};
        const limit = parseInt(req.query.limit) || 10;
        console.log('page:', page)
        try {
            if (page) {
                const prodCount = await db.Product.count();
                const pagesCount = Math.ceil(prodCount / limit);
                const endpoint = `${URL}${req.baseUrl}${req.path}`;

                page = Math.min(Math.max(page, 1), pagesCount);
                prevPage = page > 1 ? page - 1 : null;
                nextPage = page < pagesCount ? page + 1 : null;
                offset = (page - 1) * limit;
                pagination = {
                    first: `${endpoint}?page=1&limit=${limit}`,
                    prev: prevPage ?
                        `${endpoint}?page=${prevPage}&limit=${limit}` :
                        null,
                    next: nextPage ?
                        `${endpoint}?page=${nextPage}&limit=${limit}` :
                        null,
                    last: `${endpoint}?page=${pagesCount}&limit=${limit}`,
                }
            }

            const products = await db.Product.findAll({
                attributes: ['id', 'name', 'description'],
                include: [
                    {model: db.Category, as: 'category', attributes: ['name']}
                ],
                offset: offset,
                limit: page ? limit : null,
                raw: true // we only want dataValues
            });

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
                links: pagination,
                count: products.length,
                countByCategory,
                products: products.map(product => (
                    {
                        ...product,
                        dbRelations: ['color_id', 'size_id', 'category_id', 'discount_id'],
                        detail: `${URL}/api/products/${product.id}`
                    })),
            });
        } catch (err) {
                console.log(err);
                res.status(500).json({errors: err});
        }
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