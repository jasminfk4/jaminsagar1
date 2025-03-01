window.addEventListener("DOMContentLoaded", function () {
    if (typeof jQuery === "undefined") {
        console.error("jQuery is required for this script. Make sure jQuery is included in your site.");
        return;
    }

    jQuery(document).ready(function ($) {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            let adsValue;

            // Use sessionStorage, fallback to localStorage if needed
            if (urlParams.has("ads")) {
                adsValue = urlParams.get("ads");
                try {
                    sessionStorage.setItem("ads", adsValue);
                } catch (e) {
                    localStorage.setItem("ads", adsValue);
                }

                // Remove the "ads" parameter from the URL without reloading
                const newUrl = window.location.origin + window.location.pathname + window.location.hash;
                window.history.replaceState(null, "", newUrl);
            } else {
                try {
                    adsValue = sessionStorage.getItem("ads") || localStorage.getItem("ads");
                } catch (e) {
                    adsValue = null;
                }
            }

            if (adsValue) {
                // Add the custom content div dynamically
                if ($("#customContent").length === 0) {
                    $("body").prepend('<div id="customContent"></div>');
                }

                // List of background images
                const backgroundImages = [
                    "https://seorankriddle.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-21-at-12.20.47-AM.jpeg",
                    "https://seorankriddle.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-21-at-12.22.10-AM.jpeg"
                ];

                // Get previously shown images
                let shownImages = sessionStorage.getItem("shownImages");
                shownImages = shownImages ? JSON.parse(shownImages) : [];

                // Filter available images
                let availableImages = backgroundImages.filter(img => !shownImages.includes(img));

                // If all images have been shown, reset the cycle
                if (availableImages.length === 0) {
                    sessionStorage.removeItem("shownImages");
                    availableImages = backgroundImages;
                }

                // Select a new random image
                const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];

                // Store the shown image
                shownImages.push(randomImage);
                sessionStorage.setItem("shownImages", JSON.stringify(shownImages));

                // Apply styles and background image to #customContent
                $("#customContent").css({
                    "background-image": `url(${randomImage})`,
                    "background-size": "cover",
                    "background-position": "center",
                    "width": "100vw",
                    "height": "5000px",
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "z-index": "10",
                    "opacity": "1",
                    "pointer-events": "none"
                });

                // Add custom content inside the div
                $("#customContent").html(`
                    <div class="custom-box"></div>
                `);
            }
        } catch (error) {
            console.error("Error in script:", error);
        }
    });
});
