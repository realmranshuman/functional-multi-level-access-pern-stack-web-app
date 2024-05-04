const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    });

    // Event Management Routes

    exports.listOfEvents = (req, res) => {
        Event.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving events."
            });
        });
    };

    app.get(
        "/event/:eventId/",
        controller.eventDetails
    );

    app.post(
        "/create-event/",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createEvent
      );
};