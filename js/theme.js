
/* ========================================
   SKILLNEST - THEME MANAGER
   File: js/theme.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");

    // Get saved theme, or use dark theme by default
    function getSavedTheme() {

        try {

            if (typeof SkillNestStorage !== "undefined") {
                return SkillNestStorage.get("theme", "dark");
            }

            return localStorage.getItem("skillnest_theme") || "dark";

        } catch (error) {

            return "dark";

        }

    }


    // Apply selected theme
    function applyTheme(theme) {

        const selectedTheme =
            theme === "light" ? "light" : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            selectedTheme
        );

        if (themeToggle) {

            const isDark = selectedTheme === "dark";

            const label = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";

            themeToggle.setAttribute("aria-label", label);
            themeToggle.setAttribute("title", label);

            // Keep the existing SVG icon element.
            // CSS changes the sun/moon icon according to the theme.

        }

    }


    // Save selected theme
    function saveTheme(theme) {

        try {

            if (typeof SkillNestStorage !== "undefined") {

                SkillNestStorage.save("theme", theme);

            } else {

                localStorage.setItem("skillnest_theme", theme);

            }

        } catch (error) {

            console.error(
                "SkillNest: Unable to save theme.",
                error
            );

        }

    }


    // Load saved theme when page opens
    const savedTheme = getSavedTheme();

    applyTheme(savedTheme);


    // Toggle theme on button click
    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const currentTheme =
                document.documentElement.getAttribute("data-theme") || "dark";

            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(newTheme);

            saveTheme(newTheme);

        });

    }

});
