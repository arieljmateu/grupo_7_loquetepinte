const db = require('../database/models');

const controller = {
	index: (req,res) => {
		db.Product.findAll()
			.then(productsJson => res.render('products/products', {productsJson}))
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
		const productToEditID = req.params.id;

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
	}
}


module.exports = controller