const { MongoClient } = require('mongodb');

// Replace the connection string with your actual connection string
// const uri = 'your_connection_string';
const uri = "mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect().then(() => {
    // Select the database and collection
    const database = client.db('BookWorld');
    const collection = database.collection('parishes');

    // Insert a set of documents into the collection with four attributes
    const dataToInsert = [
        {value: "chch", name:"Christ Church"},
        {value: "sta", name:"St. Andrew"},
        {value: "stg", name:"St. George"},
        {value: "stj", name:"St. James"},
        {value: "stjo", name:"St. John"},
        {value: "stjs", name:"St. Joseph"},
        {value: "stl", name:"St. Lucy"},
        {value: "stm", name:"St. Michael"},
        {value: "stpe", name:"St. Peter"},
        {value: "stph", name:"St. Phillip"},
        {value: "stt", name:"St. Thomas"},
        // Add more documents as needed
    ];

    collection.insertMany(dataToInsert)
        .then(result => {
        console.log(`${result.insertedCount} documents inserted`);
        })
        .finally(() => client.close());
});
