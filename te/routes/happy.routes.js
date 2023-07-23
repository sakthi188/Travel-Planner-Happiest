const express = require("express");
const happiestExpressRoute = express.Router();
const cors = require("cors");
let happiestSchema = require("../model/happy.model");
// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
// Get users
happiestExpressRoute
  .route("/det", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await happiestSchema.find()
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully fetched!",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
  // Create user
happiestExpressRoute.route("/create-detail").post(async (req, res, next) => {
    await happiestSchema.create(req.body)
      .then((result) => {
        console.log(result);
        res.json({
          data: result,
          message: "Data successfully added.",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
  // Get single user
  happiestExpressRoute.route("/get-detail/:id").get(async (req, res, next) => {
    await happiestSchema.findById(req.params.id, req.body)
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully retrieved.",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
  module.exports = happiestExpressRoute;
  
