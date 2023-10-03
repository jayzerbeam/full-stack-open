require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Entry = require("./models/mongo.js");
const PORT = process.env.PORT;

morgan.token("req-body", (req, _) => {
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
  await Entry.findById(req.params.id)
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

app.delete("/api/persons/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  });
});

app.put("/api/persons/:id", async (req, res, next) => {
  const body = req.body;

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  await Entry.findByIdAndUpdate(
    req.params.id,
    { name: entry.name, number: entry.number },
    { new: true, runValidators: true, context: "query" },
  )
    .then((updatedEntry) => {
      console.log(updatedEntry);
      res.status(200).json({ message: "entry updated" });
    })
    .catch((error) => next(error));
});

app.post("/api/persons/", async (req, res, next) => {
  const body = req.body;

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  if (!entry.name) {
    res.status(400).json({
      error: "name is missing",
    });
  }

  const doesEntryExist = await Entry.findOne({ name: entry.name });

  if (doesEntryExist) {
    await Entry.findOneAndUpdate({ name: entry.name }, { number: entry.number })
      .then(() => {
        res.status(200).json({ message: "number updated" });
      })
      .catch((error) => next(error));
  } else {
    entry
      .save()
      .then((savedEntry) => {
        res.json(savedEntry);
      })
      .catch((error) => next(error));
  }
});

const errorHandler = (error, _, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
