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
  extends: ['standard', 'plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'comma-dangle': [1, 'never'], // 要求或禁止末尾逗号
    // eqeqeq: [1, 'allow-null'], // 要求使用 === 和 !==
    // // indent: [
    // //   1,
    // //   2,
    // //   {
    // //     SwitchCase: 1
    // //   }
    // // ], // 强制使用一致的缩进
    // // 'no-unused-vars': [
    // //   1,
    // //   {
    // //     vars: 'all',
    // //     args: 'none'
    // //   }
    // // ], // 禁止出现未使用过的变量
    // semi: [1, 'never'], // 禁止使用分号
    // // 函数后面不要跟一个空格
    // 'space-before-function-paren': 'off'
    // 检测到使用let关键字声明的变量，在初始分配后从未重新分配变量，将let替换成const,减少认知负荷并提高可维护性。 如果想要关闭这个规则，就在eslint配置文件里这样写：
    'prefer-const': 'off'
  }
}
