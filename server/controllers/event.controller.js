const db = require("../models");
const Event = db.event;

exports.eventsPage = (req, res) =>{
  res.status(200).send("This is where all the events from the database will be returned")
}

exports.eventPage = (req, res) =>{
  res.status(200).send("This is where all the details of an specific event will be returned")
}

// Create an event
exports.createEvent = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.date || !req.body.type || !req.body.location || !req.body.slug || !req.body.maxAttendees) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an event
  Event.create({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    type: req.body.type,
    location: req.body.location,
    slug: req.body.slug,
    maxAttendees: req.body.maxAttendees
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Event."
    });
  });
};


// fetch an event's details
exports.eventDetails = (req, res) => {
  const id = req.params.eventId;

  Event.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });
};

// Update an event
exports.updateEvent = (req, res) => {
  const id = req.params.eventId;

  Event.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};

// Delete an event
exports.deleteEvent = (req, res) => {
  const id = req.params.eventId;

  Event.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};