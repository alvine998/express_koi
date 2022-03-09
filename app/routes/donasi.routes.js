module.exports = (app) => {
    const donasi = require('../controllers/donasi.controller.js');

    // Create a new Note
    app.post('/donasis', donasi.create);

    
    // Retrieve all donasi
    app.get('/donasis', donasi.findAll);

     // Retrieve all donasi
     app.post('/donasis/userid', donasi.findDonasiUser);
     app.get('/donasis/valid', donasi.findStatus);
     app.get('/donasis/valid/kesehatan', donasi.findKesehatan);
     app.get('/donasis/valid/sedekah', donasi.findSedekah);
     app.get('/donasis/valid/lain-lain', donasi.findLainlain);
     app.get('/donasis/valid/bencana', donasi.findBencana);

    // Retrieve all donasi
    app.get('/donasis/:donasiId', donasi.findOne);
    // app.get('/donasis/ok/kesehatan', donasi.findWith);



    // Delete Chat
    app.delete('/donasis/:donasiId', donasi.delete)

    // Update Chat
    app.put('/donasis/:donasiId', donasi.update)
}