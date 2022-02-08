const Trans = require('../models/transaksi.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const trans = new Trans({
        iduser: req.body.iduser,
        iddonasi: req.body.iddonasi,
        foto: req.body.foto,
        bank: req.body.bank,
        nominal: req.body.nominal,
        poin: req.body.poin,
        status_transaksi: req.body.status_transaksi,
        nama: req.body.nama,
        norek: req.body.norek,
        keterangan: req.body.keterangan
    });

    // Save Note in the database
    trans.save()
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
    Trans.find()
        .then(transs => {
            res.send(transs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Trans.findByIdAndUpdate(req.params.transId,
        req.body
        , { new: true })
        .then(trans => {
            if (!trans) {
                return res.status(404).send({
                    message: "trans not found with id " + req.params.transId
                });
            }
            res.send(trans);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "trans not found with id " + req.params.transId
                });
            }
            return res.status(500).send({
                message: "Error updating trans with id " + req.params.transId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Trans.findById(req.params.transId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "trans not found with id " + req.params.transId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "trans not found with id " + req.params.transId
                });
            }
            return res.status(500).send({
                message: "Error retrieving trans with id " + req.params.transId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Trans.findByIdAndRemove(req.params.transId)
        .then(trans => {
            if (!trans) {
                return res.status(404).send({
                    message: "trans not found with id " + req.params.transId
                });
            }
            res.send({ message: "trans deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "trans not found with id " + req.params.transId
                });
            }
            return res.status(500).send({
                message: "Could not delete trans with id " + req.params.transId
            });
        });
};