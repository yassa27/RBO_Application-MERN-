const db = require("../models");
const Purchaserequest = db.purchaserequests;
// Create and Save a new Purchaserequest
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const purchaserequest = new Purchaserequest({
      bookTitle: req.body.bookTitle,
      bookType: req.body.bookType,
      bookAuthor: req.body.bookAuthor,
      description: req.body.description,
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
            err.message || "Some error occurred while creating the purchase request."
        });
      });
  };
// Retrieve all Purchaserequests from the database.
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
// Find a single Purchaserequest with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Purchaserequest.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found purchase request with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving purchase request with id=" + id });
      });
  };
// Update a Purchaserequest by the id in the request
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
            message: `Cannot update Purchase request with id=${id}. Maybe purchase request was not found!`
          });
        } else res.send({ message: "Purchaserequest was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Purchaserequest with id=" + id
        });
      });
  }
// Delete a Purchaserequest with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Purchaserequest.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Purchaserequest with id=${id}. Maybe Purchaserequest was not found!`
          });
        } else {
          res.send({
            message: "Purchaserequest was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Purchaserequest with id=" + id
        });
      });
  };
// Delete all Purchaserequests from the database.
exports.deleteAll = (req, res) => {
    Purchaserequest.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Purchaserequests were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Purchaserequests."
        });
      });
  };
// Find all published Purchaserequests
exports.findAllPublished = (req, res) => {
    Purchaserequest.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Purchaserequests."
        });
      });
  };