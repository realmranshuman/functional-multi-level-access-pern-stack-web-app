const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        dialectOptions: {
            ssl: {
                require: config.dialectOptions.ssl.require,
                rejectUnauthorized: config.dialectOptions.ssl.rejectUnauthorized // This is to avoid Node's UNABLE_TO_VERIFY_LEAF_SIGNATURE error
            }
        },
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.manager = require("../models/manager.model.js")(sequelize, Sequelize);
db.message = require("../models/message.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

// A role can be associated with multiple users through the "user_roles" table
db.role.belongsToMany(db.user, {
  through: "user_roles"
});

// A user can have multiple roles through the "user_roles" table
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

// An event can have multiple tickets associated with it
db.event.hasMany(db.ticket, { as: "tickets" });

// Each ticket is associated with a specific event
db.ticket.belongsTo(db.event, {
  foreignKey: "eventId",
  as: "ticketEvent",
});

// A user can have multiple tickets associated with them
db.user.hasMany(db.ticket, { as: "tickets" });

// Each ticket is associated with a specific user
db.ticket.belongsTo(db.user, {
  foreignKey: "userId",
  as: "ticketUser",
});

// A user can create multiple events
db.user.hasMany(db.event, { as: "events" });

// Each event is created by a specific user
db.event.belongsTo(db.user, {
  foreignKey: "userId",
  as: "admin",
});

// An event can have multiple managers associated with it
db.event.hasMany(db.manager, { as: "eventManagers" });

// Each manager is associated with a specific event
db.manager.belongsTo(db.event, {
  foreignKey: "eventId",
  as: "managerEvent",
});

// A user can be a manager for multiple events
db.user.hasMany(db.manager, { as: "userManagers" });

// Each manager is a specific user
db.manager.belongsTo(db.user, {
  foreignKey: "userId",
  as: "managerUser",
});

// A task can have multiple messages associated with it
db.task.hasMany(db.message, { as: "messages" });

// Each message is associated with a specific task
db.message.belongsTo(db.task, {
  foreignKey: "taskId",
  as: "messageTask",
});

// A user can send multiple messages
db.user.hasMany(db.message, { as: "messages" });

// Each message is sent by a specific user
db.message.belongsTo(db.user, {
  foreignKey: "userId",
  as: "messageUser",
});

// A user can manage multiple events through the manager table
db.user.belongsToMany(db.event, { through: db.manager, foreignKey: 'userId', as: 'managedEvents' });

// An event can have multiple users (managers) assigned to it through the manager table
db.event.belongsToMany(db.user, { through: db.manager, foreignKey: 'eventId', as: 'eventAssignedManagers' });

// Define the available roles
db.ROLES = ["user", "manager", "admin"]


const Role = db.role;

module.exports = db;
