const express = require('express');
const app = express();
const fileServerMiddleware = express.static('public');

app.use(fileServerMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`UI listening on port ${PORT}!`);
});