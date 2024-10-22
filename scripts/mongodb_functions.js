const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function resetDB() {
    client.connect().then(() => {
        const database = client.db('BookWorld');

        let collectionsToDrop = ["parishes", "books", "users", "shoppingcart"];

        collectionsToDrop.forEach(coll => {
            const collection = database.collection(coll);

            console.log(coll)
            collection.deleteMany({})
            // collection.drop();
        });
        // client.close()
    })

    // return true
}

function init_db(){
    // Connect to the MongoDB server
    // resetDB();
    
    initCart()
    initUsers()
    initBooks()
    initParishes()
}

function initBooks() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect().then(() => {
        // Select the database
        const database = client.db('BookWorld');
        const collection1 = database.collection('books');

        // Define collection names and corresponding data

            const dataToInsert1 = [
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
            collection1.insertMany(dataToInsert1)
                .then(result => {
                console.log(`${result.insertedCount} documents inserted in books`);
                })
                // .finally(() => client.close());
    })
}

function initUsers() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect().then(() => {
        // Select the database
        const database = client.db('BookWorld');
        const collection2 = database.collection('users');

        // Define collection names and corresponding data

            const dataToInsert2 = { id: 'AB000-000YZ', fname: 'Admin', lname: 'Host', email: 'admin@example.com', tel: '000-0000', address1: 'University of the West Indies', address2: 'Cave Hill', parish: 'stm', password: 'adminH@123##'}
            collection2.insertOne(dataToInsert2)
                .then(result => {
                    console.log(`Document inserted in users with _id: ${result.insertedId}`);
                })
                // .finally(() => client.close());
    })
}

function initCart() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect().then(() => {
        // Select the database
        const database = client.db('BookWorld');
        const collection3 = database.collection('shoppingcart');

        // Define collection names and corresponding data
            const dataToInsert3 = { imgcode: 0, name: 'Nil', author: 'Sample', price: 0.99, path: './Book Icons/book icon 0.png'}
            collection3.insertOne(dataToInsert3)
                .then(result => {
                    console.log(`Document inserted in shoppingcart with _id: ${result.insertedId}`);
                })
                // .finally(() => client.close());
    })
}

function initParishes() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
            console.log(`${result.insertedCount} documents inserted in parishes`);
            })
            .finally(() => client.close());
    });
}

async function findUser(userId) {
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select the database and collection
        const database = client.db('BookWorld');
        const collection = database.collection('users');

        // Define the condition to find the user by userId
        const findCondition = { id: userId };

        // Find the document
        const user = await collection.findOne(findCondition);

        console.log('User found:', user);
        console.log('Used findCondition:', findCondition);

        console.log(user);

        return user; // Return the user object
    } finally {
        // Close the client connection
        await client.close();
    }
}

async function addBook(book) {
    let record;

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select the database and collection
        const database = client.db('BookWorld');
        const srccollection = database.collection('books');

        let findCondition = { imgcode: book };

        // Find the book
        record = await srccollection.findOne(findCondition);

        if (!record) {
            throw new Error('Book not found');
        }

        console.log('Doc found');
        let data = {
            imgcode: record.imgcode,
            name: record.name,
            author: record.author,
            price: record.price,
            path: record.path
        }

        insertCart(data);
    } catch (error) {
        console.error('Error finding book:', error);
        throw new Error('Internal Server Error');
    } finally {
        await client.close();
    }
}

// Function to insert a book into the shopping cart
async function insertCart(bookData) {
    try {
        await client.connect();

        const database = client.db('BookWorld');
        const collection = database.collection('shoppingcart');

        const dataToInsert = {
            imgcode: bookData.imgcode,
            name: bookData.name,
            author: bookData.author,
            price: bookData.price,
            path: bookData.path
        };

        const result = await collection.insertOne(dataToInsert);
        console.log(`Document inserted with _id: ${result.insertedId}`);

        return 'Book added to shopping cart';
    } catch (error) {
        console.error('Error inserting book into cart:', error);
        throw new Error('Internal Server Error');
    } finally {
        await client.close();
    }
}

function insertUser(user) {
    client.connect().then(() => {
    const database = client.db('BookWorld');
    const collection = database.collection('users');

    const dataToInsert = { id: user.id, fname: user.fname, lname: user.lname, email: user.email, tel: user.tel, address1: user.address1, address2: user.address2, parish: user.parish, password: user.password};
    collection.insertOne(dataToInsert)
        .then(result => {
        console.log(`Document inserted with _id: ${result.insertedId}`);
        })
        .finally(() => client.close());
    })
}

async function getLastDocument(collectionName) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('BookWorld');
        const collection = database.collection(collectionName);
        const lastDocument = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        return lastDocument[0];
        } finally {
        await client.close();
        }
}

function deleteBook(book){
    client.connect().then(() => {
        const database = client.db('BookWorld');
        const collection = database.collection('shoppingcart');

        const deleteCondition = { imgcode: book };

        console.log(deleteCondition)

        collection.deleteOne(deleteCondition)
            .then(result => {
            console.log(`Deleted ${result.deletedCount} document`);
            })
            .finally(() => client.close());
        });
}

async function login(username, password) {
    try {
        await client.connect();

        const database = client.db('BookWorld');
        const collection = database.collection('users');
        const findCondition = { id: username, password: password };

        const result = await collection.findOne(findCondition);

        if (result) {
            console.log('User found: ' + username, password);
            return true;
        } else {
            console.log('No user found');
            return false;
        }
    } finally {
        await client.close();
    }
}

module.exports = {init_db, deleteBook, addBook, login, insertUser, getLastDocument, findUser, resetDB};