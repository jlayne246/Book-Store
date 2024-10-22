const { MongoClient } = require('mongodb');

// Replace the connection string with your actual connection string
// const uri = 'your_connection_string';
const uri = "mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect().then(() => {
    // Select the database and collection
    const database = client.db('BookWorld');
    const collection = database.collection('books');

    // Insert a set of documents into the collection with four attributes
    const dataToInsert = [
        { imgcode: 1, name: 'Adventures in the Gully', author: 'Kanu Brathwaite', price: 49.99, path: './Book Icons/book icon 1.png' },
        { imgcode: 2, name: 'History of Barbados', author: 'John Beckles', price: 65.99, path: './Book Icons/book icon 2.png'  },
        { imgcode: 3, name: 'Bajan Dictionary', author: 'Mary Alsopp', price: 129.99, path: './Book Icons/book icon 3.png' },
        { imgcode: 4, name: 'Holy Bible', author: 'Cambridge', price: 99.99, path: './Book Icons/book icon 4.png' },
        { imgcode: 5, name: 'Holy Quran', author: 'Cambridge', price: 99.99, path: './Book Icons/book icon 5.png' },
        { imgcode: 6, name: 'Bhagavad Gita', author: 'Cambridge', price: 99.99, path: './Book Icons/book icon 6.png' },
        { imgcode: 7, name: 'To Kill a Mockingbird', author: 'Harper Lee', price: 65.99, path: './Book Icons/book icon 7.png' },
        { imgcode: 8, name: 'the Adventures of Tom Sawyer', author: 'Mark Twain', price: 70.00, path: './Book Icons/book icon 8.png' },
        { imgcode: 9, name: 'Animal Farm', author: 'George Orwell', price: 85.99, path: './Book Icons/book icon 9.png' },
        { imgcode: 10, name: 'Into the Unknown', author: 'Wilbur Bradbury', price: 115.00, path: './Book Icons/book icon 10.png' },
        // Add more documents as needed
    ];

    collection.insertMany(dataToInsert)
        .then(result => {
        console.log(`${result.insertedCount} documents inserted`);
        })
        .finally(() => client.close());
});
