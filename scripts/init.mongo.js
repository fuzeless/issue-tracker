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

//* "Use <db>" equivalent in Interactive mode
db = db.getSiblingDB('IssueTrackerDB');

//* Drop documents in "issues" collection
db.issues.remove({});

//* Initial Issues DB
const InitialIssues = [
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
        due: new Date(""),
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
    }
];

//* Insert InitialIssues
//* Print() is used to replace console.log()
db.issues.insertMany(InitialIssues);
const cnt = db.issues.count();
print(`Inserted ${cnt} issues`);

//* Create Index for each field
db.issues.createIndex({id: 1}, {unique: true});
db.issues.createIndex({status: 1});
db.issues.createIndex({created: 1});
db.issues.createIndex({owner: 1});