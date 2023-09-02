const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

const phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_, res) => {
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>phonebook has info for ${
      phonebook.length
    } people</p><p>${new Date()}</p>`,
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  res.send(`id: ${id}`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
