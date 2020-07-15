const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const fs = require('fs');
const { Kind } = require('graphql/language');
const app = express();
const fileServerMiddleware = express.static("public");
app.use('/', fileServerMiddleware);

let aboutMessage = "Issue Tracker API v0.1";
let defaultName = "Le Quang Nhat";

//Temp DB for API testing:
const issuesDB = [
    {
        id: 1,
        status: 'New',
        owner: 'Fuzeless',
        created: new Date('2019-05-30'),
        effort: 5,
        due: new Date('2019-06-08'),
        title: 'Missing Title for IssueTracker!!!'
    },
    {
        id: 2,
        status: 'Closed',
        owner: 'Ethan',
        created: new Date('2018-07-19'),
        effort: 5,
        due: new Date('2020-07-08'),
        title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!"
    },
    {
        id: 3,
        status: 'New',
        owner: 'Fuzeless',
        created: new Date('2019-05-30'),
        effort: 5,
        due: new Date('2019-06-08'),
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        id: 4,
        status: 'New',
        owner: 'Fuzeless',
        created: new Date('2019-05-30'),
        effort: 5,
        due: new Date('2019-06-08'),
        title: 'Missing Title for IssueTracker'
    }
]

/* The following line is the same as:
    function setAboutMessage(_, { message }) {
        return aboutMessage = message;
    }
*/
//Also, Mutation functions.
let setName = (_, {name}) => defaultName = name;
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}
function issueAdd(_, { issue }) {
    issue.id = issuesDB.length + 1;
    issue.created = new Date();
    if (issue.status === undefined) issue.status = "New";
    issuesDB.push(issue);
    return issue;
}

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date type in GraphQL as custom scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast){
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    }
})
//Resolvers are json-based
const resolvers = {
    Query: {
        about: () => aboutMessage,
        name: () => defaultName,
        issueList: () => issuesDB
    },
    Mutation: {
        setAboutMessage,
        setName,
        issueAdd
    },
    GraphQLDate
}

const typeDefs = fs.readFileSync("./server/schemas.graphql", "utf-8");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});