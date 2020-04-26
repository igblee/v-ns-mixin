module.exports = {
  root: true,
  "extends": ["rollup", "standard", "eslint:recommended" ],
  env: {
    node: true
  },
  rules: {
    "prettier/prettier": 0,
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": [
      "error",
      {
        arrays: "always",
        objects: "always",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "array-bracket-spacing": ["off", "always"],
    "standard/object-curly-even-spacing": [0, "either"],
    "standard/array-bracket-even-spacing": [0, "either"],
    "standard/computed-property-even-spacing": [2, "even"],
    "standard/no-callback-literal": [2, ["cb", "callback"]],
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};