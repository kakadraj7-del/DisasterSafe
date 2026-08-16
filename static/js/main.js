function showMessage() {
    document.getElementById("message").textContent =
        "This is a test DisasterSafe alert.";
}

function openWeatherAlerts(event) {
    event.preventDefault();

    if (!navigator.geolocation) {
        alert("Location services are not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Open weather website after location is obtained
            const weatherUrl =
                `https://www.msn.com/en-in/weather/maps/lightning?lat=${latitude}&lon=${longitude}`;

            window.open(weatherUrl, "_blank");
        },

        function(error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Location permission is required to view weather alerts.");
            } else {
                alert("Unable to get your location. Please try again.");
            }
        }
    );
}