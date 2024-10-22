const fs = require('fs')
const pWidget = require('./parish_widget_module.js')
const Validation = require('./validations.js');
const SignIn = require('./signinval.js')
const mongo = require('./mongodb_functions.js')
const session = require('express-session')

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://joshualayne246:iCLGluAGcHRX1EIS@bookworlddb.okze4ah.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();

// for parsing application/x-www-form-urlencoded data
app.use(express.urlencoded({extended: true}));

// The directories for the static files. With these defined there is 
// no need to include them in the paths for the static files in the templates
app.use(express.static('css'))
app.use(express.static('scripts'))
app.use(express.static('images'))

// For setting the session
app.use(session({
    secret: 'books-are-life',
    resave: false,
    saveUninitialized: true
}));

// middleware logger function example
const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

// middleware get time function example
const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

// use the middleware logger function
app.use(myLogger)

// get the time
app.use(requestTime)
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

// display the tpl member page template using the view engine
app.get('/registration', (req, res) => {
    res.render('registration', { parishes: pWidget.loadParishes })
})

// display the tpl member page template using res.send instead of the view engine
app.get('/registration_send', (req, res) => {
    fs.readFile('./views/registration.ejs', (err, content) => {
        if (err) return err
        const widget = pWidget.loadParishes(true)
        const html = content.toString()
        .replace('<%= parishes %>', widget)
        res.send(html)
    })
})

app.post('/registration_send', (req, res) => {
	// console.log(res);

	const id = req.body.idNo;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const tel = req.body.tel + "-" + req.body.tel2;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const parish = req.body.parishId;
    
    console.log("ID #: " + id);
    console.log("First Name: " + fname);
    console.log("Last Name: " + lname);
    console.log("Email: " + email);
    console.log("Address 1: " + address1);
    console.log("Address 2: " + address2);
    console.log("Tel #: " + tel);
	console.log("Parish: " + parish);

    console.log("Data received!");

    var userdata = {
        "id" : id,
        "fname": fname,
        "lname": lname,
        "email": email,
        "tel": tel,
        "address1": address1,
        "address2": address2,
        "parish": parish,
        "password": "",
    }

    let valid = Validation.dataHandler(userdata);
    let validTel = Validation.checkTelNum(req.body.tel, req.body.tel2)
    console.log(valid, validTel);

	if (valid && validTel) {
		Validation.newUser(userdata);
		res.redirect('/logininfo')
	}
})

app.get('/registration_send', (req, res) => {
    
})

app.get('/logininfo', (req, res) => { // Note to self, use redirects to a route, then using get, load in page and then load in data and while loading in, render the page using res.send
        mongo.getLastDocument('users').then(lastDocument => {
            console.log(lastDocument.id, lastDocument.password);
            res.render('logininfo', {logID: lastDocument.id, logPwd: lastDocument.password})
        });
    })

app.post('/logininfo', (req, res) => {
    req.session.attempts = 0;
	res.redirect('index');
})

app.get('/index', (req, res) => { // To load normal webpage without variables
    if (req.session.attempts == undefined){
        req.session.attempts = 0;
    }
    console.log(req.session.attempts);
    res.render('index', { disableInput: false, Error: "" })
})

app.post('/index', (req, res) => {
    const id = req.body.idNo2;
    const pwd = req.body.pswrd;

    console.log("Data received");
    console.log(id, pwd)

    let data = {
        username: id,
        password: pwd
    }

    // console.log("State: " + SignIn.exampleUsage2(data))
    SignIn.checkUser(data).then(result => {
        //console.log("Final: " + result);
        if (result) {
            mongo.findUser(id).then(result => {
                console.log(result.id, result.fname, result.lname);
                // res.render('logininfo', {logID: lastDocument.id, logPwd: lastDocument.password})
                req.session.username = result.id;
                req.session.fname = result.fname;
                req.session.lname = result.lname;
                res.redirect('/catalog');
            });
        } else {
            if (req.session.attempts == 2) {
                res.render('index', { disableInput: true, Error: "" });
                // res.redirect("/disable");
            } else {
                setTimeout(() => {
                    req.session.attempts++;
                    console.log("Attempting to disable. Attempts: " + req.session.attempts)
                    // res.redirect("/index")
                    res.render('index', { disableInput: false, Error: "Error: User Not Found" });
                }, 5000);
            }
        }
    }).catch(error => {
        console.error('An error occurred:', error);
    });
})

app.get('/catalog', async (req, res) => {
    try {
        const db = client.db("BookWorld");

        const collection = db.collection('books');

        if (req.session.username == undefined) { // Edit
            res.redirect("/index")
        }

        const limit = 6;

        const bookData = await collection.aggregate([{ $sample: { size: limit } }]).toArray();
        console.log("Books: " + bookData)

        const fname = req.session.fname
        const lname = req.session.lname
        const username = req.session.username
        res.render('catalog', {nametab: fname + " " + lname, idtab: username, bookData: bookData });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
})

// app.post('/catalog', (req, res) => {

// })

app.get('/addBook/:id', (req, res) => {
    const book = Number(req.params.id);
    console.log(book)
    mongo.addBook(book);
    res.redirect('/catalog');
})

app.get('/cart', async (req, res) => {
    try {
        if (req.session.username == undefined) { // Edit
            res.redirect("/index")
        }

        const db = client.db("BookWorld");

        const collection = db.collection('shoppingcart');

        const bookData = await collection.find({}).toArray();

        console.log("Books: " + bookData)

        const fname = req.session.fname
        const lname = req.session.lname
        const username = req.session.username
        res.render('shopping_cart', {nametab: fname + " " + lname, idtab: username, cartData: bookData });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/removeBook/:id', (req, res) => {
    const book = Number(req.params.id);
    console.log(book)
    mongo.deleteBook(book);
    res.redirect('/cart');
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/'); // Redirect to login page after logout
        }
    });
})

app.get('/', (req,resp) => {
    req.session.attempts = 0;
    resp.redirect('/index');
});

// handling post requests
app.post('/registration', (req, res) => {
    res.send(req.body)
})

app.get('/init_db/', (req, res) => {
    // mongo.resetDB()
    if (req.session.init) {
        mongo.init_db();
        res.render('init');
    } else {
        res.redirect('/reset_db/')
    }
});

app.get('/reset_db/', (req, res) => {
    req.session.init = true;
    mongo.resetDB()
    // mongo.init_db();
    res.render('reset');
});

let port = 8000;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});