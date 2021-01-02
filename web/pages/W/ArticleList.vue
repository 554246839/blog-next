<template>
  <div class="web-article-list">
    <ul class="web-article-nav">
      <li :class="{'article-active': category === 'all'}">
        <nuxt-link to="/W/ArticleList">全部</nuxt-link>
      </li>
      <li :class="{'article-active': category === 'javascript'}">
        <nuxt-link to="/W/ArticleList/javascript">JavaScript</nuxt-link>
      </li>
      <li :class="{'article-active': category === 'typescript'}">
        <nuxt-link to="/W/ArticleList/typescript">TypeScript</nuxt-link>
      </li>
      <li :class="{'article-active': category === 'nodejs'}">
        <nuxt-link to="/W/ArticleList/nodejs">NodeJs</nuxt-link>
      </li>
      <li :class="{'article-active': category === 'webpack'}">
        <nuxt-link to="/W/ArticleList/webpack">Webpack</nuxt-link>
      </li>
    </ul>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, computed } from '@vue/composition-api'

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {

    // @ts-ignore
    const category: ComputedRef<any> = computed(() => context.root.$route.params.category || 'all')

    return {
      category
    }
  }
})
</script>

<style lang="less" scoped>
.web-article-list {
  .web-article-nav {
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    padding: 10px 0;
    margin-bottom: 20px;
    li {
      display: inline-block;
      font-size: 14px;
      color: #333;
      &.article-active {
        color: #ff7700;
      }
    }
  }
}
</style>
