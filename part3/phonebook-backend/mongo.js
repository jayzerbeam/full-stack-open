const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
if (process.argv[3] == "") {
  console.log("give name as argument");
  process.exit(1);
}
if (process.argv[4] == "") {
  console.log("give number as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.z5mvlhq.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entries", entrySchema);

const entry = new Entry({
  name: name,
  number: number,
});

if (process.argv.length === 3) {
  Entry.find({}).then((res) => {
    console.log("Phonebook:");
    res.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
      mongoose.connection.close();
    });
  });
} else {
  entry.save().then((result) => {
    console.log(`added ${name} number ${number} to the phonebook`);
    mongoose.connection.close();
  });
}
