document.onload = Time();

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

// running Time function every second (it updates the whole header)
var timer = setInterval(Time, 1000);


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