const express = require('express');
const app = express();
const fileServerMiddleware = express.static('public');
require('dotenv').config();

app.use(fileServerMiddleware);

const PORT = process.env.UI_SERVER_PORT || 8000;
app.listen(PORT, () => {
    console.log(`UI listening on port ${PORT}!`);
});