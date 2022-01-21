module.exports = (app) => {
    const donasi = require('../controllers/donasi.controller.js');

    // Create a new Note
    app.post('/donasis', donasi.create);

    
    // Retrieve all donasi
    app.get('/donasis', donasi.findAll);

    // Retrieve all donasi
    app.get('/donasis/:donasiId', donasi.findOne);


    // Delete Chat
    app.delete('/donasis/:donasiId', donasi.delete)

    // Update Chat
    app.put('/donasis/:donasiId', donasi.update)
}