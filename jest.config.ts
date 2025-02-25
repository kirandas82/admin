// jest.config.ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.config.ts']
  };

// export default {
//   "scripts": {
//     "test": "jest"
//   },
//   "jest": {
//     "testEnvironment": "jsdom",
//     "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"]
//   }
// }
  