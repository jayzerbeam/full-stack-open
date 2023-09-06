const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

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

const makeRandomNumber = () => {
  const max = 999_999_999;
  return Math.floor(Math.random() * max);
};

const incrementId = () => {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
  return maxId + 1;
};

const hasDupeName = (name) => {
  return phonebook.find(
    (entry) => entry.name.toLowerCase() === name.toLowerCase(),
  );
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

app.post("/api/persons/", (req, res) => {
  const body = req.body;

  const entry = {
    id: incrementId(),
    name: body.name,
    number: String(makeRandomNumber()),
  };

  if (!entry.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  } else if (hasDupeName(entry.name)) {
    return res.status(400).json({
      error: "entry for this name already exists",
    });
  }

  phonebook.concat(entry);

  res.json(entry);
});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
