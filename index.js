const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();
const routes = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path')

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(fileUpload());
app.use(routes);
app.use(morgan("combined"));
app.use(express.static(path.resolve(__dirname, "client", "build")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})



const start = async () => {
  try {
    await mongoose.connect(process.env.DB_MongoURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server has been started on port: ${process.env.PORT}  `);
    });
  } catch (e) {
    console.log(e.message);
  }
};


start();