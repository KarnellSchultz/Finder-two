const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = process.env.PORT || 9000;

const cors = require("cors");
app.use(cors());

const Datastore = require("nedb");
const database = new Datastore("data.db");

database.loadDatabase();

app.get("/", (req, res) => {
  console.log("Root / Hit");
  return res.send("Make a GET to /files ");
});

app.get("/files", (req, res) => {
  console.log({ GET: "/files" });
  // console.log(database);

  database.find({}, (err, docs) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(docs);
      return res.json(docs);
    }
  });
});

// app.get("/count", (req, res) => {
//   // Count all documents in the datastore
//   return database.count({}, function(err, count) {
//     res.json(count);
//   });
// });

app.delete("/remove/:id", (req, res) => {
  let { id } = req.params;
  console.log(`Removing: ${id}`);

  id = parseInt(id, 10); // converting the id into a number

  database.find({ _id: id }, (err, docs) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log(` File Removed: 💥💥`, docs[0].name, `💥💥`);
    }
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

app.listen(port, () =>
  console.log(` 🍒🚄🍒 🍒🚄🍒 🍒🚄🍒Port:${port}🍒🚄🍒 🍒🚄🍒 🍒🚄🍒`)
);
