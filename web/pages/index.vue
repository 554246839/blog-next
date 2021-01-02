<template>
  <div class="web-pagehome">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, Ref, getCurrentInstance, ComputedRef, SetupContext, PropType } from '@vue/composition-api'

export default defineComponent({
  asyncData(context: any) {
    context.redirect('/W/ArticleList')
  },

  setup (props: PropType<any>, context: SetupContext) {
    const root: any = context.root
    // root.$myInjectedFunction('works in setup')
    onMounted(() => {
      root.$http.get('/').then((res: any) => {
        console.log(res.data, 'onMounted=====')
      })
    })
    const message: Ref = ref('This is a message')

    return {
      message
    }
  }
})
</script>

<style lang="less" scoped>
.web-pagehome {
}
</style>
