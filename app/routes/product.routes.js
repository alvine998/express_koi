module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    app.get('/products', products.findAll)
    app.post('/products/create', products.create)
    app.get('/products/list', products.findAll)
    app.put('/products/update/:productId', products.update)
}