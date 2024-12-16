let closeEnvelope = document.getElementById("close_envelop");
let openEnvelope = document.getElementById("open_envelop");
let button = document.getElementById("btn");
let currentPageIndex = 0; // Track the current page
let isFirstClick = true; // Track the first click
const pages = ["page1.html", "page2.html"]; // Array of content pages

function handleButtonClick() {
    if (isFirstClick) {
        isFirstClick = false;
        document.getElementById("close_envelop").style.display = "none";
        document.getElementById("open_envelop").style.display = "block";
        return;
    }

    openNextPage(); // For subsequent clicks, switch pages
}

function openNextPage() {
    const pageWrapper = document.querySelector(".page-wrapper");

    // Start the fade-out transition
    pageWrapper.classList.add("fade-out");

    // Wait for the fade-out to complete before changing content
    setTimeout(() => {
        fetch(pages[currentPageIndex])
            .then(response => response.text())
            .then(htmlContent => {
                pageWrapper.innerHTML = htmlContent; // Replace content dynamically
                currentPageIndex = (currentPageIndex + 1) % pages.length; // Cycle through pages

                // Apply fade-in effect after new content is loaded
                pageWrapper.classList.remove("fade-out");
                pageWrapper.classList.add("fade-in");

                // Remove the fade-in class after the animation completes
                setTimeout(() => {
                    pageWrapper.classList.remove("fade-in");
                }, 500);
            })
            .catch(error => console.error("Error loading page:", error));
    }, 500); // Match the transition duration
}
