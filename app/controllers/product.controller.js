const Product = require('../models/product.model.js');
const mongoose = require("mongoose");
// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        increase: req.body.increase,
        category: req.body.category,
        date: req.body.date,
        province: req.body.province,
        city: req.body.city,
        image: req.body.image,
        status: req.body.status || 0,
        publish: req.body.publish || 0,
        deleted: 0,
    });

    // Save Note in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.findStatus = (req,res) => {
    Product.find({status_product: 'Valid'})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findKesehatan = (req,res) => {
    Product.find({kategori: 'Kesehatan', status_product: 'Valid'})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findSedekah = (req,res) => {
    Product.find({kategori: 'Sedekah', status_product: 'Valid'})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findLainlain = (req,res) => {
    Product.find({kategori: 'Lain-lain', status_product: 'Valid'})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findBencana = (req,res) => {
    Product.find({kategori: 'Bencana Alam', status_product: 'Valid'})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findProductUser = (req,res) => {
    Product.find({iduser: req.body.iduser})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.productId,
        req.body
        , { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.productId
            });
        });
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    await Product.aggregate(
        [
            {$match:{_id: mongoose.Types.ObjectId(req.params.productId)}},
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
    Product.findOne({"email" : emails})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emails
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.emails
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.emails
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {deleted: 1}, {new: true})
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};