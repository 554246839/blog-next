<template>
  <div class="web">
    <web-header />
    <div class="web-main">
      <Nuxt />
    </div>
    <web-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
})
</script>

<style lang="less" scoped>
.web {
  padding: 60px 0 0;
  background: #ffe;
  position: relative;
  .web-main {
    min-height: calc(100vh - 160px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
}
</style>
