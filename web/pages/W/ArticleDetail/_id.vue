<template>
  <div class="web-article-detail">
    <h1 class="article-title">{{data.title}}</h1>
    <div class="article-abstract">
      <span class="article-category">[ {{data.categoryLabel}} ] </span>{{data.abstract}}
    </div>

    <div class="article-content markdown-body" v-html="data.content"></div>

    <div class="article-info">
      <span>发布时间：{{data.created}}</span>
      <span>阅读数：{{data.readNums}}</span>
      <span>点赞数：{{data.likeNums}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { getArticleDetail } from '../api'

export default defineComponent({
  async asyncData(context: any) {
    const id: string = context.params.id
    const data = await getArticleDetail(context.$http, id)

    if (!data) {
      context.redirect('/w/404')
    } else {
      return {
        data
      }
    }
  }
})
</script>

<style lang="less" scoped>
.web-article-detail {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, .2);
  border-radius: 5px;
  .article-title {
    text-align: left;    
    margin: .67em 0;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.5;
  }
  .article-abstract {
    text-indent: 2em;
    margin: 20px 0;
    color: #666;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
    border-radius: 5px;
    padding: 20px;
  }
  .article-category {
    color: #f70;
  }
  .article-info {
    margin: 20px 0;
    color: #999;
    font-size: 14px;
    span {
      margin-right: 30px;
    }
  }
}
</style>
