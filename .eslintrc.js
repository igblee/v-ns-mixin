/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-28 16:19:56
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-13 16:00:52
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["@vue/standard", "plugin:vue/recommended"],
  rules: {
    /** #NIMBUS-TPL#eslint-rule#START */
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
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ]
    /** #NIMBUS-TPL#eslint-rule#END */
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};