const { UserInputError } = require('apollo-server-express');
const { getNextSeq, getDB } = require('./db');
require('dotenv').config();

async function issueList(_, { status, effortMin, effortMax, page }) {
  const db = getDB();
  const filter = {};
  if (status) filter.status = status;
  if (effortMax !== undefined || effortMin !== undefined) {
    filter.effort = {};
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
  }

  const PAGE_SIZE = 10;
  const cursor = await db.collection('issues').find(filter)
    .sort({ id: 1 })
    .skip(PAGE_SIZE * (page - 1))
    .limit(PAGE_SIZE);
  const totalCount = await cursor.count(false);
  const issues = cursor.toArray();
  const pages = Math.ceil(totalCount / PAGE_SIZE);
  return { issues, pages };
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
  if (issue.status === 'Assigned' && (issue.owner === '' || !issue.owner)) errors.push('If assigned, field "Owner" must not be empty.');
  // console.log(errors.length);
  if (errors.length > 0) throw new UserInputError('Input error(s) detected', { errors });
}

async function issueAdd(_, { issue }) {
  const db = getDB();
  const passedIssue = issue;
  validation(passedIssue);
  passedIssue.id = await getNextSeq('issues');
  passedIssue.created = new Date();
  passedIssue.due = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4);
  const result = await db.collection('issues').insertOne(passedIssue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

async function getIssue(_, { id }) {
  const db = getDB();
  const issue = await db.collection('issues').findOne({ id });
  return issue;
}

async function issueUpdate(_, { id, changes }) {
  const db = getDB();
  if (changes.title || changes.owner || changes.status) {
    const issue = await db.collection('issues').findOne({ id });
    Object.assign(issue, changes);
    validation(issue);
  }
  await db.collection('issues').updateOne({ id }, { $set: changes });
  const result = await db.collection('issues').findOne({ id });
  return result;
}

async function issueDelete(_, { id }) {
  const db = getDB();
  const issue = await db.collection('issues').findOne({ id });
  if (!issue) return false;
  issue.deleted = new Date();
  let result = await db.collection('deleted_issues').insertOne(issue);
  if (result.insertedId) {
    result = await db.collection('issues').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function issueCounts(_, { status, effortMin, effortMax }) {
  const filter = {};
  if (status) filter.status = status;
  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
  }

  const db = getDB();
  const results = await db.collection('issues').aggregate([
    { $match: filter },
    {
      $group: {
        _id: { owner: '$owner', status: '$status' },
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const stats = {};
  results.forEach((result) => {
    // eslint-disable-next-line no-underscore-dangle
    const { owner, status: statusKey } = result._id;
    if (!stats[owner]) stats[owner] = { owner };
    stats[owner][statusKey] = result.count;
  });

  return Object.values(stats);
}

module.exports = { issueAdd, issueList, getIssue, issueUpdate, issueDelete, issueCounts };
