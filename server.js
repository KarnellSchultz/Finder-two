const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = process.env.PORT || 9000;

const cors = require('cors');
app.use(cors());

const Datastore = require('nedb');
const database = new Datastore('database.db');

database.loadDatabase();

app.get('/', (req, res) => {
	console.log('Root / Hit');
	return res.send('Make a GET to /files ');
});

app.get('/files', (req, res) => {
	console.log({ EndpointGET: '/files' });
	// reply with all files
	return database.find({}, function(err, docs) {
		if (err) return err;
		else {
			console.log(docs.length);
			return res.json(docs);
		}
	});
});

app.get('/count', (req, res) => {
	return database.find({ id }, (err, docs) => {
		if (err) return err;
		else return docs.length;
	});
});

app.post('/files', (req, res) => {
	console.log(req.body);
	database.insert(req.body);
	res.send({ status: 201 });
});

app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(port, () => console.log(`Shits on port ${port}`));
