/* eslint-disable no-console */
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const GraphQLDate = require('./graphql_date.js');
const about = require('./about');

const app = express();

//* Inject(?) into env variables?
require('dotenv').config();

let db;

//* Temp DB for API testing:
// eslint-disable-next-line no-unused-vars
const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Missing Title for IssueTracker!!!',
  },
  {
    id: 2,
    status: 'Closed',
    owner: 'Ethan',
    created: new Date('2018-07-19'),
    effort: 5,
    due: new Date('2020-07-08'),
    title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!',
  },
  {
    id: 3,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 4,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Missing Title for IssueTracker',
  },
];

//* MongoDB stuff

async function connectToDB() {
  const uri = process.env.DB_URL || 'mongo://localhost/IssueTrackerDB';
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
  console.log('Database connected succesfully to ', uri);
  db = client.db();
}

async function getNewSeq(collectionName) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: collectionName },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

//* End of MongoDB stuff

//* GraphQL Stuff

async function issueList() {
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
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

function validation(issue) {
  const errors = [];
  if (issue.title.length < 3) errors.push('Field "Title" must be at least 3 characters long.');
  if (issue.status === 'Assigned' && issue.owner !== '') errors.push('If assigned, field "Owner" must not be empty.');
  // console.log(errors.length);
  if (errors.length > 0) throw new UserInputError('Input error(s) detected', { errors });
}

async function issueAdd(_, { issue }) {
  const passedIssue = issue;
  validation(passedIssue);
  passedIssue.id = await getNewSeq('issues');
  passedIssue.created = new Date();
  const result = await db.collection('issues').insertOne(passedIssue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

// Resolvers are json-based
const resolvers = {
  Query: {
    about: () => about.getMessage,
    name: () => about.getName,
    issueList,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    setName: about.setName,
    issueAdd,
  },
  GraphQLDate,
};
//* End of GraphQL stuff

const typeDefs = fs.readFileSync('schemas.graphql', 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});
const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('Cors setting: ', enableCors);
server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

const PORT = process.env.API_SERVER_PORT || 3000;
(async function main() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log('ERROR: ', error);
  }
}());
