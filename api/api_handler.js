const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const issue = require('./issue');
require('dotenv').config();

// Resolvers are json-based
const resolvers = {
  Query: {
    about: about.getMessage,
    name: about.getName,
    issueList: issue.issueList,
    issue: issue.getIssue,
    issueCounts: issue.issueCounts,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    setName: about.setName,
    issueAdd: issue.issueAdd,
    issueUpdate: issue.issueUpdate,
    issueDelete: issue.issueDelete,
    issueRestore: issue.issueRestore,
  },
  GraphQLDate,
};

const typeDefs = fs.readFileSync('schemas.graphql', 'utf-8');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('Cors setting: ', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
