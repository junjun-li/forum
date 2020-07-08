<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <div class="layui-tab layui-tab-brief"
           lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content"
             id="LAY_ucm"
             style="padding: 20px 0;">
          <!-- // eslint-disable-next-line vue/no-unused-vars -->
          <validation-observer ref="observer"
                               v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <validation-provider v-slot="v"
                                       name="email"
                                       rules="required|email">
                    <div class="layui-form-item">
                      <label for="L_email"
                             class="layui-form-label">邮箱
                      </label>
                      <div class="layui-input-inline">
                        <input type="text"
                               name="username"
                               v-model="username"
                               placeholder="请输入邮箱"
                               autocomplete="off"
                               class="layui-input"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="v"
                                       name="password"
                                       rules="required|min:6">
                    <div class="layui-form-item">
                      <label for="L_pass"
                             class="layui-form-label">密码
                      </label>
                      <div class="layui-input-inline">
                        <input type="password"
                               name="password"
                               v-model="password"
                               placeholder="请输入密码"
                               autocomplete="off"
                               class="layui-input"/>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="v"
                                       name="code"
                                       rules="required|length:4">
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_vercode"
                               class="layui-form-label">验证码
                        </label>
                        <div class="layui-input-inline">
                          <input type="text"
                                 name="code"
                                 v-model="code"
                                 placeholder="请输入验证码"
                                 autocomplete="off"
                                 class="layui-input"/>
                        </div>
                        <div>
                          <span class="svg"
                                @click="_getCode()"
                                v-html="svg"></span>
                        </div>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{ v.errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <div class="layui-form-item">
                    <button type="button"
                            class="layui-btn"
                            @click="validate().then(submitLogin)">立即登录
                    </button>
                    <span>
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a href
                       onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                       class="iconfont icon-qq"
                       title="QQ登入"></a>
                    <a href
                       onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                       class="iconfont icon-weibo"
                       title="微博登入"></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, login } from '@/api/index'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { v4 as uuid } from 'uuid'

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: '',
      sid: ''
    }
  },
  mounted () {
    window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.sid = sid
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      let sid = this.sid
      getCode(sid).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.svg = res.data
        }
      })
    },
    async submitLogin () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      login({
        username: this.username,
        password: this.username,
        code: this.code,
        sid: this.sid
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss"
       scoped>
.svg {
  // position: relative;
  // top: -4px;
  height: 38px;
}
.layui-form-item {
  margin-bottom: 0;
}
.error-box {
  height: 20px;
  span {
    color: #c00;
  }
}
</style>
