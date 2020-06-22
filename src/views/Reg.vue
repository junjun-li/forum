<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <div class="layui-tab layui-tab-brief"
           lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content"
             id="LAY_ucm"
             style="padding: 20px 0;">
          <validation-observer ref="observer"
                               v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form>
                  <validation-provider v-slot="v"
                                       name="email"
                                       rules="required|email">
                    <div class="layui-form-item">
                      <label for="L_email"
                             class="layui-form-label">邮箱</label>
                      <div class="layui-input-inline">
                        <input type="text"
                               name="username"
                               v-model="regForm.username"
                               class="layui-input"
                               placeholder="将会成为您唯一的登入名" />
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{v.errors[0]}}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="v"
                                       name="name"
                                       rules="required|min:4|max:10">
                    <div class="layui-form-item">
                      <label for="L_username"
                             class="layui-form-label">昵称</label>
                      <div class="layui-input-inline">
                        <input type="text"
                               id="L_username"
                               name="name"
                               v-model="regForm.name"
                               class="layui-input"
                               placeholder="请输入昵称" />
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{v.errors[0]}}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="v"
                                       rules="required|min:6"
                                       vid="confirmation">
                    <!-- |confirmed:confirmation -->
                    <div class="layui-form-item">
                      <label for="L_pass"
                             class="layui-form-label">密码</label>
                      <div class="layui-input-inline">
                        <input type="password"
                               id="L_pass"
                               name="password"
                               v-model="regForm.password"
                               class="layui-input"
                               placeholder="请输入6位数以上密码" />
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{v.errors[0]}}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="v"
                                       rules="required|confirmed:confirmation">
                    <div class="layui-form-item">
                      <label for="L_repass"
                             class="layui-form-label">确认密码</label>
                      <div class="layui-input-inline">
                        <input type="password"
                               id="L_repass"
                               name="repassword"
                               v-model="regForm.repassword"
                               placeholder="再次输入密码"
                               class="layui-input" />
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{v.errors[0]}}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="v"
                                       rules="required|length:4">
                    <div class="layui-form-item">
                      <label for="L_vercode"
                             class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input type="text"
                               id="L_vercode"
                               name="code"
                               v-model="regForm.code"
                               placeholder="请输入验证码"
                               class="layui-input" />
                      </div>
                      <div>
                        <span class="svg"
                              @click="_getCode()"
                              v-html="svg"></span>
                      </div>
                    </div>
                    <div class="error-box">
                      <span>{{v.errors[0]}}</span>
                    </div>
                  </validation-provider>
                  <div class="layui-form-item">
                    <button class="layui-btn"
                            type="button"
                            @click="validate().then(submitReg)">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { reg, getCode } from '@/api/login'
import { mapState } from 'vuex'
export default {
  name: 'reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      regForm: {
        username: '11776174@qq.com',
        name: 'lijunjun',
        password: '123456',
        repassword: '123456',
        code: '1234',
        sid: ''
      },
      svg: ''
    }
  },
  computed: {
    ...mapState(['sid'])
  },
  created() {
    this.regForm.sid = this.sid
    this._getCode()
  },
  methods: {
    async _getCode() {
      let sid = this.sid
      getCode(sid).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.svg = res.data
        }
      })
    },
    async submitReg() {
      let isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      let res = await reg(this.regForm)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  margin-bottom: 0px;
}
.error-box {
  height: 20px;
  span {
    color: red;
  }
}
</style>
