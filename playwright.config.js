const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  webServer: {
    command: 'npm run serve',
    port: 8080,
    reuseExistingServer: !process.env.CI,
  },
  testDir: './tests',
  use: {
    browserName: 'chromium',
  },
  timeout: 30000,
})
