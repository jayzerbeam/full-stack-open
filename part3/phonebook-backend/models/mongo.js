require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "must be at least 3 characters long"],
    required: true,
  },
  number: {
    type: String,
    minLength: [
      8,
      "min length of eight with a dash after the second or third number",
    ],
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,}/.test(v);
      },
    },
    required: [true, "User number required"],
  },
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
