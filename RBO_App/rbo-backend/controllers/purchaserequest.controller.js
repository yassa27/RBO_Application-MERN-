const db = require("../models");
const Purchaserequest = db.purchaserequests;

// Create and Save a new Purchase Request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bookTitle) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Purchase Request
    const purchaserequest = new Purchaserequest({
      bookTitle: req.body.bookTitle,
      bookAuthor: req.body.bookAuthor,
      bookType: req.body.bookType,
      requested: req.body.requested ? req.body.requested : false,
      allocated: req.body.allocated ? req.body.allocated : false,
      approved: req.body.approved ? req.body.approved : false
    });
    // Save Purchase Request in the database
    purchaserequest
      .save(purchaserequest)
      .then(data => {
        res.send(data);
        console.log("Purchaserequest saved in database" + data)
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the PurchaseRequest."
        });
      });

  }
// Get all Purchase Requests from the database.
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
            err.message || "Some error occurred while retrieving PurchaseRequests."
        });
      });
  };
// Find a single Purchase Request with an id in request
exports.findOne = (req, res) => {
    const id = req.params.id;
    Purchaserequest.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found PurchaseRequest with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving PurchaseRequest with id=" + id });
      });
  };

// Update a Purchase Request with id in the request
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
            message: `Cannot update PurchaseRequest with id=${id}. Maybe PurchaseRequest was not found!`
          });
        } else res.send({ message: "PurchaseRequest was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PurchaseRequest with id=" + id
        });
      });
  };
// Delete a PurchaseRequest with the id in request
exports.delete = (req, res) => {
    const id = req.params.id;
    Purchaserequest.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete PurchaseRequest with id=${id}. Maybe PurchaseRequest was not found!`
          });
        } else {
          res.send({
            message: "PurchaseRequest was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PurchaseRequest with id=" + id
        });
      });
  };
// Delete all PurchaseRequests from the database.
exports.deleteAll = (req, res) => {
    Purchaserequest.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} PurchaseRequests were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all PurchaseRequests."
        });
      });
  };
// Find all requested PurchaseRequests
exports.findAllrequested = (req, res) => {
    Purchaserequest.find({ requested: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PurchaseRequests."
        });
      });
  };
// Find all allocated PurchaseRequests
exports.findAllallocated = (req, res) => {
  Purchaserequest.find({ allocated: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PurchaseRequests."
      });
    });
};

// Find all approved PurchaseRequests
  exports.findAllapproved = (req, res) => {
    Purchaserequest.find({ approved: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PurchaseRequests."
        });
      });
  };