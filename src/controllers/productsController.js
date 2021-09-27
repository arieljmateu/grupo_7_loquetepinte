//const products = require('../data/productos.json');

const fs = require('fs');
const products = fs.readFileSync('src/data/productos.json', 'utf-8')
const productsJson = JSON.parse(products);

const controller = {
	index: (req,res) => {
		return res.render('./products/products', {productsJson});
	},
    detail: (req,res) => {
		return res.render('./products/detail');
	},
	create: (req,res) => {
		return res.render('./products/create');
	},
	add: (req,res) => {
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

		res.render('./products/create');
	}
}


module.exports = controller