const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();
const routes = require('./routes/index')

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("combined"));
app.use(routes);


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_MongoURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server has been started on port: ${process.env.PORT}  `);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();