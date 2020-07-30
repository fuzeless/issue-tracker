const { UserInputError } = require('apollo-server-express');
const { getNextSeq, getDB } = require('./db');
require('dotenv').config();

async function issueList(_, { status }) {
  const db = getDB();
  const filter = {};
  if (status) filter.status = status;
  const issues = await db.collection('issues').find(filter).toArray();
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
  const db = getDB();
  const passedIssue = issue;
  validation(passedIssue);
  passedIssue.id = await getNextSeq('issues');
  passedIssue.created = new Date();
  const result = await db.collection('issues').insertOne(passedIssue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

async function getIssue(_, { id }) {
  const db = getDB();
  const issue = await db.collection('issues').findOne({ id });
  return issue;
}

module.exports = { issueAdd, issueList, getIssue };
