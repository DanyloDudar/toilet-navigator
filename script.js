const checkpoints = [
    {
        lat: 50.091757,
        lng: 14.403842,
        name: "Exit the cafe",
        img: null
    },
    {
        lat: 50.091780,
        lng: 14.403941,
        name: "Go to the top of the stairs",
        img: "img/top-stairs.jpg"
    },
    {
        lat: 50.091651,
        lng: 14.404013,
        name: "Go down the stairs",
        img: "img/bottom-stairs.jpg"
    },
    {
        lat: 50.091737,
        lng: 14.404417,
        name: "Walk to the gate",
        img: "img/gate.jpg"
    },
    {
        lat: 50.091940,
        lng: 14.404397,
        name: "Toilet",
        img: "img/toilet.jpg"
    }
];

let currentCheckpoint = 0;
let userLat = null;
let userLng = null;

const stepName = document.getElementById("step-name");
const distanceText = document.getElementById("distance");
const progressBar = document.getElementById("progress-bar");
const photo = document.getElementById("nav-photo");

document.getElementById("startBtn").onclick = startNavigation;

function startNavigation() {

    if (!navigator.geolocation) {
        alert("GPS not supported on this device");
        return;
    }

    stepName.innerHTML = "Starting GPS...";

    navigator.geolocation.watchPosition(

        position => {

            userLat = position.coords.latitude;
            userLng = position.coords.longitude;

            updateNavigation();

        },

        error => {

            alert("GPS error: " + error.message);

        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

}

function updateNavigation() {

    const checkpoint = checkpoints[currentCheckpoint];

    const distance = getDistance(
        userLat,
        userLng,
        checkpoint.lat,
        checkpoint.lng
    );

    distanceText.innerHTML = "Distance: " + Math.round(distance) + " m";

    showCheckpoint();

    if (distance < 6) {

        currentCheckpoint++;

        progressBar.style.width =
            (currentCheckpoint / checkpoints.length) * 100 + "%";

        if (currentCheckpoint >= checkpoints.length) {

            stepName.innerHTML = "You arrived 🎉";
            distanceText.innerHTML = "";
            photo.style.display = "none";
            return;

        }

        showCheckpoint();

    }

}

function showCheckpoint() {

    const checkpoint = checkpoints[currentCheckpoint];

    stepName.innerHTML =
        "Step " + (currentCheckpoint + 1) +
        " / " + checkpoints.length +
        "<br>" + checkpoint.name;

    if (checkpoint.img) {

        photo.src = checkpoint.img;
        photo.style.display = "block";

    } else {

        photo.style.display = "none";

    }

}

function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat = (lat2-lat1) * Math.PI/180;
    const dLon = (lon2-lon1) * Math.PI/180;

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLon/2) *
        Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;

}