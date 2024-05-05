exports.assignManagerToEvent = async (req, res) => {
    const { userId, eventId } = req.params;
  
    try {
      // Check if the user exists and has a manager role
      const user = await db.user.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
  
      const roles = await user.getRoles();
      const isManager = roles.some(role => role.name === 'manager');
      if (!isManager) {
        return res.status(403).send({ message: "User is not a manager!" });
      }
  
      // Check if the event exists
      const event = await db.event.findByPk(eventId);
      if (!event) {
        return res.status(404).send({ message: "Event not found!" });
      }
  
      // Assign the manager to the event
      await user.addManagedEvent(event);
  
      res.status(200).send({ message: "Manager assigned successfully to the event!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  exports.getManagers = async (req, res) => {
    const { eventId } = req.params;
  
    try {
      // Check if the event exists
      const event = await db.event.findByPk(eventId);
      if (!event) {
        return res.status(404).send({ message: "Event not found!" });
      }
  
      // Get all managers assigned to the event
      const managers = await event.getManagers();
  
      // If no managers are assigned to the event
      if (managers.length === 0) {
        return res.status(404).send({ message: "No managers assigned to this event!" });
      }
  
      // Send the list of managers
      res.status(200).send({ managers });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  exports.removeManager = async (req, res) => {
    const { eventId, managerId } = req.params;
  
    try {
      // Check if the manager exists
      const manager = await db.managers.findOne({ where: { id: managerId, eventId: eventId } });
      if (!manager) {
        return res.status(404).send({ message: "Manager not found in this event!" });
      }
  
      // Remove the manager from the event
      await manager.destroy();
  
      res.status(200).send({ message: "Manager removed successfully from the event!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  