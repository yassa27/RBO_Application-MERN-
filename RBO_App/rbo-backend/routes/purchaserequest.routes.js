module.exports = app => {
    const purchaserequests = require("../controllers/purchaserequest.controller");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", purchaserequests.create);
    // Retrieve all purchaserequests
    router.get("/", purchaserequests.findAll);
    // Retrieve all published purchaserequests
    router.get("/published", purchaserequests.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", purchaserequests.findOne);
    // Update a Tutorial with id
    router.put("/:id", purchaserequests.update);
    // Delete a Tutorial with id
    router.delete("/:id", purchaserequests.delete);
    // Create a new Tutorial
    router.delete("/", purchaserequests.deleteAll);
    app.use('/api/purchaserequests', router);
  };