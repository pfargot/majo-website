module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/tests/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
}
