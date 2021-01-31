<template>
  <div class="login">
    <client-only>
      <h1>登录</h1>
      <el-form :model="formData" label-width="80px" class="login-form">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginEvent">登录</el-button>
        </el-form-item>
      </el-form>
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType, SetupContext } from '@vue/composition-api'
import { login, loginAuth } from './api'

export default defineComponent({
  head: {
    title: '登录'
  },
  async asyncData(context: any) {
    const res = await loginAuth(context.$http)
    if (res) {
      context.redirect('/a')
    }
  },
  setup(props: PropType<any>, context: SetupContext) {
    const root: any = context.root
    const formData: Ref = ref({
      username: '',
      password: ''
    })

    function loginEvent() {
      login(root.$http, formData.value).then(res => {
        if (res) {
          root.$router.push('/a')
          root.$message.success('登录成功')
        }
      })
    }

    return {
      loginEvent,
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, .2);
  border-radius: 5px;
  text-align: center;
  padding: 20px 100px;
  background-color: #fff;
  .login-form {
    margin: 50px 0 20px;
  }
  .login-btn {
    width: 100%;
    display: block;
    margin-top: 30px;
  }
}
</style>
