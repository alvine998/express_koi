const Users = require('../models/users.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const users = new Users({
        nama: req.body.nama,
        nohp: req.body.nohp,
        email: req.body.email,
        email: req.body.email,
        foto: req.body.foto
    });

    // Save Note in the database
    users.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Users.find()
        .then(userss => {
            res.send(userss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Users.findByIdAndUpdate(req.params.usersId,
        req.body
        , { new: true })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Error updating users with id " + req.params.usersId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Users.findById(req.params.usersId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Error retrieving users with id " + req.params.usersId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.usersId)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send({ message: "users deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Could not delete users with id " + req.params.usersId
            });
        });
};