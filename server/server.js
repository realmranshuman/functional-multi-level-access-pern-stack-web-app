require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

// WARNING!!! THIS IS JUST FOR DEVELOPMENT PURPOSES. IT WILL DROP THE DATABASE
// db.sequelize.sync({force: true}).then(() =>{
//     console.log("Drop and resync DB")
//     initial();
// })

// function initial () {
//     Role.create({
//         id: 1,
//         name: "user"
//     });
//     Role.create({
//         id: 2,
//         name: "manager"
//     });
//     Role.create({
//         id: 3,
//         name: "admin"
//     });
// }
// END OF WARNING!!!
// IN PRODUCTION, JUST UNCOMMENT THE FOLLOWING COMMENT AFTER CREATING THE DATABASE AND TABLES
db.sequelize.sync();

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/event.routes")(app);

app.get("/home", (req, res) => {
  res.json({ message: "WELCOME TO AQUAPONICS!!!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
