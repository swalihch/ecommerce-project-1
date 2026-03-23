const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:15,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate:{
      validator: validator.isEmail,
      message: "Invalid email format"
    }
  },
  password:{
    type:String,
    required:true,
    minlength:8,
    maxlength:64,
    select:false
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
},{timestamps:true});


/* hash password before saving */
userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

});

/* compare password */
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);  
}


module.exports = mongoose.model("User",userSchema);