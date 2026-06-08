const { MongoClient } = require('mongodb');
require('dotenv').config({path: '.env'});

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    await db.collection('users').updateMany({}, { $set: { bytes: 0 } });
    console.log('Reset all users bytes to 0');
  } catch(err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
run();
