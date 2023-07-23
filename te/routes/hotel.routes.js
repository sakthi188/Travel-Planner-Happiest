const express = require("express");
const hotelExpressRoute = express.Router();
const cors = require("cors");
let hotelSchema = require("../model/hotel.model");
const app = express();
app.use(express.json());
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
hotelExpressRoute
  .route("/gethot/:place", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    const pla=req.params.place;
    await hotelSchema.find({place:pla})
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
  hotelExpressRoute.route("/pothot").post(async (req, res, next) => {
    await hotelSchema.create(req.body)
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
 /* hotelExpressRoute.route("/gethot/:place").get(async (req, res, next) => {
    await hotelSchema.findById(req.params.id, req.body)
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
  });*/

  module.exports=hotelExpressRoute; 
  
  
  
  
  

