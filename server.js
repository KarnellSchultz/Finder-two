const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = process.env.PORT || 9000;

const cors = require("cors");
app.use(cors());

const Datastore = require("nedb");
const database = new Datastore("database.db");

database.loadDatabase();

app.get("/", (req, res) => {
  console.log("Root / Hit");
  return res.send("Make a GET to /files ");
});

app.get("/files", (req, res) => {
  console.log({ EndpointGET: "/files" });
  // reply with all files
  return database.find({}, (err, docs) => {
    if (err) return err;
    else {
      console.log(docs.length);
      return res.json(docs);
    }
  });
});

app.delete("/remove/:id", (req, res) => {
  let { id } = req.params;
  console.log(`Removing: ${id}`);
  console.log(parseInt(id, 10));
  id = parseInt(id, 10);

  database.find({ _id: id }, {}, (err, result) => {
    console.log(result.name);
  });

  return database.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      console.error(err);
      return res.send(`Server Error when trying to remove document id: ${id}`);
    } else {
      console.log(`Removed: ✅ ${numRemoved}`);
      return res.json(numRemoved);
    }
  });
});

app.post("/files", (req, res) => {
  console.log(req.body);
  database.insert(req.body);
  res.send({ status: 201 });
});

app.listen(port, () => console.log(` 🍒🚄🍒Port:${port}`));
