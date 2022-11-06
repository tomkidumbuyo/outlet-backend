//MARK: --- REQUIRE MODULES
const port = process.env.PORT || 8080;
const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

// enable files upload
expressApp.use(fileUpload({
  createParentPath: true
}));



expressApp.use(compression())
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());
expressApp.use(morgan('dev'));

// Create link to Angular build directory

expressApp.use("/",express.static(__dirname + "/dist"));
expressApp.use("/files",express.static(__dirname + "/files"));

var originsWhitelist = [
  'http://localhost:4200',
  'http://127.0.01:4200'
];

var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: false
};

expressApp.use(cors(corsOptions));


// import route files
const authRoutes = require('./routes/auth.js');
const assetsRoutes = require('./routes/assets.js');
const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');
const outlet = require('./routes/outlet.js');
const comment = require('./routes/comment.js');
const sales = require('./routes/sales.js');
const classification = require('./routes/classification.js');
const brand = require('./routes/brand.js');
const client = require('./routes/client.js');
const product = require('./routes/product.js');
const project = require('./routes/project.js');
const file = require('./routes/file.js');
const posm = require('./routes/posm.js');
const giveaway = require('./routes/giveaway.js');
const district = require('./routes/district.js');
const region = require('./routes/region.js');
const ward = require('./routes/ward.js');
const temp = require('./routes/temp.js');
const outletGiveaway = require('./routes/outletGiveaway.js');
const outletSku = require('./routes/outletSku.js');
const outletProduct = require('./routes/outletProduct.js');
const outletPosm = require('./routes/outletPosm.js');



// use routes
expressApp.use('/api/auth', authRoutes);
expressApp.use('/api/assets', assetsRoutes);
expressApp.use('/api/user', userRoutes);
expressApp.use('/api/admin', adminRoutes);
expressApp.use('/api/outlet', outlet);
expressApp.use('/api/sales', sales);
expressApp.use('/api/classification', classification);
expressApp.use('/api/brand', brand);
expressApp.use('/api/client', client);
expressApp.use('/api/product', product);
expressApp.use('/api/project', project);
expressApp.use('/api/file', file);
expressApp.use('/api/posm', posm);
expressApp.use('/api/giveaway', giveaway);
expressApp.use('/api/district', district);
expressApp.use('/api/region', region);
expressApp.use('/api/ward', ward);
expressApp.use('/api/temp', temp);
expressApp.use('/api/outletGiveaway', outletGiveaway);
expressApp.use('/api/outletSku', outletSku);
expressApp.use('/api/outletProduct', outletProduct);
expressApp.use('/api/outletPosm', outletPosm);


// redirects to angular
expressApp.use(function(req, res) {
  console.log(req.url);
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html'); // will execute angular code
});



mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongoDb server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

db = mongoose.connect('mongodb+srv://amplify:' + process.env.DB_PASSWORD + '@cluster0.wl8lt.mongodb.net/amplify?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
});

//init the server
expressApp.listen(port, () => {
   console.log(`listening on port ${port}`);
});

module.exports = expressApp;

