const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const app = express();
const fileServerMiddleware = express.static("public");
app.use('/', fileServerMiddleware);

let aboutMessage = "Issue Tracker API v0.1";
let defaultName = "Le Quang Nhat";
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

/* The following line is the same as:
    function setAboutMessage(_, { message }) {
        return aboutMessage = message;
    }
*/
let setName = (_, {name}) => defaultName = name;

//resolvers is json-based

const resolvers = {
    Query: {
        about: () => aboutMessage,
        name: () => defaultName
    },
    Mutation: {
        setAboutMessage,
        setName
    }
}

const typeDefs = fs.readFileSync("./server/schemas.graphql", "utf-8");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});