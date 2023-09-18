require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entries", entrySchema);

entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", entrySchema);
