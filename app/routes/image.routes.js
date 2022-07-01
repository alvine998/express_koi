module.exports = (app) => {
  const multer = require("multer");
  const fs = require('fs');
  // const express = require('express');
  // const apps = express();

  // Use Multer
  var Storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, 'resources/uploads/')
    },
    filename: (req, file, callBack) => {
      callBack(null, `${file.fieldname}_${file.originalname}`)
    }
  });

  var upload = multer({
    storage: Storage
  });

  app.post("/upload", upload.single('images'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    try{
      res.status(200).send({
        message: "success",
        info: req.file.filename
      })
    } catch(err){
      console.log(err)
    }
    
  });

  app.post("/upload/products", upload.single('files'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    console.log(req.file.filename);
      res.status(200).send({
        message: "success",
        info: req.file.filename
      })
  });

  app.delete("/delete/:imageName", (req, res) => {

    if (!req.params) {
      return res.status(500).json({
        msg: "params undefined",
      });
    } else {
      const fileExist = fs.existsSync(`resources/uploads/${req.params.imageName}`);
      if (fileExist) {
        fs.unlinkSync(`resources/uploads/${req.params.imageName}`);
        // return res.status(200).json({
        //   fileExist,
        // });
        res.status(200).send({ msg: "file dihapus" });
      } else {
        res.status(404).json({ msg: "file doesnt exist" });
        // res.status(404).send(fileExist);
      }
    }
  });

  // API Image Donasi
  app.post("/upload/donasi", upload.single('donasiimages'), (req, res) => {
    if (!req.file) {
      console.log("No file upload");
    } else {
      console.log(req.file.filename)
      res.status(200).send({
        message: "success",
        info: req.file.filename
      })
    }
  });

  // app.post("/upload/verifikasi", (req, res) => {
  //   var fstream;
  //   req.pipe(req.busboy);
  //   req.busboy.on('file', (fieldname, file, filename) => {
  //     console.log("Uploading: " + filename);
  //     fstream = fs.createWriteStream(filename);
  //     file.pipe(fstream);
  //     fstream.on('close', () => {
  //       res.redirect('back');
  //     })
  //   })
  // });

  // API Image Bukti Transaksi
  app.post("/upload/transaksi", upload.single('transaksiimages'), (req, res) => {
    if (!req.file) {
      console.log("No file upload");
    } else {
      console.log(req.file.filename)
      res.status(200).send({
        message: "success",
        info: req.file.filename
      })
    }
  });
}