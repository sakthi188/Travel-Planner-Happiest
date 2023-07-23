const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let hotelSchema = new Schema(
  {
    place: {
      type: String,
    },
    five_star_hotel: {
      type: String,
    },
    budget_hotel: {
      type: String,
    },
    des_budget: {
      type: String,
    },
    des_five: {
      type: String,
    },
    des_guest: {
      type: String,
    },
      Train:{
       type: String,
    },
    Train1:{
      type: String,
    },
    Train2:{
      type: String,
    },
    Cab:{
      type: String,
    },
    Cab1:{
      type: String,
    },
    Cab2:{
      type: String,
    },
    Guest_House:{
      type: String,
    },
    
  },
  {
    collection: "hotels",
  },
);
module.exports = mongoose.model("HotelSchema", hotelSchema);   