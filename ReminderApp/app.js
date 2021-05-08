const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", adminRoutes);

mongoose
  .connect(
    "mongodb+srv://MERN_User:mern123@cluster0.5dlzg.mongodb.net/shop?retryWrites=true&w=majority"
  ).then((result)=>{
    console.log("DB CONNECTED");
  })
    app.listen(5006, () => {
      console.log("Listening to 5006");
    });

