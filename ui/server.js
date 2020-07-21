const express = require('express');
const app = express();
const fileServerMiddleware = express.static('public');
require('dotenv').config();

app.use(fileServerMiddleware);

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || "http://localhost:3000/graphql";
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});

const PORT = process.env.UI_SERVER_PORT || 8000;
app.listen(PORT, () => {
    console.log(`UI listening on port ${PORT}!`);
});