const checkpoints = [
    { lat: 50.091757, lng: 14.403842, name: "Exit Cafe" },
    { lat: 50.091780, lng: 14.403941, name: "Top of Stairs" },
    { lat: 50.091651, lng: 14.404013, name: "Bottom of Stairs" },
    { lat: 50.091737, lng: 14.404417, name: "Gate" },
    { lat: 50.091940, lng: 14.404397, name: "Toilet" }
];

let currentCheckpoint = 0;
let userLat = null;
let userLng = null;
let heading = 0;
let gpsStarted = false;

const arrow = document.getElementById("arrow");
const stepName = document.getElementById("step-name");
const distanceText = document.getElementById("distance");
const progressBar = document.getElementById("progress-bar");

document.getElementById("startBtn").onclick = startNavigation;

function startNavigation() {

    if (!navigator.geolocation) {
        alert("GPS not supported on this device");
        return;
    }

    stepName.innerHTML = "Starting GPS...";

    navigator.geolocation.watchPosition(

        position => {

            gpsStarted = true;

            userLat = position.coords.latitude;
            userLng = position.coords.longitude;

            // HIGH-ACCURACY GPS heading when available
            if (position.coords.heading !== null && !isNaN(position.coords.heading)) {
                heading = position.coords.heading;
            }

            updateNavigation();

        },

        error => {

            let message = "";

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = "GPS permission denied. Please allow location.";
                    break;

                case error.POSITION_UNAVAILABLE:
                    message = "GPS unavailable. Try outside.";
                    break;

                case error.TIMEOUT:
                    message = "GPS timeout. Try again.";
                    break;

                default:
                    message = "Unknown GPS error.";
            }

            alert(message);
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );

    // Compass support
    if (window.DeviceOrientationEvent) {

        window.addEventListener("deviceorientationabsolute", handleOrientation, true);
        window.addEventListener("deviceorientation", handleOrientation, true);

    }

    function handleOrientation(event) {

        let compassHeading;

        // iPhone
        if (event.webkitCompassHeading !== undefined) {

            compassHeading = event.webkitCompassHeading;

        }

        // Android
        else if (event.absolute === true && event.alpha !== null) {

            compassHeading = 360 - event.alpha;

        }

        // fallback
        else if (event.alpha !== null) {

            compassHeading = 360 - event.alpha;

        }

        if (compassHeading !== undefined) {

            heading = compassHeading;

            updateNavigation(); // VERY IMPORTANT

        }

    }

}

function updateNavigation() {

    if (!gpsStarted) return;

    const checkpoint = checkpoints[currentCheckpoint];

    const distance = getDistance(
        userLat,
        userLng,
        checkpoint.lat,
        checkpoint.lng
    );

    distanceText.innerHTML = "Distance: " + Math.round(distance) + " m";

    const bearing = getBearing(
        userLat,
        userLng,
        checkpoint.lat,
        checkpoint.lng
    );

    let rotation = bearing - heading;

    // normalize to -180 to 180 (prevents spinning)
    rotation = ((rotation + 540) % 360) - 180;

    arrow.style.transform = `rotate(${rotation}deg)`;

    if (distance < 6) {

        currentCheckpoint++;

        progressBar.style.width =
            (currentCheckpoint / checkpoints.length) * 100 + "%";

        if (currentCheckpoint >= checkpoints.length) {

            stepName.innerHTML = "Arrived!";
            arrow.style.display = "none";
            return;
        }

        stepName.innerHTML = checkpoints[currentCheckpoint].name;
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

function getBearing(lat1, lon1, lat2, lon2) {

    const dLon = (lon2-lon1) * Math.PI/180;

    const y = Math.sin(dLon) * Math.cos(lat2*Math.PI/180);

    const x =
        Math.cos(lat1*Math.PI/180) *
        Math.sin(lat2*Math.PI/180) -
        Math.sin(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.cos(dLon);

    const bearing = Math.atan2(y, x);

    return (bearing * 180/Math.PI + 360) % 360;
}