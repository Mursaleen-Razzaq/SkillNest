/* ========================================
   SKILLNEST - MAIN JAVASCRIPT
   File: js/main.js
======================================== */
document.addEventListener("DOMContentLoaded", function () {
    // ===================================
    // 1. AUTOMATIC COPYRIGHT YEAR
    // ====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    // ====================================
    // 2. SMOOTH SCROLLING
    // ====================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID = link.getAttribute("href");

            // Ignore empty hash links
            if (!targetID || targetID === "#") {
                return;
            }

            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });
    // ====================================
    // 3. SCROLL TO TOP BUTTON
    // ====================================

    const scrollTopButton = document.createElement("button");

    scrollTopButton.type = "button";
    scrollTopButton.id = "scrollTopButton";
    scrollTopButton.className = "scroll-top-button";
    scrollTopButton.innerHTML = "&#8593;";
    scrollTopButton.setAttribute("aria-label", "Scroll to top");
    scrollTopButton.title = "Back to top";

    document.body.appendChild(scrollTopButton);

    // Show or hide button based on scroll position
    function updateScrollButton() {

        if (window.scrollY > 400) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }

    }

    window.addEventListener("scroll", updateScrollButton);

    updateScrollButton();

    // Scroll to page top
    scrollTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
    // ====================================
    // 4. HOMEPAGE INITIALIZATION
    // ====================================

    document.body.classList.add("page-loaded");

    console.log("SkillNest homepage initialized successfully.");

});
