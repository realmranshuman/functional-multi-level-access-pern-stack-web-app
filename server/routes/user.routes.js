const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/user/:username/",
    [authJwt.verifyToken, authJwt.isUser, authJwt.isCurrentUser],
    controller.userBoard
  );
  
  app.get(
    "/manager/:username/",
    [authJwt.verifyToken, authJwt.isManager, authJwt.isCurrentUser],
    controller.managerBoard
  );
  
  app.get(
    "/admin/:username/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isCurrentUser],
    controller.adminBoard
  );
};