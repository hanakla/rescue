module.exports = {
  rootDir: ".",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "src/.*\\.spec\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  testURL: "http://localhost/",
};
