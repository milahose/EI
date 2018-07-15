const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
	hostname: req.hostname,
	query: req.query,
	params:	req.params
  });
});


app.listen(process.env.PORT || 3001, () => {
	console.log( `Listening on port ${process.env.PORT || 3001}`);
});
