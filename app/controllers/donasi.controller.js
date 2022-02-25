const Donasi = require('../models/donasi.model.js');
const mongoose = require("mongoose");
// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const donasi = new Donasi({
        iduser: req.body.iduser,
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
        target: req.body.target,
        terkumpul: req.body.terkumpul,
        kategori: req.body.kategori,
        foto: req.body.foto,
        durasi: req.body.durasi,
        status_donasi: req.body.status_donasi
    });

    // Save Note in the database
    donasi.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.findStatus = (req,res) => {
    Donasi.find({status_donasi: 'Valid'})
        .then(donasis => {
            res.send(donasis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findKesehatan = (req,res) => {
    Donasi.find({kategori: 'Kesehatan', status_donasi: 'Valid'})
        .then(donasis => {
            res.send(donasis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findSedekah = (req,res) => {
    Donasi.find({kategori: 'Sedekah', status_donasi: 'Valid'})
        .then(donasis => {
            res.send(donasis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findLainlain = (req,res) => {
    Donasi.find({kategori: 'Lain-lain', status_donasi: 'Valid'})
        .then(donasis => {
            res.send(donasis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findBencana = (req,res) => {
    Donasi.find({kategori: 'Bencana Alam', status_donasi: 'Valid'})
        .then(donasis => {
            res.send(donasis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Donasi.find()
        .then(donasis => {
            res.send(donasis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Donasi.findByIdAndUpdate(req.params.donasiId,
        req.body
        , { new: true })
        .then(donasi => {
            if (!donasi) {
                return res.status(404).send({
                    message: "donasi not found with id " + req.params.donasiId
                });
            }
            res.send(donasi);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "donasi not found with id " + req.params.donasiId
                });
            }
            return res.status(500).send({
                message: "Error updating donasi with id " + req.params.donasiId
            });
        });
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    await Donasi.aggregate(
        [
            {$match:{_id: mongoose.Types.ObjectId(req.params.donasiId)}},
            {
                $lookup:{
                    from: "users",
                    localField: "iduser",
                    foreignField: "_id",
                    as: "id_users"
                },
            },

            {
                $project:{
                    iduser: 0,
                },
            },
            {$sort: {_id: 1}},
        ],
        function (err,data) {
            if (err || data === null) {
                res.json({
                  msg: "Gagal mendapatkan data",
                  err,
                });
              } else {
                res.json(data[0]);
              }
        }
    )
};

// Find a single note with a noteId
exports.findOneEmail = (req, res) => {
    const emails = req.params.emails;
    Donasi.findOne({"email" : emails})
    .then(donasi => {
        if(!donasi) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emails
            });            
        }
        res.send(donasi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "donasi not found with id " + req.params.emails
            });                
        }
        return res.status(500).send({
            message: "Error retrieving donasi with id " + req.params.emails
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Donasi.findByIdAndRemove(req.params.donasiId)
        .then(donasi => {
            if (!donasi) {
                return res.status(404).send({
                    message: "donasi not found with id " + req.params.donasiId
                });
            }
            res.send({ message: "donasi deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "donasi not found with id " + req.params.donasiId
                });
            }
            return res.status(500).send({
                message: "Could not delete donasi with id " + req.params.donasiId
            });
        });
};