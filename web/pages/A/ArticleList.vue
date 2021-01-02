<template>
  <div class="admin-article-list">
    <el-table
      ref="singleTable"
      :data="articleData"
      highlight-current-row
      style="width: 100%">

      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column property="name" label="标题">
        <template slot-scope="scope">
          <nuxt-link :to="`/W/ArticleDetail/${scope.row.id}`">{{scope.row.name}}</nuxt-link>
        </template>
      </el-table-column>

      <el-table-column property="isPublic" label="发布状态" align="center" width="120">
        <template slot-scope="scope">
          {{scope.row.isPublic ? '已发布' : '未发布'}}
        </template>
      </el-table-column>

      <el-table-column property="readNums" label="阅读数" align="center" width="120"></el-table-column>

      <el-table-column property="edit" label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editArticle(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

      <el-table-column property="delete" label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="admin-pagination"
      layout="prev, pager, next, jumper, total"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import BLOG from '../../types/index'

export default defineComponent({
  setup(props: PropType<any>, content: SetupContext) {
    
    const articleData: BLOG.COMMON.ArticleListItem[] = [{
      name: 'node 对于 formdata 数据解析处理 ',
      abstract: '摘要',
      category: 'nodejs',
      isPublic: true,
      readNums: 0,
      id: '1234567890'
    }]

    function editArticle(row: BLOG.COMMON.ArticleListItem) {
      // @ts-ignore
      content.root.$router.push(`/A/Article/${row.id}`)
    }

    function deleteArticle(row: BLOG.COMMON.ArticleListItem) {

    }

    return {
      articleData,
      editArticle,
      deleteArticle
    }
  }
})
</script>

<style lang="less" scoped>
.admin-article-list {
  .admin-pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>