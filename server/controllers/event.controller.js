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
  const { name, description, startingDate, endingDate, type, location, slug, maxAttendees } = req.body;
  const userId = req.userId; 

  // Check all required fields
  if (!name || !description || !startingDate || !endingDate || !type || !location || !slug || !maxAttendees) {
    res.status(400).send({
      message: "All fields are required!"
    });
    return;
  }

  // Create an event
  Event.create({
    name,
    description,
    startingDate,
    endingDate,
    type,
    location,
    slug,
    maxAttendees,
    userId // Set the userId to the user's id
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Event."
    });
  });
};



// fetch all events
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

// fetch an event's details
exports.eventDetails = (req, res) => {
  const slug = req.params.slug;

  Event.findOne({
    where: {
      slug: slug
    }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "No event found with slug=" + slug
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with slug=" + slug
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