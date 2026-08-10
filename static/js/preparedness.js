
// =========================================
// DisasterSafe - Preparedness Page
// =========================================

// Wait until the HTML page is completely loaded
document.addEventListener("DOMContentLoaded", () => {

    // Get all disaster cards
    const disasterCards = document.querySelectorAll(".disaster-card");

    // Add click event to every card
    disasterCards.forEach((card) => {

        card.addEventListener("click", (event) => {

            // Get the disaster name from data-disaster
            const disaster = card.dataset.disaster;

            // If no disaster value is found, do nothing
            if (!disaster) {
                return;
            }

            // Open the common information page
            window.location.href =
                `/alert-info?type=${encodeURIComponent(disaster)}`;
        });

    });

});

