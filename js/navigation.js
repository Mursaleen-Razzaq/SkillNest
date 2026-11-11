
/* ========================================
   SKILLNEST - NAVIGATION
   File: js/navigation.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    // Stop if navigation elements are unavailable.
    if (!menuToggle || !navLinks) {
        return;
    }

    // Keep JavaScript breakpoint consistent with responsive.css.
    const mobileScreen = window.matchMedia("(max-width: 900px)");

    // Accessibility attributes.
    menuToggle.setAttribute("aria-controls", "navLinks");
    navLinks.setAttribute("aria-label", "Main navigation");

    // Update menu state.
    function updateMenuState(isOpen) {

        navLinks.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    }

    // Close menu and optionally restore keyboard focus.
    function closeMenu(restoreFocus = false) {

        const wasOpen = navLinks.classList.contains("active");

        updateMenuState(false);

        if (restoreFocus && wasOpen && mobileScreen.matches) {
            menuToggle.focus();
        }
    }

    // Toggle mobile menu.
    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = navLinks.classList.contains("active");

        updateMenuState(!isOpen);

    });

    // Close menu when a navigation link is clicked.
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });

    // Close menu when clicking outside the navigation.
    document.addEventListener("click", function (event) {

        const clickedInsideNavigation =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (!clickedInsideNavigation && !clickedMenuButton) {
            closeMenu();
        }

    });

    // Close menu with the Escape key.
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu(true);
        }

    });

    // Close menu when switching to desktop layout.
    mobileScreen.addEventListener("change", function (event) {

        if (!event.matches) {
            closeMenu();
        }

    });

    // Set the initial menu state.
    updateMenuState(false);

});
