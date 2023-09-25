require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Entry = require("./models/mongo.js");
const PORT = process.env.PORT;

morgan.token("req-body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body",
  ),
);
app.use(cors());
app.use(express.static("dist"));

/*
 * GET requests
 * */

app.get("/api/persons", (_, res) => {
  Entry.find({}).then((entry) => {
    console.log(entry);
    res.json(entry);
  });
});

// app.get("/info", (_, res) => {
//   res.send(
//     `<p>phonebook has info for ${
//       phonebook.length
//     } people</p><p>request info: ${new Date()}</p>`,
//   );
// });
//
// app.get("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const entry = getEntry(id);
//
//   if (entry) {
//     res.json(entry);
//   } else {
//     res.status(404).end();
//   }
// });
//
// const getEntry = (id) => {
//   return phonebook.find((item) => {
//     return item.id === id;
//   });
// };
//
// const removeEntry = (id) => {
//   return phonebook.filter((item) => {
//     return item.id !== id;
//   });
// };
//
const makeRandomNumber = () => {
  const max = 999_999_999;
  return Math.floor(Math.random() * max);
};
//
// const incrementId = () => {
//   const maxId =
//     phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
//   return maxId + 1;
// };
//
// const hasDupeName = (name) => {
//   return phonebook.find(
//     (entry) => entry.name.toLowerCase() === name.toLowerCase(),
//   );
// };
//
// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   phonebook = removeEntry(id);
//   console.log(phonebook);
//
//   res.status(204).end();
// });
//
app.post("/api/persons/", (req, res) => {
  const body = req.body;

  const entry = new Entry({
    name: body.name,
    number: String(makeRandomNumber()),
  });

  if (!entry.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }
  // else if (hasDupeName(entry.name)) {
  //   return res.status(400).json({
  //     error: "entry for this name already exists",
  //   });
  // }
  entry.save().then((savedEntry) => {
    res.json(savedEntry);
  });
});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
