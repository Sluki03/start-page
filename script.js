import { fList } from "./data.js";

document.onload = Time();

(function() {
    const storage = JSON.parse(localStorage.getItem("checkboxes"));
    if(storage !== null) checkCheckBoxStatus();
}());

window.addEventListener("load", () => {
    // Creates an unique localStorage for whole page.
    makeStorage();
    checkCheckBoxStatus();
});

function makeStorage() {
    // Checks whether "checkboxes" key exists or not. If it doesn't then the storage will be created.
    if(localStorage.getItem("checkboxes") === null) {
        // Every property represents one checkbox with a key that will be used as a "type" of checkbox and a value which is whether the checkbox is active or not.
        const checkboxes = { welcome: true, time: true, favorites: true };
        // JSON.stringify() got to be used if .setItem() type is an object.
        localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
    }

    if(localStorage.getItem("favorites") === null) localStorage.setItem("favorites", JSON.stringify(fList));
}

function Time() {
    // getting & displaying the timeF

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

const search = document.querySelector(".search i");
search.onclick = Search;

const input = document.getElementById("search");

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

const settingsButton = document.querySelector(".settings-button");
settingsButton.onclick = Settings;

function Settings() {
    const settings = document.getElementById("settings");

    if(settings.classList.contains("visible")) return;
    settings.classList.toggle("visible");

    setTimeout(() => window.addEventListener("click", closeSettings), 1);
}

function closeSettings(e) {
    if(e.target.classList.contains("settings")) return;

    const parentNodes = [];
    let currentElement = e.target;

    while(currentElement.parentNode !== null) {
        parentNodes.push(currentElement.parentNode);
        currentElement = currentElement.parentNode;
    }

    if(parentNodes[parentNodes.length - 1].classList === undefined) parentNodes.pop();
    
    let status = true;
    parentNodes.forEach(parentNode => { if(parentNode.classList.contains("settings")) status = false });

    if(status) {
        const settings = document.getElementById("settings");

        settings.classList.toggle("visible");
        window.removeEventListener("click", closeSettings);
    }
}

function getCheckboxStatus(type, storage) {
    let status = false;
    Object.keys(storage).forEach((key, index) => { if(key === type) status = Object.values(storage)[index] });

    return status;
}

const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach(checkbox => { checkbox.onclick = changeCheckboxStatus });

function changeCheckboxStatus(e) {
    // JSON.parse() is used to create an object from previously stringified object that is stored in "checkboxes" key.
    const storage = JSON.parse(localStorage.getItem("checkboxes"));
    // New object defined as "newStorage" is required because the algorithm will set the new object to localStorage "checkboxes" key.
    // Spread operator (...) is used because the object is identical to the previous one (storage) but just with different value that every key contains.
    let newStorage = {...storage};

    const type = [...e.target.children][0].id.split("-")[0];

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

function checkCheckBoxStatus() {
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
}

// Adding favorite

const favorites = document.querySelector(".favorites");
const favoritesList = JSON.parse(localStorage.getItem("favorites"));
const addNew = document.querySelector(".add-new");

fillFavorites(favoritesList);

function fillFavorites(list) {
    [...favorites.children].forEach(favorite => {
        if(
            !favorite.classList.contains("add-new") &&
            favorite.tagName.toLowerCase() !== "template"
        ) favorite.remove();
    });
    
    list.forEach(favorite => {
        const anchor = document.querySelector('[data-template="favorite"]').content.firstElementChild.cloneNode(true);
        anchor.setAttribute("href", favorite.link);
    
        favorites.appendChild(anchor);
    
        const [article, closeFavoriteButton] = [...anchor.children];
        const [img, p] = [...article.children];
    
        img.setAttribute("src", favorite.image);
        img.setAttribute("alt", favorite.title.toUpperCase());
    
        p.innerText = favorite.title;

        closeFavoriteButton.onclick = closeFavorite;
        
        favorites.insertBefore(anchor, addNew);
    });

    localStorage.setItem("favorites", JSON.stringify(list));

    function closeFavorite(e) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target.parentNode;
        openConfirmationModal(target);
    }

    function openConfirmationModal(target) {
        const confirmationModal = document.querySelector('[data-template="confirmation-modal"]').content.firstElementChild.cloneNode(true);
        const article = [...target.children][0];

        const closeFavoriteButton = [...target.children][1];
        
        closeFavoriteButton.style.opacity = "0";
        setTimeout(() => closeFavoriteButton.classList.add("close-favorite-invisible"), 300);
        
        article.appendChild(confirmationModal);

        setTimeout(() => {
            confirmationModal.classList.add("modal-active");

            const [p, buttons] = [...confirmationModal.children];

            p.innerText = `delete?`;

            const [yes, no] = [...buttons.children];

            yes.onclick = e => {
                e.stopPropagation();
                e.preventDefault();
                
                const targetHref = target.href;
                const newFavoritesList = list.filter(favorite => favorite.link !== targetHref);
                
                fillFavorites(newFavoritesList);
                closeConfirmationModal(confirmationModal, closeFavoriteButton);
            }

            no.onclick = e => {
                e.stopPropagation();
                e.preventDefault();

                closeConfirmationModal(confirmationModal, closeFavoriteButton);
            }
        }, 300);
    }

    function closeConfirmationModal(confirmationModal, closeFavoriteButton) {
        confirmationModal.classList.remove("modal-active");
        confirmationModal.classList.add("modal-disabled");

        closeFavoriteButton.style.opacity = "";
        closeFavoriteButton.classList.remove("close-favorite-invisible");
    }
}

const body = document.querySelector("body");

addNew.onclick = () => {
    const addNewFavoriteModalCheck = document.querySelector(".add-new-favorite-modal");
    if(addNewFavoriteModalCheck) return;
    
    const addNewFavoriteModal = document.querySelector('[data-template="add-new-favorite-modal"]').content.firstElementChild.cloneNode(true);
    body.appendChild(addNewFavoriteModal);

    setTimeout(() => {
        addNewFavoriteModal.classList.add("modal-active");
        
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
    const [add, cancel] = document.querySelectorAll(".add-new-favorite-modal .modal-buttons button");

    add.onclick = () => {
        if(add.classList.contains("disabled-favorite-button")) return;
        
        const inputs = document.querySelectorAll(".add-new-favorite-modal .favorite-info .favorite-text div input");
        const imageInput = document.querySelector(".add-new-favorite-modal .favorite-img-input img");
        
        let inputValues = { title: "", image: imageInput.src, link: "" };
        
        inputs.forEach(input => {
            const inputTitle = input.id.split("-")[1];
            
            let link = input.value.startsWith("https://") ? input.value : "https://" + input.value;
            if(!link.endsWith("/")) link += "/";

            inputValues = {...inputValues, [inputTitle]: inputTitle === "link" ? link : input.value};
        });

        const newFavoritesList = [...favoritesList, inputValues];
        
        localStorage.setItem("favorites", JSON.stringify(newFavoritesList));
        fillFavorites(newFavoritesList);

        removeNewFavoriteModal();
    }

    cancel.onclick = () => removeNewFavoriteModal();
}

function removeNewFavoriteModal() {
    const addNewFavoriteModal = document.querySelector(".add-new-favorite-modal");
    addNewFavoriteModal.classList.remove("modal-active");
    addNewFavoriteModal.classList.add("modal-disabled");
    
    setTimeout(() => addNewFavoriteModal.remove(), 300);

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