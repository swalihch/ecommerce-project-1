const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  items:[
    {
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
      quantity:Number,
      price:Number
    }
  ],

  total:{
    type:Number,
    required:true
  },

  status:{
    type:String,
    enum:["pending","paid","shipped","delivered"],
    default:"pending"
  },
  address: {
  type: String,
  required: true
},

paymentMethod: {
  type: String,
  enum: ["COD"],
  default: "COD"
},

},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema);