<template>
  <div class="web-category">
    <ul class="web-article-list">
      <li class="web-article-item" v-for="item in data.list" :key="item.id">
        <div class="article-banner">
          <img :src="item.banner" :alt="item.title">
        </div>
        <div class="article-info">
          <h1 class="article-name">
            <nuxt-link :to="`/w/articleDetail/${item._id}`" target="_blank">{{item.title}}</nuxt-link>
          </h1>
          <div class="article-category">{{item.categoryLabel}}</div>
          <div class="article-abstract">{{item.abstract}}</div>
          <div class="article-public-info">
            <span>发布时间： {{item.created}}</span>
            <span>阅读数： {{item.readNums}}</span>
          </div>
        </div>
      </li>
    </ul>

    <client-only>
      <el-pagination
        class="article-pagination"
        :background="true"
        layout="prev, pager, next, jumper, total"
        hide-on-single-page
        :page-size="data.pageSize"
        :total="data.total"
        :current-page="data.pageNo"
        @current-change="requestData">
      </el-pagination>
    </client-only>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, getCurrentInstance, PropType, SetupContext } from '@vue/composition-api'
import { getArticleList } from '../api'

interface SearchTxt {
  searchTxt: String
}

export default defineComponent({
  props: {
    searchTxt: {
      type: String
    }
  },
  async asyncData(context: any) {
    console.log(context)
    const category: string = context.params.category
    const data: any = await getArticleList(context.$http, {
      params: {
        pageSize: 10,
        pageNo: 1,
        category
      }
    })

    return {
      data
    }
  },
  setup(props: SearchTxt, context: SetupContext) {
    const root: any = context.root
    
    const category: ComputedRef<any> = computed(() => root.$route.params.category || 'all')

    const curInstance: any = getCurrentInstance()

    async function requestData(pageNo: number) {
      const data: any = await getArticleList(root.$http, {
        params: {
          pageSize: 10,
          pageNo,
          category: category.value,
          key: props.searchTxt
        }
      })

      curInstance.data.data = data
    }

    return {
      requestData
    }
  }
})
</script>

<style lang="less" scoped>
.web-category {
  padding: 20px 0;
  .web-article-list {
    margin-bottom: 20px;
  }
  .web-article-item {
    display: flex;
    margin-bottom: 30px;
    justify-content: flex-start;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
    padding: 10px;
    border-radius: 5px;
  }
  .article-banner {
    margin-right: 20px;
    flex: 0 0 340px;
    border: 1px solid #eee;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-info {
    padding: 20px 0;
    .article-name {

    }
    .article-category {
      color: #ff7700;
      margin: 20px 0;
    }
    .article-abstract {
      height: 85px;
      color: #bbb;
      margin-bottom: 15px;
      overflow: hidden;
    }
    .article-public-info {
      color: #aaa;
      font-size: 14px;
      span {
        margin-right: 20px;
      }
    }
  }
  .article-pagination {
    overflow-x: auto;
  }
}
</style>
