<template>
  <client-only>
    <el-container class="admin">
      <admin-header />
      <el-container class="admin-container">
        <el-aside class="admin-aside" :width="asideWith">
          <admin-aside @toggleAside="toggleAside" @handleSelect='handleSelect' v-model="label" />
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="admin-breadcrumb">
            <el-breadcrumb-item>{{label}}</el-breadcrumb-item>
          </el-breadcrumb>

          <nuxt />

        </el-main>
      </el-container>
    </el-container>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'

export default defineComponent({
  middleware: 'admin-auth',
  setup() {
    let asideWith: Ref = ref('250px')
    let label: Ref = ref('')

    function toggleAside(width: string) {
      asideWith.value = width
    }

    function handleSelect(showLabel: string[]) {
      label.value = showLabel
    }

    return {
      label,
      asideWith,
      toggleAside,
      handleSelect
    }
  }
})
</script>

<style lang="less" scoped>
.admin {
  padding: 60px 0 0;
  position: relative;
  .admin-container {
    height: calc(100vh - 60px);
  }
  .admin-aside {
    padding: 0;
  }
  .admin-breadcrumb {
    margin-bottom: 15px;
    height: 14px;
  }
}
</style>