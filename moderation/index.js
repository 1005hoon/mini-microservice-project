const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

// comment moderation
app.post('/events', (req, res) => {

})

app.listen(4003, () => {
  console.log('moderation running on port 4003');
})
