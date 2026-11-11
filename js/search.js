
/* ========================================
   SKILLNEST - TOOL SEARCH
   File: js/search.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("toolSearch");
    const searchButton = document.getElementById("searchButton");
    const searchMessage = document.getElementById("searchMessage");

    // Stop if search elements do not exist
    if (!searchInput || !searchButton) {
        return;
    }

    // Get all searchable tool cards
    const toolCards = document.querySelectorAll("[data-search]");

    // Search function
    function searchTools() {
        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        // Empty search validation
        if (!searchValue) {
            if (searchMessage) {
                searchMessage.textContent =
                    "Please enter a tool name to search.";
            }

            searchInput.focus();
            return;
        }

        let firstMatch = null;
        let matchingTools = 0;

        // Search through available tool cards
        toolCards.forEach(function (card) {
            const searchableText = (
                card.getAttribute("data-search") +
                " " +
                card.textContent
            ).toLowerCase();

            const isMatch = searchableText.includes(searchValue);

            if (isMatch) {
                matchingTools++;

                if (!firstMatch) {
                    firstMatch = card;
                }

                card.classList.add("search-match");
            } else {
                card.classList.remove("search-match");
            }
        });

        // Display search results
        if (matchingTools > 0) {
            if (searchMessage) {
                searchMessage.textContent =
                    matchingTools +
                    (matchingTools === 1
                        ? " matching tool found."
                        : " matching tools found.");
            }

            // Scroll to first matching result
            firstMatch.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {
            if (searchMessage) {
                searchMessage.textContent =
                    "No matching tool found. Try another keyword.";
            }
        }
    }

    // Search button click
    searchButton.addEventListener("click", searchTools);

    // Search when Enter key is pressed
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchTools();
        }
    });

    // Clear previous results when input changes
    searchInput.addEventListener("input", function () {
        if (searchMessage) {
            searchMessage.textContent = "";
        }

        toolCards.forEach(function (card) {
            card.classList.remove("search-match");
        });
    });
});
