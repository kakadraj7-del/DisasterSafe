
// =========================================
// DisasterSafe - Preparedness Information
// =========================================


// Wait until the page is completely loaded

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------
    // Get the disaster type from the URL
    // -----------------------------------------

    const urlParams =
        new URLSearchParams(window.location.search);


    const disasterType =
        urlParams.get("type");


    // -----------------------------------------
    // Check whether a disaster type exists
    // -----------------------------------------

    if (!disasterType) {

        showError(
            "No disaster was selected."
        );

        return;
    }


    // -----------------------------------------
    // Load the JSON file
    // -----------------------------------------

    fetch(
        "/static/data/preparedness.json"
    )

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Could not load preparedness data."
                );

            }

            return response.json();

        })

        .then((data) => {

            // -----------------------------------------
            // Find the selected disaster
            // -----------------------------------------

            const disaster =
                data[disasterType];


            // Check whether the disaster exists

            if (!disaster) {

                showError(
                    "Information for this disaster was not found."
                );

                return;
            }


            // -----------------------------------------
            // Display the disaster information
            // -----------------------------------------

            displayDisaster(disaster);

        })

        .catch((error) => {

            console.error(
                "Error loading disaster information:",
                error
            );

            showError(
                "Unable to load disaster information."
            );

        });

});



// =========================================
// Display Disaster Information
// =========================================

function displayDisaster(disaster) {


    // -----------------------------------------
    // Get HTML elements
    // -----------------------------------------

    const icon =
        document.getElementById("disaster-icon");


    const title =
        document.getElementById("disaster-title");


    const description =
        document.getElementById("disaster-description");


    const beforeList =
        document.getElementById("before-list");


    const duringList =
        document.getElementById("during-list");


    const afterList =
        document.getElementById("after-list");


    // -----------------------------------------
    // Display basic information
    // -----------------------------------------

    icon.textContent =
        disaster.icon;


    title.textContent =
        disaster.title;


    description.textContent =
        disaster.description;


    // -----------------------------------------
    // Display Before information
    // -----------------------------------------

    displayList(
        beforeList,
        disaster.before
    );


    // -----------------------------------------
    // Display During information
    // -----------------------------------------

    displayList(
        duringList,
        disaster.during
    );


    // -----------------------------------------
    // Display After information
    // -----------------------------------------

    displayList(
        afterList,
        disaster.after
    );

}



// =========================================
// Create List Items
// =========================================

function displayList(listElement, items) {


    // Clear existing content

    listElement.innerHTML = "";


    // Check whether information exists

    if (!items || items.length === 0) {

        const li =
            document.createElement("li");

        li.textContent =
            "No information available.";

        listElement.appendChild(li);

        return;
    }


    // Create one <li> for every item

    items.forEach((item) => {

        const li =
            document.createElement("li");


        li.textContent =
            item;


        listElement.appendChild(li);

    });

}



// =========================================
// Display Error
// =========================================

function showError(message) {


    document.getElementById(
        "disaster-title"
    ).textContent = "Information Unavailable";


    document.getElementById(
        "disaster-description"
    ).textContent = message;


    document.getElementById(
        "disaster-icon"
    ).textContent = "⚠️";


    document.getElementById(
        "before-list"
    ).innerHTML = "";


    document.getElementById(
        "during-list"
    ).innerHTML = "";


    document.getElementById(
        "after-list"
    ).innerHTML = "";

}

