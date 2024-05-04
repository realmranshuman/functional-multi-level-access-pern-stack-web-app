module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'incomplete'
      }
    });
  
    return Task;
};
