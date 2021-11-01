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
		const lastUsedID = productsJson[productsJson.length - 1].id;

		const newProduct = {
			id: lastUsedID + 1,
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			color: req.body.color,
			size: req.body.size,
			price: req.body.price,
			image: req.file.filename
		}

		productsJson.push(newProduct);
		// pretty-print JSON string
		const productsJSON = JSON.stringify(productsJson, null, 2);
		fs.writeFileSync('src/data/productos.json', productsJSON);

		res.redirect(`/products/${newProduct.id}`);
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
			id: req.params.id,
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			color: req.body.color,
			size: req.body.size,
			price: req.body.price,
			image: req.file.filename
		}
		    productsJson[req.params.id - 1] = editedProduct;
		
			const productsJSON = JSON.stringify(productsJson, null, 2);
		    fs.writeFileSync('src/data/productos.json', productsJSON);


		res.redirect(`/products/${productToEditID}`);
	},
	delete: (req,res) => {
		const productId = req.params.id;
		const productToDel = productsJson.find(product => product.id == productId);

		const productsNew = []
		
		for (let i=0; i<productsJson.length; i++) {
			if (productsJson[i].id != productId) {
				productsNew.push(productsJson[i]);
			}
		}
		

		fs.writeFileSync('src/data/productos.json', JSON.stringify(productsNew, null, " "));

		res.redirect("/");
	}
}


module.exports = controller