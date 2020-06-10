// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: [
//     'plugin:vue/essential',
//     '@vue/standard'
//   ],
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
//   }
// }

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": [1, "never"], // 要求或禁止末尾逗号
    eqeqeq: [1, "allow-null"], // 要求使用 === 和 !==
    indent: [
      1,
      2,
      {
        SwitchCase: 1
      }
    ], // 强制使用一致的缩进
    "no-unused-vars": [
      1,
      {
        vars: "all",
        args: "none"
      }
    ], // 禁止出现未使用过的变量
    semi: [1, "never"] // 禁止使用分号
  }
};
