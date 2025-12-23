module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // فقط هذا الآن
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
  }
};