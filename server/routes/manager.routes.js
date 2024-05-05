const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Assign a manager to an event
  app.post(
    "/event/:eventId/assign-manager/:managerId",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.assignManager
  );

  // Delete a manager from the Event
  // Remove a manager from an event
  app.delete(
    "/event/:eventId/remove-manager/:managerId",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.removeManager
  );


  // Get all managers for an event
  app.get(
    "/event/:eventId/managers",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.getManagers
  );
};
