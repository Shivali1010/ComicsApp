const form = document.querySelector("#form");
const loginBtn = document.querySelector("#login-button");
const inputUsername = document.querySelector("input[type='text']");
const inputPassword = document.querySelector("input[type='password']");
const warningMsg = document.querySelector(".warning-msg");

inputUsername.addEventListener("input", (evt) => {
    let input = evt.target.value;
    if(input) warningMsg.innerText = "";
});
inputPassword.addEventListener("input", (evt) => {
    let input = evt.target.value;
    if(input) warningMsg.innerText = "";
});

loginBtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    const username = inputUsername.value;
    const password = inputPassword.value;

    if(!username || !password) {
        warningMsg.innerText = "Please enter your username and password";
    }
    
    else {
        getData(username, password)
        .then((result) => {
            
            if(result) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("password", password);
                location.replace("homePage.html");
            }
            else {
                inputUsername.value = "";
                inputPassword.value = "";
                warningMsg.innerText = "Invalid username or password";
            }
        });
    }
    
    
});

async function getData(username, password) {

    const response = await fetch("./data.json");
    const myData = await response.json();
    
    for(user of myData) {
        if(user["username"] === username && user["password"] === password) {
            return true;
        }
    }
    return false;

}




