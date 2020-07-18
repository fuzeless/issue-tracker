const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://fuzeless:49415219126@cluster0.hftok.mongodb.net/IssueTrackerDB?retryWrites=true";
// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';


//non-async method (deprecated)
function testWithCallback(callback) {
    console.log("TestWithCallback Running......\n");
    //Use the new style parser
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((err, client) => {
        if (err) {
            client.close();
            callback(err);
            return;
        }
        const db = client.db();
        const collection = db.collection('employees');
        const employee = {
            id: 5,
            name: {
                first: "Async",
                last: "Callback"
            },
            age: 10,
            organization: "MyOrganization"
        }
        collection.insertOne(employee, (err, result) => {
            if (err) {
                client.close();
                callback(err);
                return;
            }
            console.log("Result of insertion: ", result.insertedId);
            collection.find({ _id: result.insertedId }).toArray((err, docs) => {
                if (err) {
                    client.close();
                    callback(err);
                    return;
                }
                console.log('Result of find:\n', docs);
                client.close();
                callback(err);
            });
        });
    });
}

//with Async
async function testWithAsync() {
    console.log("TestWithAsync Running......\n");
    //Use the new style parser
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log("Connected to DB\n");
        const collection = client.db().collection('employees');
        console.log(`Succesfully retreived collection!\n`);
        const employee = {
            id: 5,
            name: {
                first: "Async",
                last: "Callback"
            },
            age: 10,
            organization: "MyOrganization"
        }
        const result = await collection.insertOne(employee);
        console.log('Result of insertion:\n', result.insertedId);
        const docs = await collection.find({_id: result.insertedId}).toArray();
        console.log('Result of find():\n', docs);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

// testWithCallback((err) => {
//     if (err) {
//         console.log(err);
//     }
// })
testWithAsync();

