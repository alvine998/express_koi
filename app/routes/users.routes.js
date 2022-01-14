module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve all users
    app.get('/users/:usersId', users.findOne);

    // Delete Chat
    app.delete('/users/:usersId', users.delete)

    // Update Chat
    app.put('/users/:usersId', users.update)
}