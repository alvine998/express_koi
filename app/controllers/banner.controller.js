const Banner = require('../models/banner.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const banner = new Banner({
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
        gambar: req.body.gambar,
    });

    // Save Note in the database
    banner.save()
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
    Banner.find()
        .then(banners => {
            res.send(banners);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Banner.findByIdAndUpdate(req.params.bannerId,
        req.body
        , { new: true })
        .then(banner => {
            if (!banner) {
                return res.status(404).send({
                    message: "banner not found with id " + req.params.bannerId
                });
            }
            res.send(banner);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "banner not found with id " + req.params.bannerId
                });
            }
            return res.status(500).send({
                message: "Error updating banner with id " + req.params.bannerId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Banner.findById(req.params.bannerId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "banner not found with id " + req.params.bannerId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "banner not found with id " + req.params.bannerId
                });
            }
            return res.status(500).send({
                message: "Error retrieving banner with id " + req.params.bannerId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Banner.findByIdAndRemove(req.params.bannerId)
        .then(banner => {
            if (!banner) {
                return res.status(404).send({
                    message: "banner not found with id " + req.params.bannerId
                });
            }
            res.send({ message: "banner deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "banner not found with id " + req.params.bannerId
                });
            }
            return res.status(500).send({
                message: "Could not delete banner with id " + req.params.bannerId
            });
        });
};