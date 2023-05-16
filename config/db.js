const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
