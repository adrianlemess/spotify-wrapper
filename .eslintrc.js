module.exports = {
    "extends": "airbnb",
    "rules": {
      "comma-dangle": ["error", "never"],
      "no-param-reassign": 0,
      "no-unused-expressions": 0,
      "no-confusion-arrow": 0
    },
    "env": {
      "mocha": true
    },
    "plugins": [
      "import"
  ],
};
