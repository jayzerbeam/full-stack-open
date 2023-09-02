const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

let phonebook = [
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

const getEntry = (id) => {
  return phonebook.find((item) => {
    return item.id === id;
  });
};

const removeEntry = (id) => {
  return phonebook.filter((item) => {
    return item.id !== id;
  });
};

app.get("/api/persons", (_, res) => {
  res.json(phonebook);
});

app.get("/info", (_, res) => {
  res.send(
    `<p>phonebook has info for ${
      phonebook.length
    } people</p><p>request info: ${new Date()}</p>`,
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = getEntry(id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = removeEntry(id);
  console.log(phonebook);

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
