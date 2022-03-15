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
// Retrieve Users from the database.
exports.findAll = async (req, res) => {
  try{
    const users = await User.findAll();
    res.json(users);
  }catch (error){
    res.json(error);
  }
};
