const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
//api routes to test user role verification

  app.get("/api/test/all", controller.allAccess);


  app.get(
    "/api/test/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeeBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get("/api/users", controller.findAll);
};

