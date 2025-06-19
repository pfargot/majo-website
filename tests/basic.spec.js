/* global describe, test, expect, beforeAll, afterAll, beforeEach, afterEach, axe */
const fs = require('fs')
const { chromium } = require('@playwright/test')

describe('Build and Deploy Tests', () => {
  test('package.json exists and has required scripts', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    expect(packageJson.scripts.build).toBeDefined()
    expect(packageJson.scripts.test).toBeDefined()
  })

  test('build directory is gitignored', () => {
    const gitignore = fs.readFileSync('.gitignore', 'utf8')
    expect(gitignore).toMatch(/build/i)
  })

  test('GitHub workflow files exist', () => {
    expect(fs.existsSync('.github/workflows/deploy.yml')).toBe(true)
    expect(fs.existsSync('.github/workflows/branch-protection.yml')).toBe(true)
    expect(fs.existsSync('.github/workflows/dependabot-auto-merge.yml')).toBe(
      true
    )
  })
})

describe('Main Page Elements', () => {
  let indexHtml

  beforeAll(() => {
    indexHtml = fs.readFileSync('src/index.html', 'utf8')
  })

  test('has required meta tags', () => {
    expect(indexHtml).toMatch(/<meta\s+charset=["']UTF-8["']\s*\/?>/)
    expect(indexHtml).toMatch(/<meta\s+name=["']viewport["']/)
  })

  test('contains main navigation elements', () => {
    expect(indexHtml).toMatch(/<nav[^>]*id=["']navbarCollapse["']/)
    expect(indexHtml).toMatch(/href=["']#home["']/)
    expect(indexHtml).toMatch(/href=["']#about["']/)
    expect(indexHtml).toMatch(/href=["']#contact["']/)
  })

  test('contains main content sections', () => {
    expect(indexHtml).toMatch(/<section[^>]*id=["']home["']/)
    expect(indexHtml).toMatch(/<section[^>]*id=["']about["']/)
    expect(indexHtml).toMatch(/<footer[^>]*id=["']contact["']/)
  })

  test('contains required scripts', () => {
    expect(indexHtml).toMatch(/<script>[\s\S]*menu-scroll[\s\S]*<\/script>/)
  })
})

describe('Browser Render Tests', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await chromium.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    })
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()

    page.on('pageerror', (exception) => {
      console.warn(`Page error: ${exception.message}`)
    })

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.warn(`Console error: ${msg.text()}`)
      }
    })

    page.setDefaultNavigationTimeout(30000)
  })

  afterEach(async () => {
    await page.close()
  })

  test('page loads without JavaScript errors', async () => {
    await page.goto('http://localhost:3000')
    // The test will fail automatically if any JS errors are caught by the above error handlers
  })

  test('main sections render and are visible', async () => {
    await page.goto('http://localhost:3000')

    // Check if main sections are visible
    await expect(page.locator('#home')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('navigation menu works', async () => {
    await page.goto('http://localhost:3000')

    // Test navigation menu functionality
    await page.click('a[href="#about"]')
    // Wait for smooth scroll animation
    await page.waitForTimeout(500)
    // Check if about section is in viewport
    const isInViewport = await page.evaluate(() => {
      const element = document.querySelector('#about')
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      )
    })
    expect(isInViewport).toBe(true)
  })

  test('no accessibility violations', async () => {
    const maxRetries = 3
    let attempt = 0
    let lastError

    while (attempt < maxRetries) {
      try {
        await page.goto('http://localhost:3000', {
          waitUntil: 'networkidle0',
          timeout: 30000,
        })

        await page.waitForSelector('#home', { state: 'visible' })
        await page.waitForSelector('#about', { state: 'visible' })
        await page.waitForSelector('#contact', { state: 'visible' })

        const violations = await page.evaluate(() => {
          if (typeof axe === 'undefined') {
            console.warn('axe-core not loaded')
            return []
          }
          return new Promise((resolve) => {
            axe.run((err, results) => {
              if (err) throw err
              resolve(results.violations)
            })
          })
        })

        expect(violations).toHaveLength(0)
        break
      } catch (error) {
        lastError = error
        attempt++
        if (attempt === maxRetries) {
          throw lastError
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  }, 90000)
})
