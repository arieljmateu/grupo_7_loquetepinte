const fs = require('fs');

const products = fs.readFileSync('src/data/productos.json', 'utf-8');
const productsJson = JSON.parse(products);

const controller = {
	index: (req,res) => {
		return res.render('./products/products', {productsJson});
	},
    detail: (req,res) => {
		const productID = req.params.id;
		const product = productsJson.find(product => product.id == productID);

		return res.render('./products/detail', {product: product});
	},
	create: (req,res) => {
		return res.render('./products/create');
	},
	add: (req,res) => {
		const newProduct = {
			id: productsJson.length + 1,
			nombre: req.body.name,
			descripcion: req.body.description,
			categoria: req.body.category,
			color: req.body.color,
			tamaño: req.body.size,
			precio: req.body.price,
			imagen: req.body.image
		}

		productsJson.push(newProduct);
		// pretty-print JSON string
		const productsJSON = JSON.stringify(productsJson, null, 2);
		fs.writeFileSync('src/data/productos.json', productsJSON);

		res.render('./products/create');
	},
	edit: (req,res) => {
		const productID = req.params.id;
		const product = productsJson.find(product => product.id == productID);

		return res.render('./products/edit', {product: product});
	},
	editProduct: (req,res) => {
		const productToEditID = req.params.id;
		const productToEdit = productsJson.find(product => product.id == productToEditID);

		const editedProduct = {
			id: req.params.id - 1,
			nombre: req.body.name,
			descripcion: req.body.description,
			categoria: req.body.category,
			color: req.body.color,
			tamaño: req.body.size,
			precio: req.body.price,
			imagen: req.body.image
		}
		    productsJson[req.params.id - 1] = editedProduct;
		
			const productsJSON = JSON.stringify(productsJson, null, 2);
		    fs.writeFileSync('src/data/productos.json', productsJSON);


		res.render('./');
	}
}


module.exports = controller