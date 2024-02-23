const mongoose = require("mongoose");

exports.mongoDB = () => {
  mongoose
  .connect("URL")
  .then(() => console.log("server on"))
  .catch(() => console.log("server failed"));  
}
