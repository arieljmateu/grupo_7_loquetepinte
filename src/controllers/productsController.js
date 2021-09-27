const products = require('../data/productos.json');

const controller = {
    products: (req,res) => {
		return res.render('./products/products');
	},
	createProduct: (req,res) => {
		return res.render('./products/create-product');
	},
	productsList: (req,res) => {
		return res.render('./products/products-list', {products});
	},
	addProduct: (req,res) => {
		let newProduct = {
			id: products.length + 1,
			nombre: req.body.name,
			descripcion: req.body.description,
			categoria: req.body.category,
			color: req.body.color,
			tamaño: req.body.size,
			precio: req.body.price,
			imagen: req.body.image
		}
		products.push(newProduct);

		res.render('./products/create-product');
	}
}


module.exports = controller