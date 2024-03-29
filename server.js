const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const http = require('http');
// const https = require('https');

// const fs = require('fs');
// var privateKey = fs.readFileSync(`sslcert/server.key`, `utf8`);
// var certificate = fs.readFileSync(`sslcert/server.crt`, `utf8`);

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Server Work"});
});

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

global.__basedir = __dirname;

// Require Notes routes
require('./app/routes/users.routes.js')(app);
require('./app/routes/image.routes.js')(app);
require('./app/routes/bannerimage.routes.js')(app);
require('./app/routes/banner.routes.js')(app);
require('./app/routes/donasi.routes.js')(app);
require('./app/routes/transaksi.routes.js')(app);
require('./app/routes/product.routes.js')(app);


const dirname = path.resolve();
app.use("/resources/uploads/", express.static(path.join(dirname, "/resources/uploads/")));

// listen for requests
const server = app.listen(process.env.PORT || 4000, () => {
    const port = server.address().port;
    console.log(`express is working on port ${port}`);
})
