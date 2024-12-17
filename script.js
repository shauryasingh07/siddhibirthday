let closeEnvelope = document.getElementById("close_envelop");
let openEnvelope = document.getElementById("open_envelop");
let button = document.getElementById("btn");
let currentPageIndex = 0;
let isFirstClick = true;
let isProcessing = false;
const pages = ["page1.html", "page2.html", "page3.html"];

button.addEventListener("click", handleButtonClick);

function handleButtonClick() {
    if (isProcessing) return; 
    isProcessing = true;

    if (isFirstClick) {
        isFirstClick = false;
        closeEnvelope.style.display = "none";
        openEnvelope.style.display = "block";
        isProcessing = false; // Allow subsequent clicks
        return;
    }

    openNextPage();
}

function openNextPage() {
    const pageWrapper = document.querySelector(".page-wrapper");
    pageWrapper.classList.add("fade-out");

    setTimeout(() => {
        fetch(pages[currentPageIndex])
            .then(response => {
                if (!response.ok) throw new Error("Network error");
                return response.text();
            })
            .then(htmlContent => {
                pageWrapper.innerHTML = htmlContent;
                currentPageIndex = (currentPageIndex + 1) % pages.length;
                pageWrapper.classList.remove("fade-out");
                pageWrapper.classList.add("fade-in");
                setTimeout(() => pageWrapper.classList.remove("fade-in"), 500);
            })
            .catch(error => {
                console.error("Error loading page:", error);
            })
            .finally(() => {
                isProcessing = false; 
            });
    }, 500); 
}


