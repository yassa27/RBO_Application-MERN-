const db = require("../models");
const Purchaserequest = db.purchaserequests;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bookTitle) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const purchaserequest = new Purchaserequest({
      bookTitle: req.body.bookTitle,
      bookAuthor: req.body.bookAuthor,
      bookType: req.body.bookType,
      requested: req.body.requested ? req.body.requested : false,
      allocated: req.body.allocated ? req.body.allocated : false,
      approved: req.body.approved ? req.body.approved : false
    });
    // Save Tutorial in the database
    purchaserequest
      .save(purchaserequest)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  }
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const bookTitle = req.query.bookTitle;
    var condition = bookTitle ? { bookTitle: { $regex: new RegExp(bookTitle), $options: "i" } } : {};
    Purchaserequest.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Purchaserequest.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Purchaserequest.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Purchaserequest.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Purchaserequest.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };
// Find all requested Tutorials
exports.findAllrequested = (req, res) => {
    Purchaserequest.find({ requested: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };