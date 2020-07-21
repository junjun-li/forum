<template>
  <validation-observer ref="observer"
                       v-slot="{validate}">
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <validation-provider v-slot="v"
                           name="name"
                           rules="required|min:4|max:10">
        <div class="layui-form-item">
          <label for="L_username"
                 class="layui-form-label">昵称
          </label>
          <div class="layui-input-inline">
            <input type="text"
                   name="name"
                   class="layui-input"
                   v-model="name"/>
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00;"></span>
          </div>
        </div>
        <div class="error-box">
          <span>{{v.errors[0]}}</span>
        </div>
      </validation-provider>
      <validation-provider v-slot="v"
                           name="location"
                           rules="required">
        <div class="layui-form-item">
          <label for="L_city"
                 class="layui-form-label">城市
          </label>
          <div class="layui-input-inline">
            <input type="text"
                   v-model="location"
                   class="layui-input"/>
          </div>
        </div>
        <div class="error-box">
          <span>{{v.errors[0]}}</span>
        </div>
      </validation-provider>
      <validation-provider v-slot="v"
                           name="gender"
                           rules="required">
        <div class="layui-form-item">
          <label for="L_city"
                 class="layui-form-label">性别
          </label>
          <div class="layui-input-inline gray mt1 ml1">
            <label for="gender1"
                   class="mr1">
              <input id="gender1"
                     type="radio"
                     name="sex"
                     v-model="gender"
                     value="0"
                     title="男"/>
              <i class="layui-icon layui-icon-circle"
                 :class="{'layui-icon-radio': gender ==='0'}"></i>
              男
            </label>
            <label for="gender2">
              <input id="gender2"
                     type="radio"
                     name="sex"
                     v-model="gender"
                     value="1"
                     title="女"/>
              <i class="layui-icon layui-icon-circle"
                 :class="{'layui-icon-radio': gender ==='1'}"></i>
              女
            </label>
          </div>
        </div>
        <div class="error-box">
          <span>{{v.errors[0]}}</span>
        </div>
      </validation-provider>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign"
               class="layui-form-label">签名
        </label>
        <div class="layui-input-block">
          <textarea placeholder="随便写些什么刷下存在感"
                    v-model="regmark"
                    class="layui-textarea"
                    style="height: 80px;">
          </textarea>
        </div>
      </div>
      <div class="layui-form-item" style="margin-top: 15px">
        <button class="layui-btn"
                @click="validate().then(submitUpdate)">确认修改
        </button>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { updateUserInfo } from '@/api'

export default {
  name: 'myInfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      location: '',
      gender: '',
      regmark: ''
    }
  },
  mounted () {
    let { username, name, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submitUpdate () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      let res = await updateUserInfo({
        username: this.username,
        name: this.name,
        location: this.location,
        gender: this.gender,
        regmark: this.regmark
      })
      if (res.code === 0) {
        this.$pop('', '修改成功')
        this.$store.commit('setUserInfo', {
          ...this.$store.state.userInfo,
          username: this.username,
          name: this.name,
          location: this.location,
          gender: this.gender,
          regmark: this.regmark
        })
      }
    }
  }
}
</script>

<style lang="scss"
       scoped>
.layui-icon-radio {
  color: #5fb878;
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
