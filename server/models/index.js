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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});

db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.event.hasMany(db.ticket, { as: "tickets" });
db.ticket.belongsTo(db.event, {
  foreignKey: "eventId",
  as: "event",
});

db.user.hasMany(db.ticket, { as: "tickets" });
db.ticket.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.ROLES = ["user", "manager", "admin"]

const Role = db.role;

module.exports = db;