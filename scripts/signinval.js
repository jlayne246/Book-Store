var exportData;
const rejects = [];
var failCount = 0;
const mongo = require('./mongodb_functions.js');

async function checkUser(data) {
    try {
        const userIDValid = checkIdno(data.username);
        const passwordValid = checkPassword(data.password);

        if (userIDValid && passwordValid) {
            const userFound = await mongo.login(data.username, data.password);

            if (userFound) {
                console.log("ID and Passwords Valid, and User Found");
                return true;
            } else {
                console.log("ID and Passwords Valid, but User Not Found");
                return false;
            }
        } else {
            console.log("ID or Passwords Invalid");
            return false;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
}

function checkIdno(Id) {
    field1 = Id.substr(0, 2);
    field2 = Id.substr(2, 3);
    field3 = Id.substr(6, 3);
    field4 = Id.substr(9, 2);

    console.log(field1);
    console.log(field2);
    console.log(field3);
    console.log(field4);

    for (var i = 0; i < field1.length; i++) {
        if ((field1[i] >= 'A' && field1[i] <= 'M')) {
            console.log("Valid ID Digit 1");
        } else {
            console.log("Invalid ID Digit 1");
            return false;
        }
    }

    for (var i = 0; i < field2.length; i++) {
        if ((Number(field2[i]) >= 0) || (Number(field2[i]) <= 9)) {
            console.log("Valid ID Digit " + (i+2));
            continue;
        } else {
            console.log("Invalid ID Digit " + (i+2));
            return false;
        }
    }

    for (var i = 0; i < field3.length; i++) {
        if ((Number(field3[i]) >= 0) || (Number(field3[i]) <= 9)) {
            console.log("Valid ID Digit " + (i+5));
            continue;
        } else {
            console.log("Invalid ID Digit " + (i+5));
            return false;
        }
    }

    for (var i = 0; i < field4.length; i++) {
        if ((field4[i] >= 'N' && field4[i] <= 'Z')) {
            console.log("Valid ID Digit 1");
        } else {
            console.log("Invalid ID Digit 1");
            return false;
        }
    }

    return true;
}

function checkPassword(passwd) {
    symbols = "!@#$%^&*()_+~|}{[]:;?><,./-=";

    var isCap = 0;
    var isCom = 0;
    var isNum = 0;
    var isSymbol = 0;

    for (var i = 0; i < symbols.length; i++) {
        if (passwd[0] == symbols[i]) {
            console.log("Invalid Password Character 1");
            return false;
        }
    }

    if ((passwd.length < 12) || (passwd.length > 15)) {
        console.log(passwd.length);
        console.log("Invalid Password Length");
        return false;
    }

    for (i = 0; i < passwd.length; i++) {
        if (((passwd[i] >= 'A') && (passwd[i] <= 'Z'))) {
            //isNoCaps = false;

            isCap++;
        } else {
            //isNoCaps = true;
            //break;
        }

        if (((passwd[i] >= 'a') && (passwd[i] <= 'z'))) {
            isCom++;
        }

        if (((passwd[i] > 0) || (passwd[i] < 9))) {
            isNum++;
        }

        for (j = 0; j < symbols.length; j++) {
            if (passwd[i] == symbols[j]) {
                isSymbol++;
            }
        }
    }

    console.log("Capitals: " + isCap + " | Commons: " + isCom + " | Numbers: " + isNum + " | Symbols: " + isSymbol);

    if ((isCap == 0) || (isNum == 0) || (isCom == 0) || (isSymbol == 0)) {
        console.log ("Password must contain at least one uppercase, lowercase, symbol, and number.")
        return false;
    }

    return true;
}

module.exports = {checkUser}