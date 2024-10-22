const test = require('./mongodb_functions.js');

// function Book(imgcode, name, author, price) {
//     this.imgcode = imgcode;
//     this.name = name;
//     this.author = author;
//     this.price = price;
// }

// test_book = new Book(100, "Test Book", "Curtis Gittens", 49.99);

// test.init_db();
test.deleteBook(4);
// test.addBook(5);
// console.log("First")
// let record = test.findBook(7);
// console.log("Second")
// test.insertCart(record);
// test.findBook(2);

// console.log((await test.login("AB000-000YZ", "adminG@123")))
// test.exampleUsage("AB000-000YZ", "adminG@123");

// console.log(test.exampleUsage("AB000-000YZ", "adminG@123"))

// test.exampleUsage("AB000-000YZ", "adminH@123##").then((result) => {
//     console.log(result);
//     // Now 'result' contains the boolean value
//     if (result) {
//         // Do something when the user is found
//     } else {
//         // Do something when the user is not found
//     }
// }).catch((error) => {
//     console.error('An error occurred in the outer function:', error);
// });

// const userFound = test.login("AB000-000YZ", "adminG@123");
// console.log(userFound);

// if (Promise.resolve(test.login("AB000-000YZ", "adminG@123")) == false) {
//     console.log("Test Works")
// } 

// if (test.login("AB000-000YZ", "adminG@123") == false) {
//     console.log("Test Works")
// };
// console.log("Result: " + test.returnLastUser())
// test.getLastDocument('users').then(lastDocument => {
//     console.log(lastDocument.id, lastDocument.password);
// });

// test.findUser("AB000-000YZ").then(result => {
//     console.log(result.id, result.fname, result.lname);
//     // res.render('logininfo', {logID: lastDocument.id, logPwd: lastDocument.password})
// });