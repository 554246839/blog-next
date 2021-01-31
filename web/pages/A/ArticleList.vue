<template>
  <div class="admin-article-list">
    <el-table
      ref="singleTable"
      :data="data.list"
      highlight-current-row
      style="width: 100%">

      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column property="name" label="标题">
        <template slot-scope="scope">
          <nuxt-link :to="`/w/articleDetail/${scope.row._id}`">{{scope.row.title}}</nuxt-link>
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
          <el-button type="text" size="small" @click="deleteArticleEvent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="admin-pagination"
      layout="prev, pager, next, jumper, total"
      hide-on-single-page
      :page-size="data.pageSize"
      :total="data.total"
      @current-change="requestData">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, ref, Ref } from '@vue/composition-api'
import { getArticleList, deleteArticle } from './api'
import BLOG from '../../types/index'

export default defineComponent({
  setup(props: PropType<any>, content: SetupContext) {
    const root: any = content.root
    
    let data: Ref = ref({})

    async function requestData(pageNo: number = 1) {
      const resData = await getArticleList(root.$http, {
        params: {
          pageSize: 10,
          pageNo
        }
      })
      data.value = resData
    }

    function editArticle(row: BLOG.COMMON.ArticleListItem) {
      root.$router.push(`/a/article/${row._id}`)
    }

    function deleteArticleEvent(row: BLOG.COMMON.ArticleListItem) {
      root.$confirm('确认是否删除该文章?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(root.$http, {  _id: row._id }).then((res: any) => {
          requestData(data.value.pageNo)
          root.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    }

    requestData()

    return {
      editArticle,
      deleteArticleEvent,
      requestData,
      data
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