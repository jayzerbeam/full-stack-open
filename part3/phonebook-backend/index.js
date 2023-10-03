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

app.get("/api/persons", (_, res) => {
  Entry.find({}).then((entry) => {
    console.log(entry);
    res.json(entry);
  });
});

app.get("/info", async (_, res) => {
  const count = await Entry.countDocuments({});
  res.send(
    `<p>phonebook has info for ${count} people</p><p>request info: ${new Date()}</p>`,
  );
});

app.get("/api/persons/:id", async (req, res, next) => {
  const entry = await Entry.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

const makeRandomNumber = () => {
  const max = 999_999_999;
  return Math.floor(Math.random() * max);
};

app.delete("/api/persons/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  });
});

app.patch("/api/persons/:id", async (req, res, next) => {
  const body = req.body;

  const entry = new Entry({
    name: body.name,
    number: String(makeRandomNumber()),
  });

  await Entry.findOneAndUpdate({ name: entry.name }, { number: entry.number })
    .then(() => {
      res.status(200).json({ message: "number updated for this Entry" });
    })
    .catch((error) => next(error));
});

app.post("/api/persons/", async (req, res) => {
  const body = req.body;

  const entry = new Entry({
    name: body.name,
    number: String(makeRandomNumber()),
  });

  if (!entry.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  } else {
    entry.save().then((savedEntry) => {
      res.json(savedEntry);
    });
  }
});

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ message: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
