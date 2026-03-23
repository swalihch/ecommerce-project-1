const mongoose =require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  category:{
    type:String,
    enum:["Door","Sheet","Accessory"],
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    default:0
  },
  unit:{
    type:String,
    enum:["piece","sqft","sheet"],
    default:"piece"
  },

  size:String,
  thickness:String,
  color:String,

  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  stock:{
    type:Number,
    default:0
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Product",productSchema);