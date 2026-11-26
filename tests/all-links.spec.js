
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";
const PROJECT_DIR = path.join(__dirname, "..");

function findHTMLFiles(directory) {
    let files = [];

    for (const entry of fs.readdirSync(directory, {
        withFileTypes: true
    })) {
        if (["node_modules", ".git", "tests"].includes(entry.name)) {
            continue;
        }

        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files = files.concat(findHTMLFiles(fullPath));
        } else if (entry.name.toLowerCase().endsWith(".html")) {
            files.push(fullPath);
        }
    }

    return files;
}

test("All internal links across SkillNest pages work", async ({ page, request }) => {
    const htmlFiles = findHTMLFiles(PROJECT_DIR);
    const links = new Map();
    const brokenLinks = [];

    for (const file of htmlFiles) {
        const relativePath = path.relative(PROJECT_DIR, file)
            .split(path.sep)
            .join("/");

       const pageURL = relativePath.endsWith("/index.html")
    ? `${BASE_URL}/${relativePath.replace(/index\.html$/, "")}`
    : `${BASE_URL}/${relativePath}`;

        await page.goto(pageURL, {
            waitUntil: "domcontentloaded"
        });

        
         const pageLinks = await page.locator("a[href]").evaluateAll(anchors => {
    return anchors.map(anchor => ({
        href: anchor.getAttribute("href"),
        resolvedHref: anchor.href,
        baseURI: document.baseURI
    }));
});

  
        for (const link of pageLinks) {
            if (!link.href) continue;

            const rawHref = link.href.trim();

            // Ignore empty, JavaScript, email, telephone and special links.
            if (
                !rawHref ||
                rawHref.startsWith("#") ||
                /^(javascript:|mailto:|tel:|sms:|data:)/i.test(rawHref)
            ) {
                continue;
            }

            const url = new URL(link.resolvedHref, pageURL);

            // Only check links belonging to this website.
            if (url.origin !== new URL(BASE_URL).origin) {
                continue;
            }

            // Ignore links pointing to the current page.
            const currentURL = new URL(pageURL);

            if (
                url.pathname === currentURL.pathname &&
                url.search === currentURL.search
            ) {
                continue;
            }

            // Remove fragments before checking.
            url.hash = "";

            if (!links.has(url.href)) {
    links.set(url.href, new Set());
}

            links.get(url.href).add(relativePath);
        }
    }

    for (const link of links.keys()) {
        try {
            const response = await request.get(link);

            if (!response.ok()) {
                brokenLinks.push({
    url: link,
    status: response.status(),
    sourcePages: [...links.get(link)]
});
            }
        } catch (error) {
            brokenLinks.push({
    url: link,
    error: error.message,
    sourcePages: [...links.get(link)]
});
        }
    }

    console.log(`HTML pages scanned: ${htmlFiles.length}`);
    console.log(`Unique internal links checked: ${links.size}`);

    if (brokenLinks.length > 0) {
        console.log("Broken links:");
        console.log(JSON.stringify(brokenLinks, null, 2));
    }

    expect(brokenLinks).toEqual([]);

    console.log("PASS: All checked internal links work.");
});