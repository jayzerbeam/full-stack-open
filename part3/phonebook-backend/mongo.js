const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.z5mvlhq.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entries", entrySchema);

const entry = new Entry({
  name: "Arto Hellas",
  number: "040-123456",
});

// Note.find({ important: true }).then((res) => {
//   res.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

entry.save().then((result) => {
  console.log("entry saved!");
  mongoose.connection.close();
});
