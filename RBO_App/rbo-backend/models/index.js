const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.purchaserequests = require("./purchaserequest.model.js")(mongoose)
db.ROLES = ["user", "employee", "admin"];
module.exports = db;


