//const products = require('../data/productos.json');

const fs = require('fs');
const products = fs.readFileSync('src/data/productos.json', 'utf-8')
const productsJson = JSON.parse(products);

const controller = {
    products: (req,res) => {
		return res.render('./products/products');
	},
	createProduct: (req,res) => {
		return res.render('./products/create-product');
	},
	productsList: (req,res) => {
		return res.render('./products/products-list', {productsJson});
	},
	addProduct: (req,res) => {
		let newProduct = {
			id: productsJson.length + 1,
			nombre: req.body.name,
			descripcion: req.body.description,
			categoria: req.body.category,
			color: req.body.color,
			tamaño: req.body.size,
			precio: req.body.price,
			imagen: req.body.image
		}
		//products.push(newProduct);

		productsJson.push(newProduct);
		let productsJSON = JSON.stringify(productsJson)
		fs.writeFileSync('src/data/productos.json', productsJSON); 

		res.render('./products/create-product');
	}
}


module.exports = controller