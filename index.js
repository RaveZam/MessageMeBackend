const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const UserRoute = require("./Routes/user.route");
// const User = require("./models/user.model");

const app = express();

//Middle Ware

app.use(bodyParser.json()); // Parse JSON payloads
app.use(cors());
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

//Clear Users
// (async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://admin:admin@nodedb.qrn8o.mongodb.net/MessageMeDatabase?retryWrites=true&w=majority&appName=NodeDB",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     // Delete all users
//     await User.deleteMany({});
//     console.log("All users deleted successfully");

//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error deleting users:", error);
//   }
// })();
