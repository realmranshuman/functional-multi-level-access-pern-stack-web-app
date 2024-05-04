module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      startingDate: {
        type: Sequelize.DATE
      },
      endingDate: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      maxAttendees: {
        type: Sequelize.INTEGER
      }
    });
  
    return Event;
  };
  