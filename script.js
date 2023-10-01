document.onload = Time();

window.addEventListener("load", () => {
    // Creates an unique localStorage for whole page.
    makeStorage();
    
    const checkboxes = [...document.querySelectorAll(".checkbox i")];
    // JSON.parse() is used to create an object from previously stringified object that is stored in "checkboxes" key.
    const storage = JSON.parse(localStorage.getItem("checkboxes"));
    
    checkboxes.forEach(checkbox => {
        // Based on the fact that every checkbox has an id with an unique prefix (welcome, time, favorites) followed by "-" .split() is used to get the unique "type" of checkbox.
        const type = checkbox.id.split("-")[0];
        const isChecked = getCheckboxStatus(type, storage);

        // Defining the target of checkbox.
        const field = document.querySelector(`.${type}`);

        if(isChecked) {
            checkbox.classList.add("fa-check");
            field.classList.remove(`invisible-${type}`);
        }

        else {
            checkbox.classList.remove("fa-check");
            field.classList.add(`invisible-${type}`);
        }
    });
});

function makeStorage() {    
    // Checks whether "checkboxes" key exists or not. If it doesn't then the storage will be created.
    if(localStorage.getItem("checkboxes") === null) {
        // Every property represents one checkbox with a key that will be used as a "type" of checkbox and a value which is whether the checkbox is active or not.
        const checkboxes = { welcome: true, time: true, favorites: true };
        // JSON.stringify() got to be used if .setItem() type is an object.
        localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
    }
}

function Time() {
    // getting & displaying the time

    var p = document.getElementById("time");

    var d = new Date();

    var h = d.getHours()
    var m = d.getMinutes()
    var s = d.getSeconds()

    if (h < 10) {
        h = "0" + h;
    }

    if (m < 10) {
        m = "0" + m;
    }

    if (s < 10) {
        s = "0" + s;
    }

    p.innerText = h + ":" + m + ":" + s;

    // Making the welcome text fit the time of the day

    var welcome = document.getElementById("welcome");

    if (h >= 3) {
        welcome.innerText = "Good morning 🌻";
    }

    if (h >= 12 && h < 19) {
        welcome.innerText = "Good afternoon ☀️";
    }

    if (h >= 19) {
        welcome.innerText = "Good evening 🌃";
    }

    if (h >= 23 || h < 3) {
        welcome.innerText = "Good night 🌙";
    }
}

// running Time function every half a second (it updates the whole header)
var timer = setInterval(Time, 500);


// Search

var input = document.getElementById("search");

function Search() {
    var searchEngineInput = document.getElementById("search-engine");
    var searchEngine;

    if (searchEngineInput.value == 0) {
        searchEngine = "google.com";
    }

    searchEngine = searchEngineInput.value;

    window.location.href = "https://www." + searchEngine + "/search?q=" + input.value;

    if (event.keyCode === 13 && input.value.includes(".") == true) {
        window.location.href = "https://" + input.value;
    }
}


input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        Search();
    }
});


// Open and close settings function

function Settings() {
    let settings = document.getElementById("settings");
    settings.classList.toggle("visible");
}

function getCheckboxStatus(type, storage) {
    let status = false;
    Object.keys(storage).forEach((key, index) => { if(key === type) status = Object.values(storage)[index] });

    return status;
}

function changeCheckboxStatus(type) {
    // JSON.parse() is used to create an object from previously stringified object that is stored in "checkboxes" key.
    const storage = JSON.parse(localStorage.getItem("checkboxes"));
    // New object defined as "newStorage" is required because the algorithm will set the new object to localStorage "checkboxes" key.
    // Spread operator (...) is used because the object is identical to the previous one (storage) but just with different value that every key contains.
    let newStorage = {...storage};

    // Selecting the checkbox based on the parameter "type" (welcome, time, favorites).
    const checkbox = document.getElementById(`${type}-checkbox`);
    // Defining the target of checkbox.
    const field = document.querySelector(`.${type}`);
    const isChecked = checkbox.classList.contains("fa-check");

    if(!isChecked) {
        checkbox.classList.add("fa-check");
        field.classList.remove(`invisible-${type}`);
    }

    else {
        checkbox.classList.remove("fa-check");
        field.classList.add(`invisible-${type}`);
    }

    // Redefining target "type" with the exact opposite value from the previous one.
    newStorage = {...newStorage, [type]: !isChecked};
    localStorage.setItem("checkboxes", JSON.stringify(newStorage));
}

// Adding favorite

const favorites = document.querySelector(".favorites");
const addNew = document.querySelector(".add-new");

let favoriteList = [
    {
        title: "youtube",
        image: "images/youtube.png",
        link: "https://youtube.com/"
    },

    {
        title: "gmail personal",
        image: "images/gmail.png",
        link: "https://mail.google.com/mail/u/1/#inbox"
    },

    {
        title: "gmail",
        image: "images/gmail.png",
        link: "https://mail.google.com/mail/u/0/#inbox"
    },

    {
        title: "translate",
        image: "images/translate.png",
        link: "https://translate.google.rs/u/1/?hl=sr&sl=en&tl=de&op=translate"
    },

    {
        title: "eponuda",
        image: "images/eponuda.jpg",
        link: "https://www.eponuda.com/"
    },
    
    {
        title: "kupujem prodajem",
        image: "images/kp.png",
        link: "https://novi.kupujemprodajem.com/"
    }
];

fillFavorites();

function fillFavorites() {
    [...favorites.children].forEach(favorite => {
        if(
            !favorite.classList.contains("add-new") &&
            favorite.tagName.toLowerCase() !== "template"
        ) favorite.remove();
    });
    
    favoriteList.forEach(favorite => {
        const anchor = document.querySelector('[data-template="favorite"]').content.firstElementChild.cloneNode(true);
        anchor.setAttribute("href", favorite.link);
    
        favorites.appendChild(anchor);
    
        const article = [...anchor.children][0];
        const [img, p] = [...article.children];
    
        img.setAttribute("src", favorite.image);
        img.setAttribute("alt", favorite.title.toUpperCase());
    
        p.innerText = favorite.title;
        
        favorites.insertBefore(anchor, addNew);
    });
}

const body = document.querySelector("body");

addNew.onclick = () => {
    const addNewFavoriteModalCheck = document.querySelector(".add-new-favorite-modal");
    if(addNewFavoriteModalCheck) return;
    
    const addNewFavoriteModal = document.querySelector('[data-template="add-new-favorite-modal"]').content.firstElementChild.cloneNode(true);
    body.appendChild(addNewFavoriteModal);

    setTimeout(() => {
        const inputs = document.querySelectorAll(".add-new-favorite-modal .favorite-info .favorite-text div input");
        let inputValues = { title: "", link: "" };
        
        const addButton = document.querySelector(".add-new-favorite-modal .favorite-buttons button");

        inputs.forEach(input => {
            const inputTitle = input.id.split("-")[1];
            
            input.oninput = e => {
                inputValues = {...inputValues, [inputTitle]: e.target.value};
                
                if(
                    inputValues.title &&
                    inputValues.link &&
                    addButton.classList.contains("disabled-favorite-button")
                ) addButton.classList.remove("disabled-favorite-button");

                else if(
                    (!inputValues.title ||
                    !inputValues.link) &&
                    !addButton.classList.contains("disabled-favorite-button")
                ) addButton.classList.add("disabled-favorite-button");
            }
        });

        setFavoriteIcon();

        addNewFavoriteModalButtons();
        window.addEventListener("click", closeAddNewFavoriteModal);
    }, 1);
}

let addNewFavoriteModalStatus = false;

function closeAddNewFavoriteModal(e) {
    if(e.target.classList.contains("add-new-favorite-modal")) return;

    const parentNodes = [];
    let currentElement = e.target;

    while(currentElement.parentNode !== null) {
        parentNodes.push(currentElement.parentNode);
        currentElement = currentElement.parentNode;
    }

    if(parentNodes[parentNodes.length - 1].classList === undefined) parentNodes.pop();

    parentNodes.forEach(parentNode => { if(parentNode.classList.contains("add-new-favorite-modal")) addNewFavoriteModalStatus = true })
    
    if(!addNewFavoriteModalStatus) removeNewFavoriteModal();
}

function addNewFavoriteModalButtons() { 
    const [add, cancel] = document.querySelectorAll(".add-new-favorite-modal .favorite-buttons button");

    add.onclick = () => {
        const inputs = document.querySelectorAll(".add-new-favorite-modal .favorite-info .favorite-text div input");
        const imageInput = document.querySelector(".add-new-favorite-modal .favorite-img-input img");
        
        let inputValues = { title: "", image: imageInput.src, link: "" };
        
        inputs.forEach(input => {
            const inputTitle = input.id.split("-")[1];
            inputValues = {...inputValues, [inputTitle]: input.value};
        });

        favoriteList = [...favoriteList, inputValues];
        fillFavorites();

        removeNewFavoriteModal();
    }

    cancel.onclick = () => removeNewFavoriteModal();
}

function removeNewFavoriteModal() {
    const addNewFavoriteModal = document.querySelector(".add-new-favorite-modal");
    addNewFavoriteModal.remove();

    window.removeEventListener("click", closeAddNewFavoriteModal);
}

function setFavoriteIcon() {
    const addNewFavoriteModalImgInput = document.querySelector(".add-new-favorite-modal .favorite-img-input");
    const [inputImg, inputFile] = [...addNewFavoriteModalImgInput.children];

    inputFile.oninput = async () => {
        inputImg.setAttribute("src", await getBaseUrl(inputFile["files"][0]));
    }

    function getBaseUrl(file)  {
        return new Promise((resolve) => {
            const reader = new FileReader();
            let baseString = "";

            reader.readAsDataURL(file);
        
            reader.onload = () => {
                baseString = reader.result;
                resolve(baseString)
            };
        });
    }
}