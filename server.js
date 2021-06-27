const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

const mongoURI = "mongodb+srv://todoapp:yqDQlfvmueOQzXhV@cluster0.mlosy.mongodb.net/todo?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username}).exec();
  if(user) {
    res.status(500);
    res.json({
      message: "User already exists"
    });
    return;
  }
  await User.create({username, password});
  res.json({
    username, password
  });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", function () {

  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });

});