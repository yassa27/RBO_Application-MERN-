module.exports = app => {
    const purchaserequests = require("../controllers/purchaserequest.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", purchaserequests.create);
    // Retrieve all Tutorials
    router.get("/", purchaserequests.findAll);
    // Retrieve all published Tutorials
    router.get("/published", purchaserequests.findAllrequested);
    // Retrieve a single Tutorial with id
    router.get("/:id", purchaserequests.findOne);
    // Update a Tutorial with id
    router.put("/:id", purchaserequests.update);
    // Delete a Tutorial with id
    router.delete("/:id", purchaserequests.delete);
    // Create a new Tutorial
    router.delete("/", purchaserequests.deleteAll);
    app.use('/api/purchaserequests', router);
  }