const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const fs = require('fs');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const app = express();

let db; let collection;
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

//*MongoDB stuff

async function connectToDB() {
    let uri = "mongodb+srv://fuzeless:49415219126@cluster0.hftok.mongodb.net/IssueTrackerDB";
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Database connected succesfully to ", uri);
    db = client.db();
    collection = db.collection('issues');
}

async function getNewSeq(collectionName) {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: collectionName },
        { $inc: { current: 1 } },
        { returnOriginal: false }
    );
    return result.value.current;
}

//*End of MongoDB stuff

//* GraphQL Stuff
/* The following line is the same as:
    function setAboutMessage(_, { message }) {
        return aboutMessage = message;
    }
*/
//Also, Mutation functions.
let setName = (_, { name }) => defaultName = name;
async function issueList() {
    const issues = await db.collection('issues').find({}).toArray();
    return issues;
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

//* Old issueAdd()
// function issueAdd(_, { issue }) {
//     validation(issue);
//     // console.log(_);
//     issue.id = issuesDB.length + 1;
//     issue.created = new Date();
//     // if (issue.status === undefined) issue.status = "New";
//     issuesDB.push(issue);
//     return issue;
// }

async function issueAdd(_, { issue }) {
    validation(issue);
    issue.id = await getNewSeq('issues');
    issue.created = new Date();
    const result = await db.collection('issues').insertOne(issue);
    const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
    return savedIssue;
}

function validation(issue) {
    const errors = [];
    if (issue.title.length < 3)
        errors.push('Field "Title" must be at least 3 characters long.');
    if (issue.status == "Assigned" && issue.owner != "")
        errors.push('If assigned, field "Owner" must not be empty.');
    // console.log(errors.length);
    if (errors.length > 0)
        throw new UserInputError("Input error(s) detected", { errors });
}

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date type in GraphQL as custom scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        console.log("Literal");
        const value = new Date(ast.value);
        return (ast.kind == Kind.STRING && !Number.isNaN(value)) ? value : undefined;
    }
});

//Resolvers are json-based
const resolvers = {
    Query: {
        about: () => aboutMessage,
        name: () => defaultName,
        issueList,
    },
    Mutation: {
        setAboutMessage,
        setName,
        issueAdd
    },
    GraphQLDate
};
//* End of GraphQL stuff

const typeDefs = fs.readFileSync("schemas.graphql", "utf-8");

const server = new ApolloServer({
    typeDefs, resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
});
server.applyMiddleware({ app, path: '/graphql' });


const PORT = process.env.PORT || 3000;
(async function () {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`API listening on port ${PORT}!`);
        });
    } catch (error) {
        console.log("ERROR: ", error)
    }
})();

