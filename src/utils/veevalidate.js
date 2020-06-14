import { extend, localize } from 'vee-validate'
import {
  required,
  email,
  min,
  length,
  confirmed
} from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN.json'
// 设置语言
// https://logaretm.github.io/vee-validate/guide/localization.html#using-the-default-i18n

// No message specified.
extend('email', email)
extend('min', min)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)

// localize('zh_CN', {
//   messages: {
//     ...zh_CN.messages,
//     required: '请输入{_field_}',
//     email:'请输入😯😯'
//   }
// })
// 使用中文
localize('zh')
// 对单独的进行设置
localize({
  zh: {
    messages: {
      ...zh.messages,
      required: '请输入{_field_}'
    },
    names: {
      email: '邮箱',
      password: '密码',
      code: '验证码'
    },
    fields: {
      email: {
        email: '邮箱不符合规范'
      },
      password: {
        min: '{_field_}的最小长度为6位'
      },
      code: {
        length: '{_field_}的长度为4位'
      }
    }
  }
})
