const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.routes.js");
const sequelize = require("./Utils/database.js");
const User = require("./Model/user.model.js"); // Import the model explicitly

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test database connection
sequelize.authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((error) => console.log("Error connecting to database:", error));

// Sync models
sequelize.sync() // Set force to true temporarily
  .then(() => {
    console.log("Database synced and tables created!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Routes
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("Server is start on 3000");
});
