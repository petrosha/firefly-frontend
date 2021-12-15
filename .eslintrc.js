module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/prop-types": [0],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "space-infix-ops": ["error", { "int32Hint": false }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "no-multi-spaces": "error",
    "arrow-spacing": "error",
    "react/jsx-curly-spacing": [2, { "when": "always", "spacing": { "objectLiterals": "never" } }]
  }
};
