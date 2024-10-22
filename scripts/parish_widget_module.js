const { MongoClient } = require('mongodb');
let parishString = loadParishData();
let selectString = '<select name="parishId">';
let selectString2 = '</select>';
let inc = 0;

/**
 * Generates the parish select dropdown widget
 */

function genListDropdownStr() {
    // console.log("Parishes: " + parishes)
    return selectString+parishString+selectString2
}

function loadParishData()
{
    const uri = "mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // initialize the string to hold the generated select dropdown box
    client.connect().then(() => {
        const database = client.db('BookWorld');
        const collection = database.collection('parishes');
        // Retrieve all documents in the collection
        const allDocuments = collection.find();
        // Iterate over the documents and log them
        allDocuments.forEach(document => {
            parishString += '<option value=' + document.value + '>' + document.name + '</option>'
            inc++;

            if (inc == 11){
                return parishString;
            }
        })
        .finally(() => client.close());
    })
}


function loadParishes(){
    return genListDropdownStr()
}


module.exports = { loadParishes }