const productos = require('../data/productos.json');

const controller = {
    products: (req,res) => {
		return res.render('./products/products');
	},
	createProduct: (req,res) => {
		return res.render('./products/create-product');
	},
	addProduct: (req,res) => {
		//let newProduct = {
		//	id: productos.lenght +1,
		//	nombre: req.body.productName,
		//	descripcion: req.body.description,
		//	categoria: req.body.category,
		//	color: req.body.color,
		//	tamaño: req.body.size,
		//	precio: req.body.price,
		//	imagen: req.body.productImage
		// }
		//productos.push(newProduct);

		//res.redirect("/products/create-products");
		res.send(req.body.productName)
	
	}
}


module.exports = controller