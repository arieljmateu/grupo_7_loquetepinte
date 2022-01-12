const {validationResult} = require('express-validator');
const db = require('../database/models');

const controller = {
	index: (req,res) => {
		const whereClause = {};
		let query = '';
		if (req.query.search) {
			// https://thispointer.com/javascript-replace-multiple-spaces-with-a-single-space/
			query = req.query.search.trim().replace(/\s+/g, " ");
			const wordsSearch = query.split(" ");

			if (wordsSearch.length === 1) {
				whereClause['where'] = {
					name: {
						[db.Sequelize.Op.like]: `%${wordsSearch[0]}%`
					}
				}	
			} else {
				// transform words to array of clauses to be used in [Op.and]
				const opAndClauses = wordsSearch.reduce((ac, val) => [...ac, 
					{ name: { 
								[db.Sequelize.Op.like]: `%${val}%`
							}
					}], []);

				whereClause['where'] = {
					[db.Sequelize.Op.and]: opAndClauses
				}
			}
		}

		db.Product.findAll(whereClause)
			.then(productsJson => res.render('products/products', {productsJson, query}))
			.catch(res.send);
	},
    detail: (req,res) => {
		const productID = req.params.id;
		db.Product.findByPk(productID)
			.then(product => {
				if (product) {
					res.render('products/detail', {product: product})
				} else {
					res.redirect('/products');
				}
			})
			.catch(res.send);
	},
	create: (req,res) => {
		const pColors = db.Color.findAll();
		const pSizes = db.Size.findAll();
		const pCategories = db.Category.findAll();
		const pDiscounts = db.Discount.findAll();

		Promise.all([pColors, pSizes, pCategories, pDiscounts])
			.then( ([colors, sizes, categories, discounts]) => {
				res.render('products/create', {colors, sizes, categories, discounts})
			})
			.catch(res.send);
	},
	add: (req,res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			db.Product.create({
				name: req.body.name,
				description: req.body.description,
				category_id: req.body.category_id,
				color_id: req.body.color_id,
				size_id: req.body.size_id,
				price: req.body.price,
				image: req.file.filename
			})
				.then(createdProduct => {
					res.redirect(`/products/${createdProduct.id}`);
				})
				.catch(res.send);
		} else {
			const pColors = db.Color.findAll();
			const pSizes = db.Size.findAll();
			const pCategories = db.Category.findAll();
			const pDiscounts = db.Discount.findAll();

			Promise.all([pColors, pSizes, pCategories, pDiscounts])
				.then( ([colors, sizes, categories, discounts]) => {
					res.render('products/create', {colors, sizes, categories, discounts, errors: errors.mapped(), old: req.body})
				})
				.catch(res.send);
		}
	},
	edit: (req,res) => {
		const productID = req.params.id;
		const pProduct = db.Product.findByPk(productID);
		const pColors = db.Color.findAll();
		const pSizes = db.Size.findAll();
		const pCategories = db.Category.findAll();
		const pDiscounts = db.Discount.findAll();

		Promise.all([pProduct, pColors, pSizes, pCategories, pDiscounts])
			.then( ([product, colors, sizes, categories, discounts]) => {
				if (product) {
					res.render('./products/edit', {product, colors, sizes, categories, discounts})
				} else {
					res.redirect('/products');
				}
			})
			.catch(res.send);
	},
	editProduct: (req,res) => {
		let errors = validationResult(req);
		const productToEditID = req.params.id;

		if (errors.isEmpty()) {

			const editedProduct = {
				name: req.body.name,
				description: req.body.description,
				category_id: req.body.category_id,
				color_id: req.body.color_id,
				size_id: req.body.size_id,
				price: req.body.price,
				image: req.file.filename
			};

			db.Product.update(editedProduct, {
				where: {id: productToEditID}
			})
				.then(nrRows => {
					if (nrRows == 1) {
						res.redirect(`/products/${productToEditID}`);
					} else {
						res.redirect(`/products/edit/${productToEditID}`);
					}
				})
				.catch(res.send);
		} else {
			const pProduct = db.Product.findByPk(productToEditID)
			const pColors = db.Color.findAll();
			const pSizes = db.Size.findAll();
			const pCategories = db.Category.findAll();
			const pDiscounts = db.Discount.findAll();

			Promise.all([pProduct, pColors, pSizes, pCategories, pDiscounts])
				.then( ([product, colors, sizes, categories, discounts]) => {
					return res.render('./products/edit', {product, colors, sizes, categories, discounts, errors: errors.mapped(), old: req.body})
				})
				.catch(res.send);
		}
	},
	delete: (req,res) => {
		const productId = req.params.id;

		db.Product.destroy({
			where: { id: productId }
		})
			.then(nrRows => {
				if (nrRows == 1) {
					res.redirect("/");
				} else {
					res.redirect(`/products/edit/${productId}`);
				}
			})
			.catch(res.send);
	},
	category: async (req,res) => {
		const categoryId = req.params.id;
		const pCategory = await db.Category.findByPk(categoryId);
		const whereClause = {};
		let query = '';
		if (req.query.search) {
			// https://thispointer.com/javascript-replace-multiple-spaces-with-a-single-space/
			query = req.query.search.trim().replace(/\s+/g, " ");
			const wordsSearch = query.split(" ");

			if (wordsSearch.length === 1) {
				whereClause['where'] = {
					name: {
						[db.Sequelize.Op.like]: `%${wordsSearch[0]}%`
					},
					category_id: Number(categoryId)
				}	
			} else {
				// transform words to array of clauses to be used in [Op.and]
				const opAndClauses = wordsSearch.reduce((ac, val) => [...ac, 
					{ name: { 
								[db.Sequelize.Op.like]: `%${val}%`
							}
					}], []);

				whereClause['where'] = {
					[db.Sequelize.Op.and]: opAndClauses,
					category_id: Number(categoryId)
				}
			}
		} else {
			whereClause['where'] = {
				category_id: Number(categoryId)
			}
		}
		
		db.Product.findAll(whereClause)
		.then(productsJson =>{
				res.render(`./products/category`, {productsJson, query, Category: pCategory})
				})
			.catch(res.send);
	},
}


module.exports = controller