const fs = require('fs');
const passwordGen = require('./passwordgen.js');
var validator = require("email-validator");
const mongo = require('./mongodb_functions.js')

function dataHandler(userdata) {
    return checkUser(userdata);
}

function checkUser(user) {
    userdata = user;

    let state = true;

    prefix = userdata.tel.slice(0,3);
    suffix = userdata.tel.slice(4,8);

    console.log("prefix: " + prefix + "suffix: " + suffix)

    let userID = checkId(userdata.id);
    let userFName = checkName(userdata.fname, "first");
    let userLName = checkName(userdata.lname, "last");
    let userEmail = checkEmail(userdata.email);
    // let userAddress = true;
    let userTel = true;

    // if ((userdata.address1 != "") && (userdata.address2 != "")){
    let userAddress = checkAddress(userdata.address1, userdata.address2)
    // }
    
    if (userdata.tel != "-") {
        userTel = checkTelNum(prefix, suffix);
    }

    if ((userID != true )|| (userFName != true) || (userLName != true) || (userEmail !=true) || (userAddress != true)) {
        console.log(userID, userFName, userLName, userAddress, userTel, userEmail);
        state = false;
    }

    return state;
}

function checkId(id) {
    //var valid = true;

    if (id.length == 0) {
        console.log("ID missing");
        return false;
    } else if ((id.length < 11) || (id.length > 11)) {
        console.log("Invalid ID Length");
        return false;
    } else {
        console.log("ID length valid");
    }

    if ((id[0] >= 'A' && id[0] <= 'M')) {
        console.log("Valid ID Digit 1");
    } else {
        console.log("Invalid ID Digit 1");
        return false;
    }

    if ((id[1] >= 'A' && id[1] <= 'M')) {
        console.log("Valid ID Digit 2");
    } else {
        console.log("Invalid ID Digit 2");
        return false;
    }

    for (var i = 2; i < 5; i++) {
        if ((Number(id[i]) >= 0) || (Number(id[i]) <= 9)) {
            console.log("Valid ID Digit " + i);
            continue;
        } else {
            console.log("Invalid ID Digit " + i);
            return false;
        }
    }

    if ((id[5] == '-')) {
        console.log("Valid ID Digit 5");
    } else {
        console.log("Invalid ID Digit 5");
        return false;
    }

    for (var i = 6; i < 9; i++) {
        if ((Number(id[i]) >= 0) || (Number(id[i]) <= 9)) {
            console.log("Valid ID Digit " + i);
            continue;
        } else {
            console.log("Invalid ID Digit " + i);
            return false;
        }
    }

    // 0 1 | 2 3 4 | 5 | 6 7 8 | 9 10

    if ((id[9] >= 'N' && id[9] <= 'Z')) {
        console.log("Valid ID Digit 9");
    } else {
        console.log("Invalid ID Digit 9");
        return false;
    }

    if ((id[10] >= 'N' && id[10] <= 'Z')) {
        console.log("Valid ID Digit 10");
    } else {
        console.log("Invalid ID Digit 10");
        return false;
    }

    return true;
}

function checkName(name, type) {
    if ((name.length > 12)) {
        if (type == "first") {
            console.log("First name invalid");
            //var valid = false;
            return false;
        } else if ((type == "last")) {
            console.log("Last name invalid");
            return false;
        } else {
            console.log("Error.");
        }
    } else if (name.length == 0) {
        if (type == "first") {
            console.log("First name missing.");
            return false;
        } else if ((type == "last")) {
            console.log("Last name missing.");
            return false;
        } else {
            console.log("Error.");
        }
    } else {
        if (type == "first") {
            console.log("First name valid");
            //var valid = false;
        } else if ((type == "last")) {
            console.log("Last name valid");
        } else {
            console.log("Error.");
        }
    }

    return true;
}

function checkEmail(email) {

    if (validator.validate(email)){
        console.log("Email valid");
        return true;
    }

    console.log("Email not valid");
    return false;
}

function checkAddress(addr, secondAddr) {
    if ((addr.length == 0) && (secondAddr.length > 0)) {
        console.log("Addresses invalid")
        return false
    }

    console.log("Addresses valid")
    return true;
}

function checkTelNum(prefix, lineNo) {
    let flag1 = false;
    let flag2 = false;

    console.log(prefix[0])

    if ((prefix.length == 0) && (lineNo.length == 0)) {
        flag1 = true;
        flag2 = true;
    }

    if ((prefix.length == 3)) {
        if (((prefix[0] == 0) || (prefix[0] == 1))) {
            flag1 = false;
        } else {
            console.log("Prefix " + prefix + " Valid")
            flag1 = true;
        }
    } /* else {
        flag1 = false;
    } */

    if (lineNo.length == 4) {
        console.log("Suffix "+lineNo+" Valid")
        flag2 = true;
    } /* else {
        flag2 = false;
    } */

    if (flag1 && flag2) {
        console.log("Tel Valid")
        return true;
    }

    return false
}

function checkPassword(passwd) {
    //passwd = document.getElementById('pswrd').value;

    

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


function newUser(userdata) {
    let password = passwordGen.passwordGenerator();
    console.log(password);

    // let session = makeSessionID(10);

    userdata.password = password;
    mongo.insertUser(userdata);

}

module.exports = {dataHandler, checkId, checkPassword, newUser, checkTelNum};