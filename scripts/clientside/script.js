
// To operate the hamburger menu
function myNavMenu() {
    var x = document.getElementById("nav-links");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        } 
}

function logOut() {
    session = JSON.parse(sessionStorage.getItem("myList", "[]"));
    sessionInfo = JSON.parse(sessionStorage.getItem("userinfo"));

    myCarts = JSON.parse(localStorage.getItem("cartsList", "[]"));

    var sessionLog = {
        "id": sessionInfo.id,
        "cart": session,
    };

    console.log(sessionLog);
    console.log(myCarts);

    myCarts.push(sessionLog);

    //let sessionLogJSON = JSON.stringify(sessionLog);

    localStorage.setItem("cartsList", JSON.stringify(myCarts));

    window.location.href = "../index.html";
}

