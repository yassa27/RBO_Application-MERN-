const db = require("../models")
const User = db.users;

exports.allAccess = (req, res) => {
    res.status(200).send("Welcome To ReadBooks Online.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Control.");
  };
  exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee Control.");
  };

