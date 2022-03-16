const { authJwt } = require("../middlewares");

module.exports = app => {
    const purchaserequests = require("../controllers/purchaserequest.controller.js");
    var router = require("express").Router();
    // Create a new Purchase request
    router.post("/", purchaserequests.create);
    // Retrieve all Purchase requests
    router.get("/", purchaserequests.findAll);
    // Retrieve all requested Purchase requests
    router.get("/requested", purchaserequests.findAllrequested);
    // Retrieve all approved Purchase requests
    router.get("/approved", purchaserequests.findAllapproved);
    // Retrieve all allocated Purchase requests
    router.get("/allocated", purchaserequests.findAllapproved);
    // Retrieve a single Purchase request with id
    router.get("/:id", purchaserequests.findOne);
    // Update a Purchase request with id
    router.put("/:id", purchaserequests.update);
    // Delete a Purchase request with id
    router.delete("/:id", purchaserequests.delete);
    // Create a new Purchase request
    router.delete("/", purchaserequests.deleteAll);

    app.use('/api/purchaserequests', router);
  }
  