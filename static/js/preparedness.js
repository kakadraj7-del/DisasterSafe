
// =========================================
// DisasterSafe - Preparedness Page
// =========================================

// Wait until the HTML page is completely loaded

document.addEventListener("DOMContentLoaded", () => {

    // Get all disaster cards

    const disasterCards =
        document.querySelectorAll(".disaster-card");


    // Add click event to every disaster card

    disasterCards.forEach((card) => {

        card.addEventListener("click", (event) => {

            // Prevent href="#" from changing the page position

            event.preventDefault();


            // Get the disaster name from data-disaster

            const disaster =
                card.dataset.disaster;


            // Check whether a disaster value exists

            if (!disaster) {

                console.error(
                    "No disaster type found for this card."
                );

                return;
            }


            // Create the URL for the preparedness
            // information page

            const url =
                `/preparedness-info?type=${encodeURIComponent(disaster)}`;


            // Open the preparedness information page

            window.location.href = url;

        });

    });

});









