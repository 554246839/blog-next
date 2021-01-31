<template>
  <div class="web-pagehome">
    <span class="intro">{{intro}}</span>
    <el-button type="text" class="btn" :class="{transition: isOver}" @click="jumpInner">进入博客</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, Ref, getCurrentInstance, ComputedRef, SetupContext, PropType } from '@vue/composition-api'

export default defineComponent({
  asyncData(context: any) {
    // context.redirect('/w/articleList')
  },

  layout: 'home',

  setup (props: PropType<any>, context: SetupContext) {
    const root: any = context.root

    const msg = 'Hi, I am 皮侠客'
    const intro: Ref = ref('')
    const isOver: Ref = ref(false)

    onMounted(() => {
      let i: number = 0
      let interval: any = setInterval(() => {
        intro.value += msg[i++]
        if (i >= msg.length) {
          clearInterval(interval)
          interval = null
          setTimeout(() => {
            isOver.value = true
          }, 500)
        }
      }, 200)
    })

    function jumpInner() {
      root.$router.push('/w/articleList')
    }

    return {
      intro,
      isOver,
      jumpInner
    }
  }
})
</script>

<style lang="less" scoped>
.web-pagehome {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 40px;
  .intro {
    margin-bottom: 40px;
  }
  .btn {
    font-size: 20px;
    cursor: default;
    opacity: 0;
    transition: opacity 2s;
  }
  .transition {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
