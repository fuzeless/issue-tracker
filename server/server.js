const express = require('express');
const app = express();
const fileServerMiddleware = express.static("public");
app.use('/', fileServerMiddleware);
// app.get('/app', fileServerMiddleware);

const typeDefs = `
    type Query {
        about: String!
    }
`;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});