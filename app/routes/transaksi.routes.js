module.exports = (app) => {
    const transaksi = require('../controllers/transaksi.controller.js');

    // Create a new Note
    app.post('/transaksi', transaksi.create);

    // Retrieve all transaksi
    app.get('/transaksi', transaksi.findAll);

    // Retrieve all transaksi
    app.get('/transaksi/:transaksiId', transaksi.findOne);


    // Delete Chat
    app.delete('/transaksi/:transaksiId', transaksi.delete)

    // Update Chat
    app.put('/transaksi/:transaksiId', transaksi.update)
}