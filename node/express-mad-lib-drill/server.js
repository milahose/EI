
'use strict';

const express = require('express');
const app = express();

app.use( express.json() );


app.post('/', (req, res) => {
  return res.send(
    `There's a ${req.body.adjective1} new ${req.body.name} in ${req.body.place} and everyone's talking. 
    Stunningly ${req.body.adjective2} and ${req.body.adverb} ${req.body.adjective3}, all the cool kids know it. 
    However, ${req.body.name} has a secret - ${req.body.name}'s a vile vampire.

    Will it end with a bite, or with a stake through the ${req.body.noun}?`
  );
});


app.listen(process.env.PORT || 3001, () => {
	console.log( `Listening on port ${process.env.PORT || 3001}`);
});