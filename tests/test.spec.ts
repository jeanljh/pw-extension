
import { chromium, BrowserContext, Page, test } from '@playwright/test'
import data from '../data/input.json'

test.describe('Test Suite', async () => {
    test('Test', async () => {
        // Load metamask extension for chrome
        const extPath = __dirname.replace('tests', data.metaFolder)
        const browserContext: BrowserContext = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${extPath}`,
                `--load-extension=${extPath}`
            ]
        })
        // Go to metamask login page
        const page: Page = browserContext.pages()[0]
        await page.goto(data.urlMeta)
        await page.waitForLoadState()
        const tempPage: Page = await browserContext.newPage()
        await page.bringToFront()
        await tempPage.close()
    })
})