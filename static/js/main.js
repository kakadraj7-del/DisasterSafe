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
            // Location permission obtained
            window.open(
                "https://sachet.ndma.gov.in/",
                "_blank"
            );
        },
        function() {
            alert("Please allow location access to view weather alerts.");
        }
    );
}