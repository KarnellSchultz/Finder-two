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
  id = parseInt(id, 10); // converting the id into a number
  database.find({}, (err, docs) => {
    if (err) console.log(err);
    else deleteItem(id);
  });
  return res.json("deleted item");
});

function deleteItem(id) {
  database.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Removed: ✅ ${numRemoved}`);
    }
  });
}

app.post("/files", (req, res) => {
  console.log(req.body);
  database.insert(req.body);
  res.send({ status: 201 });
});

app.listen(port, () => console.log(`🍒🍒🍒🍒🍒🍒${port}🍒🍒🍒🍒🍒🍒`));
