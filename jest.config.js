module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "transform": {
       "^.+\\.svg$": "<rootDir>/__mocks__/fileMock.ts"
    },
};
