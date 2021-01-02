<template>
  <div class="web-article-detail">
    <h1 class="article-title">文章标题</h1>
    <div class="article-abstract">
      <span class="article-category">[ javascript ] </span>摘要: xxx
    </div>
    <div class="article-content">
      文章正文
    </div>
    <div class="article-info">
      <span>发布时间：{{new Date().toLocaleDateString()}}</span>
      <span>阅读数：0</span>
      <span>评论数：0</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
})
</script>

<style lang="less" scoped>
.web-article-detail {
  .article-title {
    text-align: center;
    font-size: 24px;
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
    span {
      margin-right: 30px;
    }
  }
}
</style>
