const { MongoClient } = require('mongodb');

// Replace the connection string with your actual connection string
const uri = 'mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connect to the MongoDB server
client.connect().then(() => {
    // Select the database and collection
    const database = client.db('BookWorld');
    const collection = database.collection('books');

    readline.question('What do you want to search by?: ', choice => {
        //readline.close();

        switch (choice) {
            case 'all':
                //Retrieve all documents in the collection
                const allDocuments = collection.find();

                // Iterate over the documents and log them
                allDocuments.forEach(document => {
                    console.log(document);
                })
                .finally(() => client.close());

                readline.close();

                break;
            case 'author':
                readline.question('What author you searching with?: ', authorQ => {
                    const AuthorQuery = collection.find({ author: authorQ });

                    AuthorQuery.forEach(document => {
                    console.log(document);
                    })
                    .finally(() => client.close());
                })
                
                readline.close();

                break;
            case 'name':
                readline.question('What name you searching with?: ', nameQ => {
                    const NameQuery = collection.find({ name: nameQ });

                    NameQuery.forEach(document => {
                    console.log(document);
                    })
                    .finally(() => client.close());
                })

                readline.close();

                break;
            case 'image code':
                readline.question('What image code or ID you searching with?: ', imgQ => {
                    const IMGQuery = collection.find({ imgcode: imgQ });

                    IMGQuery.forEach(document => {
                    console.log(document);
                    })
                    .finally(() => client.close());
                })

                readline.close();

                break;
            
            case 'price':
                readline.question('What price you searching with?: ', priceQ => {
                    const IMGQuery = collection.find({ price: priceQ });

                    IMGQuery.forEach(document => {
                    console.log(document);
                    })
                    .finally(() => client.close());
                })

                readline.close();

                break;
            default:
                console.log("Invalid!");
        }
    });

    // Retrieve all documents in the collection
    // const allDocuments = collection.find();

    // // Iterate over the documents and log them
    // allDocuments.forEach(document => {
    //     console.log(document);
    // })
    // .finally(() => client.close());

    // To query by author
    // const AuthorQuery = collection.find({ author: 'John Beckles' });

    // AuthorQuery.forEach(document => {
    // console.log(document);
    // })
    // .finally(() => client.close());
});