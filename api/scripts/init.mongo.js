/*
    * Run using the mongo shell. For remote databases, ensure that the
    * connection string is supplied in the command line. For example:
    * localhost:
    * mongo issuetracker scripts/init.mongo.js
    * Atlas:
    * mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
    * MLab:
    * mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
*/

//* Declare "db" and "print" as global var for eslint, and disable restricted globals
/* global db print */
/* eslint-disable no-restricted-globals */

//* "Use <db>" equivalent in non-interactive mode
db.getSiblingDB('IssueTrackerDB');

//* Drop documents in "issues" collection
db.issues.remove({});
print('"Issues" collection wiped!');

//* Initial Issues DB
const InitialIssues = [
  {
    id: 1,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Missing Title for IssueTracker!!!',
    description: 'Steps to recreate the problem:'
    + '\n1. Refresh the browser.'
    + '\n2. Select "New" in the filter'
    + '\n3. Refresh the browser again. Note the warning in the console:'
    + '\n Warning: Hash history cannot PUSH the same path; a new entry'
    + '\n will not be added to the history stack'
    + '\n4. Click on Add.'
    + '\n5. There is an error in console, and add doesn\'t work.',
  },
  {
    id: 2,
    status: 'Closed',
    owner: 'Ethan',
    created: new Date('2018-07-19'),
    effort: 3,
    due: new Date(''),
    title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!',
    description: 'Steps to recreate the problem:'
    + '\n1. Refresh the browser.'
    + '\n2. Select "New" in the filter'
    + '\n3. Refresh the browser again. Note the warning in the console:'
    + '\n Warning: Hash history cannot PUSH the same path; a new entry'
    + '\n will not be added to the history stack'
    + '\n4. Click on Add.'
    + '\n5. There is an error in console, and add doesn\'t work.',
  },
  {
    id: 3,
    status: 'Assigned',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 8,
    due: new Date('2019-06-08'),
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    description: 'Steps to recreate the problem:'
    + '\n1. Refresh the browser.'
    + '\n2. Select "New" in the filter'
    + '\n3. Refresh the browser again. Note the warning in the console:'
    + '\n Warning: Hash history cannot PUSH the same path; a new entry'
    + '\n will not be added to the history stack'
    + '\n4. Click on Add.'
    + '\n5. There is an error in console, and add doesn\'t work.',
  },
];

//* Insert InitialIssues
//* Print() is used to replace console.log()
db.issues.insertMany(InitialIssues);
const cnt = db.issues.count();
print(`Inserted ${cnt} issues`);

//* Add counters collection
db.counters.remove({ _id: 'issues' });
db.counters.insertOne({ _id: 'issues', current: cnt });

//* Create Index for each field
db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ created: 1 });
db.issues.createIndex({ owner: 1 });
