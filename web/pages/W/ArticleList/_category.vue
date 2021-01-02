<template>
  <div class="web-category">
    <ul class="web-article-list">
      <li class="web-article-item">
        <div class="article-banner">
          <img src="https://zmingcx.com/wp-content/uploads/2020/05/sjfm.jpg" alt="文章banner">
        </div>
        <div class="article-info">
          <h1 class="article-name">
            <nuxt-link to="/W/ArticleDetail/123456" target="_blank">文章标题</nuxt-link>
          </h1>
          <div class="article-category">{{category}}</div>
          <div class="article-abstract">文章摘要</div>
          <div class="article-public-info">
            <span>发布时间： {{new Date().toLocaleDateString()}}</span>
            <span>阅读数： 100</span>
          </div>
        </div>
      </li>
      <li class="web-article-item">
        <div class="article-banner">
          <img src="https://zmingcx.com/wp-content/uploads/2020/05/sjfm.jpg" alt="文章banner">
        </div>
        <div class="article-info">
          <h1 class="article-name">
            <nuxt-link to="/W/ArticleDetail/123456" target="_blank">文章标题</nuxt-link>
          </h1>
          <div class="article-category">{{category}}</div>
          <div class="article-abstract">文章摘要</div>
          <div class="article-public-info">
            <span>发布时间： {{new Date().toLocaleDateString()}}</span>
            <span>阅读数： 100</span>
          </div>
        </div>
      </li>
      <li class="web-article-item">
        <div class="article-banner">
          <img src="https://zmingcx.com/wp-content/uploads/2020/05/sjfm.jpg" alt="文章banner">
        </div>
        <div class="article-info">
          <h1 class="article-name">
            <nuxt-link to="/W/ArticleDetail/123456" target="_blank">文章标题</nuxt-link>
          </h1>
          <div class="article-category">{{category}}</div>
          <div class="article-abstract">文章摘要</div>
          <div class="article-public-info">
            <span>发布时间： {{new Date().toLocaleDateString()}}</span>
            <span>阅读数： 100</span>
          </div>
        </div>
      </li>
    </ul>

    <client-only>
      <el-pagination
        class="article-pagination"
        :background="true"
        layout="prev, pager, next, jumper, total"
        :total="1000">
      </el-pagination>
    </client-only>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, getCurrentInstance, PropType, SetupContext } from '@vue/composition-api'

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
.web-category {
  padding: 20px 0;
  .web-article-list {
    margin-bottom: 20px;
  }
  .web-article-item {
    display: flex;
    margin-bottom: 30px;
    justify-content: flex-start;
  }
  .article-banner {
    margin-right: 20px;
    flex: 0 0 340px;
  }
  .article-info {
    .article-name {

    }
    .article-category {
      color: #ff7700;
      margin: 20px 0;
    }
    .article-abstract {
      height: 105px;
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
