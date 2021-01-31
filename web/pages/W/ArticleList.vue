<template>
  <div class="web-article-list">
    <ul class="web-article-nav">
      <li :class="{'article-active': category === 'all'}">
        <nuxt-link to="/w/articleList">全部</nuxt-link>
      </li>
      <li
        v-for="item in categoryList"
        :key="item.value"
        :class="{'article-active': category === item.value}">
        <nuxt-link :to="`/w/articleList/${item.value}`">{{item.name}}</nuxt-link>
      </li>
      <li class="search">
        <el-input size="mini" placeholder="请输入查找的标题" v-model="searchTxt" @click.enter="searchEvent">
          <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
        </el-input>
      </li>
    </ul>
    <nuxt-child ref="articleList" :searchTxt="searchTxt"></nuxt-child>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, computed, ComputedRef, Ref, ref } from '@vue/composition-api'
import { getCategoryList } from './api'

export default defineComponent({
  async asyncData(context: any) {
    const categoryList = await getCategoryList(context.$http)

    return {
      categoryList
    }
  },
  setup(props: PropType<any>, context: SetupContext) {
    const root: any = context.root
    const refs: any = context.refs

    const searchTxt: Ref = ref('')

    const category: ComputedRef<any> = computed(() => root.$route.params.category || 'all')

    function searchEvent() {
      refs.articleList.requestData(1)
    }

    return {
      category,
      searchTxt,
      searchEvent
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
      line-height: 28px;
      color: #333;
      &.article-active {
        color: #ff7700;
        font-weight: bold;
      }
    }
    .search {
      float: right;
    }
  }
}
</style>
