
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";
const PROJECT_DIR = path.join(__dirname, "..");

function findHTMLFiles(directory) {
    let files = [];

    const entries = fs.readdirSync(directory, {
        withFileTypes: true
    });

    for (const entry of entries) {
        if (
            entry.name === "node_modules" ||
            entry.name === ".git" ||
            entry.name === "tests"
        ) {
            continue;
        }

        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files = files.concat(findHTMLFiles(fullPath));
        } else if (
            entry.isFile() &&
            entry.name.toLowerCase().endsWith(".html")
        ) {
            files.push(fullPath);
        }
    }

    return files;
}

test("All SkillNest HTML pages load without JavaScript errors", async ({ page }) => {
    const htmlFiles = findHTMLFiles(PROJECT_DIR);
    const failedPages = [];

    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
        const relativePath = path.relative(PROJECT_DIR, file)
            .split(path.sep)
            .join("/");

        const url = `${BASE_URL}/${relativePath}`;
        const errors = [];

        const errorHandler = error => {
            errors.push(error.message);
        };

        page.on("pageerror", errorHandler);

        try {
            const response = await page.goto(url, {
                waitUntil: "domcontentloaded"
            });

            if (!response || !response.ok()) {
                failedPages.push({
                    page: relativePath,
                    status: response ? response.status() : "No response"
                });
            }

            if (errors.length > 0) {
                failedPages.push({
                    page: relativePath,
                    javascriptErrors: [...errors]
                });
            }

        } catch (error) {
            failedPages.push({
                page: relativePath,
                error: error.message
            });
        } finally {
            page.off("pageerror", errorHandler);
        }
    }

    console.log(`Total HTML pages discovered: ${htmlFiles.length}`);

    console.log(`Pages checked: ${htmlFiles.length}`);

    if (failedPages.length > 0) {
        console.log("Pages requiring attention:");
        console.log(JSON.stringify(failedPages, null, 2));
    }

    expect(failedPages).toEqual([]);

    console.log("PASS: All HTML pages loaded without JavaScript errors.");
});


test("All SkillNest pages have no mobile horizontal overflow", async ({ page }) => {
    const htmlFiles = findHTMLFiles(PROJECT_DIR);
    const widths = [360, 375, 414];
    const overflowPages = [];

    for (const width of widths) {
        await page.setViewportSize({
            width,
            height: 850
        });

        for (const file of htmlFiles) {
            const relativePath = path.relative(PROJECT_DIR, file)
                .split(path.sep)
                .join("/");

            try {
                await page.goto(`${BASE_URL}/${relativePath}`, {
                    waitUntil: "domcontentloaded"
                });

                const pageWidth = await page.evaluate(() => {
                    return document.documentElement.scrollWidth;
                });

                if (pageWidth > width) {
                    overflowPages.push({
                        page: relativePath,
                        screenWidth: width,
                        pageWidth
                    });
                }
            } catch (error) {
                overflowPages.push({
                    page: relativePath,
                    screenWidth: width,
                    error: error.message
                });
            }
        }
    }

    console.log(`Pages tested: ${htmlFiles.length}`);
    console.log(`Screen widths tested: ${widths.join(", ")}`);

    if (overflowPages.length > 0) {
        console.log("Pages with mobile overflow:");
        console.log(JSON.stringify(overflowPages, null, 2));
    }

    expect(overflowPages).toEqual([]);

    console.log("PASS: No horizontal overflow detected across all pages.");
});
