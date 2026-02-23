const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  tname: String,
  date: Date,
  taccomplished: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Data", mySchema);
