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

module.exports = {passwordGenerator}