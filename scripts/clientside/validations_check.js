// const fs = require('fs')
// const mongo = require('mongo')

var id_Num;
var fname;
var lname;
var email;
var userParam;

//jsonStore();
//validate();

// To check ID

function checkId(id) {
    var valid = true;

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
    if (email.length == 0) {
        emailErrorBox = document.getElementById('emailError');
        emailErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Information missing. </span>";

        console.log ("Email missing");
        return false;
    }

    for (var i = 0; i < email.length; i++) {
        if (email[i] == '@') {
            console.log("Email valid");
            return true;
        }
    }

    console.log ("Email not valid");
    return false;
}

function isEmpty(type, string) {
    if ((type == "id") && (string.length == 0)) {
        return true;
    } else if ((type == "first") && (string.length == 0)) {
        return true;
    } else if ((type == "last") && (string.length == 0)) {
        return true;
    } else if ((type == "email") && (string.length == 0)) {
        return true;
    } else {
        return false;
    }
}

function validate() {
    console.log("Validating...");

    id_Num = document.getElementById('idNo').value;
    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    email = document.getElementById('email').value;
    tel1 = document.getElementById('tel').value;
    tel2 = document.getElementById('tel2').value;
    address1 = document.getElementById('address1').value;
    address2 = document.getElementById('address2').value;

    // document.addEventListener("click", checkTel(tel1.value, tel2.value));

    let id_Numbox = document.getElementById('idNo');
    let fnamebox = document.getElementById('fname');
    let lnamebox = document.getElementById('lname');
    let emailbox = document.getElementById('email');
    let telbox = document.getElementById('tel');
    let tel2box = document.getElementById('tel2');
    let address1box = document.getElementById('address1');
    let address2box = document.getElementById('address2');

    //console.log(tel2box.value);

    valID = checkId(id_Num);
    valFName = checkName(fname, "first");
    valLName = checkName(lname, "last");
    valEmail = checkEmail(email);
    valTel = checkTelNum(tel1, tel2);
    valAddr = checkAddress(address1, address2);

    // console.log(valID, valFName, valLName, valEmail, valTel, valAddr)

    // valTel = document.addEventListener('DOMContentLoaded', function () {
    //     const validateButton = document.getElementById('submit');
    //     field1 = document.getElementById("tel");
    //     field2 = document.getElementById("tel2");
    //     validateButton.addEventListener('click', checkTelNum(field1, field2));
    // });

    console.log(valID, valFName, valLName, valEmail, valTel, valAddr)

    if (isEmpty("id", id_Num) == true) {
        IDErrorBox = document.getElementById('idError');
        IDErrorBox.innerHTML = "<span style='color: red;'>"+
                                    "Error: Information missing. </span>";
        id_Numbox.setAttribute("style", "border: 1px solid red;");
    } else if (valID == false) {
        IDErrorBox = document.getElementById('idError');

        //IDErrorBox.textContent = "Error: Invalid ID";
        //IDErrorBox.style.color = "red";

        IDErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Invalid ID Format. </span>";
        id_Numbox.setAttribute("style", "border: 1px solid red;");
    } else {
        IDErrorBox = document.getElementById('idError');
        id_Numbox.setAttribute("style", "border: 1px solid grey;");
        //IDErrorBox.textContent = "";
        IDErrorBox.innerHTML = "";
    }

    if (isEmpty("first", fname) == true) {
        fnameErrorBox = document.getElementById('fnameError');
        fnameErrorBox.innerHTML = "<span style='color: red;'>"+
                                    "Error: Information missing. </span>";
        fnamebox.setAttribute("style", "border: 1px solid red;");
    }
    else if (valFName == false) {
        fnameErrorBox = document.getElementById('fnameError');
        fnamebox.setAttribute("style", "border: 1px solid red;");
        fnameErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Invalid Name Length. </span>";
    } else {
        fnameErrorBox = document.getElementById('fnameError');
        //IDErrorBox.textContent = "";
        fnamebox.setAttribute("style", "border: 1px solid grey;");
        fnameErrorBox.innerHTML = "";
    }

    if (isEmpty("last", lname) == true) {
        lnameErrorBox = document.getElementById('lnameError');
        lnamebox.setAttribute("style", "border: 1px solid red;");
        lnameErrorBox.innerHTML = "<span style='color: red;'>"+
                                    "Error: Information missing. </span>";
    } else if (valLName == false) {
        lnameErrorBox = document.getElementById('lnameError');
        lnamebox.setAttribute("style", "border: 1px solid red;");
        lnameErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Invalid Name Length. </span>";
    } else {
        lnameErrorBox = document.getElementById('lnameError');
        //IDErrorBox.textContent = "";
        lnamebox.setAttribute("style", "border: 1px solid grey;");
        lnameErrorBox.innerHTML = "";
    }

    if (isEmpty("email", email) == true) {
        emailErrorBox = document.getElementById('emailError');
        emailbox.setAttribute("style", "border: 1px solid red;");
        emailErrorBox.innerHTML = "<span style='color: red;'>"+
                                    "Error: Information missing. </span>";
    } else if (valEmail == false) {
        emailErrorBox = document.getElementById('emailError');

        //IDErrorBox.textContent = "Error: Invalid ID";
        //IDErrorBox.style.color = "red";
        emailbox.setAttribute("style", "border: 1px solid red;");
        emailErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Invalid Email Format. </span>";
    } else {
        emailErrorBox = document.getElementById('emailError');
        //IDErrorBox.textContent = "";
        emailbox.setAttribute("style", "border: 1px solid grey;");
        emailErrorBox.innerHTML = "";
    }

    if (valTel == false) {
        telErrorBox = document.getElementById('telError');

        //IDErrorBox.textContent = "Error: Invalid ID";
        //IDErrorBox.style.color = "red";
        telbox.setAttribute("style", "border: 1px solid red;");
        tel2box.setAttribute("style", "border: 1px solid red;");
        telErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Invalid Telephone Number. </span>";
    } else {
        telErrorBox = document.getElementById('telError');
        //IDErrorBox.textContent = "";
        telbox.setAttribute("style", "border: 1px solid grey;");
        tel2box.setAttribute("style", "border: 1px solid grey;");
        telErrorBox.innerHTML = "";
    }

    if (valAddr == false) {
        addrErrorBox = document.getElementById('addrError');

        //IDErrorBox.textContent = "Error: Invalid ID";
        //IDErrorBox.style.color = "red";
        address1box.setAttribute("style", "border: 1px solid red;");
        addrErrorBox.innerHTML = "<span style='color: red;'>"+
                        "Error: Cannot have Address 1 empty\n and Address 2 filled. </span>";
    } else {
        addrErrorBox = document.getElementById('addrError');
        //IDErrorBox.textContent = "";
        address1box.setAttribute("style", "border: 1px solid grey;");
        addrErrorBox.innerHTML = "";
    }

    if ((valID == false) || (valFName == false) || (valLName == false) || (valEmail == false) || (valTel == false) || (valAddr == false)) {
        valid = false;
    } else {
        valid = true;
        //jsonStore(id_Num, fname, lname, email);
    }

    return valid;
}

function passwordGenerator() {
    var charsA = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charsB = "0123456789" 
    var charsCm = "abcdefghijklmnopqrstuvwxyz";
    var Symbol = "!@#$%^&*()_+~|}{[]:;?><,./-=";
    var Caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //var charC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    //console.log(Caps);

    var passwordLength = Math.floor(Math.random() * (14 - 12 + 1) ) + 12;
    var password = "";

    console.log(passwordLength);

    var randomNumber = Math.floor(Math.random() * charsA.length);
    password += charsA.substring(randomNumber, randomNumber +1);

    for (var i = 0; i <= passwordLength; i++) {

        var index = Math.floor(Math.random() * 4) + 1;

        if ((password.length) == passwordLength){
            break;
        }

        switch (index) {
            case 1:
                var randomNumber = (Math.floor(Math.random() * charsB.length));
                password += charsB.substring(randomNumber, randomNumber +1);
                continue;
            
            case 2:
                var randomNumber = (Math.floor(Math.random() * charsCm.length));
                password += charsCm.substring(randomNumber, randomNumber +1);
                continue;
        
            case 3:
                var randomNumber = (Math.floor(Math.random() * Symbol.length));
            password += Symbol.substring(randomNumber, randomNumber +1);
                continue;

            case 4:
                var randomNumber = (Math.floor(Math.random() * Caps.length));
                password += Caps.substring(randomNumber, randomNumber +1);
                continue;

            default:
                continue;
        }
    }


    return password;
}

// let tel1 = document.getElementById("tel")
// let tel2 = document.getElementById("tel2")

// console.log(tel1.value, tel2.value);

// document.addEventListener("click", checkTel(tel1.value, tel2.value));

// document.addEventListener('DOMContentLoaded', function () {
//     const validateButton = document.getElementById('submit');
//     field1 = document.getElementById("tel");
//     field2 = document.getElementById("tel1");
//     validateButton.addEventListener('click', checkTelNum(field1, field2));
// });

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

function checkAddress(addr, secondAddr) {
    if ((addr.length == 0) && (secondAddr.length > 0)) {
        return false
    }

    return true;
}

/* function jsonStore(id_Num, fname, lname, email){
    id = id_Num;
    firstName = fname;
    lastName = lname;
    emailText = email;

    console.log("Data to be stored: " + id + " " + firstName + " " + lastName + " " + emailText);

    var formData = {
        "id":id,
        "firstName":firstName,
        "lastName":lastName,
        "email":emailText,
    }; 

    formUser = formData;

    //newUser(formUser);

    return formUser;
} */

/* if (validate() == true) {
    userParam = jsonStore(id_Num, fname, lname, email);
} */

function newUser(user){

    //if(document.getElementById('submit').clicked == true)
    
        if (validate() == true) {
            // var pwd = passwordGenerator();

            // user.password = password;
            // mongo.insertUser(user);
    
            // newPage(user.id, pwd); //replace with window.location... in final
    
        } else {
            console.log("Fix inputted data.");
        }
    }


function newPage(id, password){
    // window.location.href = "./logininfo.html";

    console.log("New page - Test");

}

