const Donasi = require('../models/donasi.model.js');

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

exports.onLogin = (req,res) => {
    Donasi.findOne({email: req.body.email})
    .then(donasi => {
        if(!donasi){
            return res.status(404).send({
                message: "User not found with email "
            });  
        } else {
            bcrypt.compare(req.body.password, donasi.password, (err, result) => {
                if(result == true){
                    res.status(200).send({Success: "Login Ok"})
                } else {
                    res.status(500).send({Failed: "Email or Password Wrong"})
                }
            })
        }
    })
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
exports.findOne = (req, res) => {
    Donasi.findById(req.params.donasiId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "donasi not found with id " + req.params.donasiId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "donasi not found with id " + req.params.donasiId
                });
            }
            return res.status(500).send({
                message: "Error retrieving donasi with id " + req.params.donasiId
            });
        });
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