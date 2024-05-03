exports.eventsPage = (req, res) =>{
    res.status(200).send("This is where all the events from the database will be returned")
  }

exports.eventPage = (req, res) =>{
res.status(200).send("This is where all the details of an specific event will be returned")
}

// Create Event page doesn't need to be created on the backed for GET requests.
// As it will be handled by the POST request
  