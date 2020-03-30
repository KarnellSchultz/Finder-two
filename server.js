const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 5001;

app.use(cors());

app.get('/', (req, res) => {
	console.log('new request');
	return res.send('YOU DID IT FAM');
});

app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(port, () => console.log(`Shits on port ${port}`));
