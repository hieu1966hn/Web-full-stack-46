const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
  (err) => {
    if (err) return console.log(err);
    console.log('MongoDB Server connected');
  });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});




app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.sendFile(path.resolve(__dirname, "./public/home/index.html"));
  console.log(__dirname);
});


app.get("/create", (req, res) => {
  // res.send("Hello World!");
  res.sendFile(path.resolve(__dirname, "./public/create/index.html"));
  console.log(__dirname);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
