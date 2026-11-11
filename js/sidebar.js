
/* ========================================
   SKILLNEST - GLOBAL SIDEBAR
   File: js/sidebar.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const script = document.querySelector('script[src*="sidebar.js"]');

    if (!script) {
        console.error("SkillNest Sidebar: Script not loaded.");
        return;
    }

    const siteRoot = new URL("../", script.src);

    function page(path) {
        return new URL(path, siteRoot).href;
    }

    function icon(name) {
    const iconUrl = page("assets/icons/" + name + ".svg");

    return `
        <span
            class="sn-svg-icon"
            aria-hidden="true"
            style="-webkit-mask-image: url('${iconUrl}'); mask-image: url('${iconUrl}');"
        ></span>
    `;
}

    if (document.querySelector(".sn-sidebar")) {
        return;
    }

    const currentPath = window.location.pathname;

    const groups = [
        {
            heading: "Main Menu",
            items: [
                { label: "Dashboard", icon: "layout-dashboard", path: "index.html" },
                { label: "Student Tools", icon: "graduation-cap", path: "student-tools/index.html", match: "student-tools" },
                { label: "Career Tools", icon: "briefcase-business", path: "career-tools/index.html", match: "career-tools" },
                { label: "Productivity", icon: "zap", path: "productivity-tools/index.html", match: "productivity-tools" },
                { label: "Resources", icon: "book-open", path: "resources/index.html", match: "resources" }
            ]
        },
        {
            heading: "Popular Tools",
            items: [
                { label: "GPA Calculator", icon: "chart-no-axes-column-increasing", path: "student-tools/gpa-calculator.html" },
                { label: "Resume Builder", icon: "file-user", path: "career-tools/resume-builder.html" },
                { label: "Pomodoro Timer", icon: "timer", path: "productivity-tools/pomodoro-timer.html" }
            ]
        },
        {
            heading: "More",
            items: [
                { label: "About SkillNest", icon: "info", path: "about.html" },
                { label: "Contact", icon: "mail", path: "contact.html" }
            ]
        }
    ];

    function isActive(item) {
        if (item.match) {
            return currentPath.includes("/" + item.match + "/");
        }

        return currentPath === new URL(item.path, siteRoot).pathname;
    }

    function createLinks() {
        return groups.map(group => `
            <section class="sn-sidebar-section">
                <span class="sn-sidebar-heading">
                    ${group.heading}
                </span>

                ${group.items.map(item => {
                    const active = isActive(item);

                    return `
                        <a
                            href="${page(item.path)}"
                            class="sn-sidebar-link ${active ? "active" : ""}"
                            ${active ? 'aria-current="page"' : ""}
                        >
                            <span class="sn-sidebar-icon">
                                ${icon(item.icon)}
                            </span>
                            <span>${item.label}</span>
                        </a>
                    `;
                }).join("")}
            </section>
        `).join("");
    }

    const sidebar = document.createElement("aside");

    sidebar.id = "skillNestSidebar";
    sidebar.className = "sn-sidebar";
    sidebar.setAttribute("aria-label", "SkillNest navigation");

    sidebar.innerHTML = `
        <div class="sn-sidebar-brand">
            <a href="${page("index.html")}" class="sn-sidebar-logo">
                Skill<span>Nest</span>
            </a>

            <button
                class="sn-sidebar-close"
                type="button"
                aria-label="Close sidebar"
            >
                ${icon("x")}
            </button>
        </div>

        <nav class="sn-sidebar-navigation">
            ${createLinks()}
        </nav>

        <div class="sn-sidebar-bottom">
            <div class="sn-sidebar-footer">
                <strong>SkillNest</strong>
                <p>Learn smarter. Build your career. Achieve more.</p>
                <span>Free Tools for Everyone</span>
            </div>
        </div>
    `;

    const backdrop = document.createElement("div");
    backdrop.className = "sn-sidebar-backdrop";

    const header = document.querySelector(".header");

    if (header) {
        header.insertAdjacentElement("afterend", sidebar);
        header.insertAdjacentElement("afterend", backdrop);
    } else {
        document.body.prepend(backdrop);
        document.body.prepend(sidebar);
    }

    document.body.classList.add("has-sidebar");

    const toggle = document.createElement("button");

    toggle.type = "button";
    toggle.className = "sn-sidebar-toggle";
    toggle.innerHTML = icon("menu");
    toggle.setAttribute("aria-label", "Open sidebar");
    toggle.setAttribute("aria-controls", "skillNestSidebar");
    toggle.setAttribute("aria-expanded", "false");

    const navActions = document.querySelector(".nav-actions");

    if (navActions) {
        navActions.insertBefore(toggle, navActions.firstChild);
    } else {
        const navbar = document.querySelector(".navbar");

        if (navbar) {
            navbar.appendChild(toggle);
        }
    }

    const closeButton = sidebar.querySelector(".sn-sidebar-close");
    const mobileScreen = window.matchMedia("(max-width: 900px)");

    function setSidebarState(open) {
        sidebar.classList.toggle("open", open);
        backdrop.classList.toggle("visible", open);

        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute(
            "aria-label",
            open ? "Close sidebar" : "Open sidebar"
        );

        document.body.classList.toggle("sn-sidebar-open", open);
    }

    toggle.addEventListener("click", function () {
        setSidebarState(!sidebar.classList.contains("open"));
    });

    closeButton.addEventListener("click", function () {
        setSidebarState(false);
        toggle.focus();
    });

    backdrop.addEventListener("click", function () {
        setSidebarState(false);
        toggle.focus();
    });

    sidebar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            setSidebarState(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && sidebar.classList.contains("open")) {
            setSidebarState(false);
            toggle.focus();
        }
    });

    mobileScreen.addEventListener("change", function (event) {
        if (!event.matches) {
            setSidebarState(false);
        }
    });

    setSidebarState(false);

    console.log("SkillNest Sidebar: Successfully loaded.");
});
