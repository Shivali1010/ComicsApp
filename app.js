const username = sessionStorage.getItem("username");
if(!username) location.replace("loginPage.html");

const user = document.querySelector("#username");
const capUsername = username.charAt(0).toUpperCase() + username.slice(1);
user.innerText = capUsername +  "!";

const imgContainer = document.querySelector(".image-container");
const imgBtn = document.querySelector("#img-button");
const logoutBtn = document.querySelector("#logout-button");

let resultsArr; 

logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("loginPage.html");
});

imgBtn.addEventListener("click", () => {
    imgContainer.innerHTML = "";

    if(!resultsArr) {
        fetchImage();
        showLoader();
    }
    else {
        showLoader();
        getRandomChar(resultsArr);
    }
});

async function fetchImage() {
    try {
        const response = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1722084916&apikey=8ed2a46ee4555f68b9a09576c5098638&hash=9f030e2658a2aba501d9e5883ec19f29");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        resultsArr = data.data.results;
        getRandomChar(resultsArr);
        //console.log(resultsArr);
    }
    catch(error) {
        console.log(error);
    }
}

function getRandomChar(arr) {
    const randomIdx = Math.floor(Math.random()*arr.length);
    const randomChar = arr[randomIdx];
    const imgURL = randomChar.thumbnail.path + "." + randomChar.thumbnail.extension;
    const charName = randomChar.name;
    showChar(imgURL, charName);
}

function showChar(url, charName) {

    document.querySelector(".loader").remove();
    let img = document.createElement("img");
    img.setAttribute("src", url);
    imgContainer.append(img);
    const char = document.createElement("p");
    imgContainer.append(char);
    char.setAttribute("id", "char-name");
    char.innerText = charName;
}

function showLoader() {
    const loader = document.createElement("div");
    loader.setAttribute("class", "loader");
    imgContainer.append(loader);
}



