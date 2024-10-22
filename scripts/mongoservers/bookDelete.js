const { MongoClient } = require('mongodb');

// Replace the connection string with your actual connection string
const uri = 'mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority';

//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect().then(() => {
  // Select the database and collection
  const database = client.db('your_database');
  const collection = database.collection('your_collection');

  // Delete all documents from the collection
  collection.deleteMany({})
    .then(result => {
      console.log(`Deleted ${result.deletedCount} documents`);
    })
    .finally(() => client.close());
});