const express = require("express");
const signupExpressRoute = express.Router();
const cors = require("cors");
let SignUpSchema = require("../model/signup.model");
const User = require('../model/signup.model');
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
 //Get users
 signupExpressRoute
   .route("/", cors(corsOptionsDelegate))
   .get(async (req, res, next) => {
     await SignUpSchema.find()
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
  //post
  signupExpressRoute.route("/register").post(async (req, res, next) => {
    await SignUpSchema.create(req.body)
    //console.log(req.body)
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
      })
  });    


  

  // Get single user
  signupExpressRoute.route("/get-user/:id").get(async (req, res, next) => {
    await SignUpSchema.findById(req.params.id, req.body)
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
  // Get single user
  signupExpressRoute.route("/get-user/:email/:pwd").get(async (req, res, next) => {
    await SignUpSchema.find({email:req.params.email,password:req.params.pwd})
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
  

   signupExpressRoute.get("register/:email", (req, res)=> {
     const { email, password} = req.body
     console.log(email)
     const user = SignUpSchema.find({
         email:{$eq:`${email}`},
         password:{$eq:`${password}`}
     });
    console.log('user'+user)
         if(user){
            res.send({message: "Success"})
         } else {
          res.send(err)
        }
   })

  module.exports=signupExpressRoute;  
  
  
  

