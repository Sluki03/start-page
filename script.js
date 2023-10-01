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
    window.location.href = "https://www.google.com/search?q=" + input.value;

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

// Adding template