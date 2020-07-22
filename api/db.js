const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDB() {
  const uri = process.env.DB_URL || 'mongo://localhost/IssueTrackerDB';
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
  console.log('Database connected succesfully to ', uri);
  db = client.db();
}

async function getNextSeq(collectionName) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: collectionName },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function getDB() {
  return db;
}

module.exports = { connectToDB, getNextSeq, getDB };
