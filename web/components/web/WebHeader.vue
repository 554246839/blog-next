<template>
  <header class="web-header">
    <div class="web-header-container">
      <div class="blog-name">
        <nuxt-link to="/w/articleList">皮侠客</nuxt-link>
      </div>
      <div class="web-header-right">
        <a href="https://github.com/554246839" target="_blank">GitHub</a>
        <a href="https://www.cnblogs.com/kdcg/" target="_blank">博客园</a>
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
.web-header {
  position: fixed;
  width: 100%;
  line-height: 60px;
  padding: 0 ;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
  left: 0;
  top: 0;
  background: #ffe;
  z-index: 999;
  .web-header-container {
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .blog-name {
    font-size: 24px;
    font-weight: bold;
    font-family: 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-shadow: -3px 3px 5px rgba(255, 0, 0, .4);
  }
  .web-header-right {
    font-size: 14px;
    a {
      margin-left: 10px;
    }
  }
}
</style>
