<template>
  <header class="admin-header">
    <div class="blog-name">皮侠客</div>
    <div class="admin-header-right">
      <nuxt-link to="/w/articleList" target="_blank">首页</nuxt-link>
      <span class="logout" @click="logoutEvent">退出登录</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import { logout } from '../api'

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {
    const root: any = context.root

    async function logoutEvent() {
      const res = await logout(root.$http)
      if (res) {
        root.$router.push('/Login')
        root.$message.success('退出登录成功')
      }
    }

    return {
      logoutEvent
    }
  }
})
</script>

<style lang="less" scoped>
.admin-header {
  position: fixed;
  width: 100%;
  line-height: 60px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
  left: 0;
  top: 0;
  display: flex;
  padding: 0 20px;
  background: #fff;
  justify-content: space-between;
  .blog-name {
    font-size: 24px;
    font-weight: bold;
    padding-left: 100px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  .admin-header-right {
    font-size: 14px;
  }
  .logout {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>