const mongoose = require('mongoose');

const connectDB = async ()=>{
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected ${con.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectDB;