const express = require("express");
const mongoose = require("mongoose");

const UserRoute = require("./Routes/user.route");

const app = express();

app.use(express.json()); // This makes it JSON supportive
app.use(express.urlencoded({ extended: false })); // This makes it Form Supportive

app.use("/api/users", UserRoute);

app.get("/", (req, res) => {
  res.send("Push From NodeJS");
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@nodedb.qrn8o.mongodb.net/MessageMeDatabase?retryWrites=true&w=majority&appName=NodeDB"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening to port 3000 Connected To MongoDB");
    });
  })
  .catch(() => {
    console.log("Failed To Connect To Database");
  });
