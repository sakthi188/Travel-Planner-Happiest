const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let happiestSchema = new Schema(
  {
     From:{
      type: String,
    },
    To: {
      type: String,
    },
    Distance: {
      type: String,
    },
    Time: {
        type: String,
      },
  },
  {
    collection: "distance",
  },
);
module.exports = mongoose.model("happiestSchema", happiestSchema);
