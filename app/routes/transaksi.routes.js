module.exports = (app) => {
    const transaksi = require('../controllers/transaksi.controller.js');

    // Create a new Note
    app.post('/transaksi', transaksi.create);

    // Retrieve all transaksi
    app.get('/transaksi', transaksi.findAll);

    // Retrieve all transaksi donasi
    app.get('/transaksi/donasi', transaksi.findAllTransaksiDonasi);

    // Retrieve all transaksi withdraw
    app.get('/transaksi/withdraw', transaksi.findAllTransaksiWd);

    // Retrieve all transaksi user
    app.get('/transaksi/user/:userid', transaksi.findAllUserTransaksi);

    app.get('/transaksi/donasi/:donasiid', transaksi.findAllDonasiTransaksi);

    // Retrieve all transaksi
    app.get('/transaksi/:transId', transaksi.findOne);


    // Delete Chat
    app.delete('/transaksi/:transId', transaksi.delete)

    // Update Chat
    app.put('/transaksi/:transId', transaksi.update)
}