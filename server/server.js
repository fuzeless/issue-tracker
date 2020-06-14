const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const app = express();
const fileServerMiddleware = express.static("public");
app.use('/', fileServerMiddleware);

let aboutMessage = "Issue Tracker API v0.1";
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const resolvers = {
    Query: {
        about: () => aboutMessage
    },
    Mutation: {
        setAboutMessage
    }
}

const typeDefs = fs.readFileSync("./server/schemas.graphql", "utf-8");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});