
const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:3000";

test.describe("SkillNest Homepage Tests", () => {

    test("Homepage loads successfully", async ({ page }) => {
        const response = await page.goto(BASE_URL);

        expect(response.status()).toBe(200);
        await expect(page).toHaveTitle(/SkillNest/i);

        console.log("PASS: Homepage loaded successfully.");
    });

    test("Homepage has no horizontal overflow on mobile", async ({ page }) => {
        const widths = [360, 375, 414];

        for (const width of widths) {
            await page.setViewportSize({
                width: width,
                height: 850
            });

            await page.goto(BASE_URL);

            const pageWidth = await page.evaluate(() => {
                return document.documentElement.scrollWidth;
            });

            expect(
                pageWidth,
                `Horizontal overflow detected at ${width}px`
            ).toBeLessThanOrEqual(width);

            console.log(`PASS: No overflow at ${width}px.`);
        }
    });

    test("Homepage menu button exists on mobile", async ({ page }) => {
        await page.setViewportSize({
            width: 375,
            height: 850
        });

        await page.goto(BASE_URL);

        const menuButton = page.locator("#menuToggle");

        await expect(menuButton).toBeVisible();

        console.log("PASS: Mobile menu button is visible.");
    });

test("Homepage has no JavaScript errors or failed resources", async ({ page }) => {
    const javascriptErrors = [];
    const failedResources = [];

    page.on("pageerror", error => {
        javascriptErrors.push(error.message);
    });

    page.on("requestfailed", request => {
        failedResources.push({
            url: request.url(),
            error: request.failure()?.errorText
        });
    });

    const response = await page.goto(BASE_URL);

    expect(response.status()).toBe(200);

    await page.waitForLoadState("networkidle");

    expect(
        javascriptErrors,
        "JavaScript errors were detected"
    ).toEqual([]);

    expect(
        failedResources,
        "Some resources failed to load"
    ).toEqual([]);

    console.log("PASS: No JavaScript errors.");
    console.log("PASS: No failed resource requests.");
});

test("Homepage internal links open valid pages", async ({ page }) => {
    await page.goto(BASE_URL);

    const links = await page.locator("a[href]").evaluateAll(anchors => {
        return [...new Set(
            anchors
                .map(anchor => anchor.href)
                .filter(url => {
                    try {
                        const parsed = new URL(url);

                        return (
                            parsed.origin === window.location.origin &&
                            parsed.pathname !== window.location.pathname
                        );
                    } catch {
                        return false;
                    }
                })
        )];
    });

    const brokenLinks = [];

    for (const link of links) {
        try {
            const response = await page.request.get(link);

            if (!response.ok()) {
                brokenLinks.push({
                    url: link,
                    status: response.status()
                });
            }
        } catch (error) {
            brokenLinks.push({
                url: link,
                error: error.message
            });
        }
    }

    console.log(`Checked ${links.length} internal links.`);

    expect(
        brokenLinks,
        "Broken internal homepage links were found"
    ).toEqual([]);

    console.log("PASS: All checked internal links are working.");
});

});
