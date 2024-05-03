module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events', // name of the table in the database
          key: 'id'
        }
      },
      price: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of the table in the database
          key: 'id'
        }
      }
    });
  
    return Ticket;
  };
  