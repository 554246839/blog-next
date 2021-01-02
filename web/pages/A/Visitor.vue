<template>
  <div class="admin-visitor">
    <el-table
      ref="singleTable"
      :data="visitorData"
      highlight-current-row
      style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column property="date" label="日期"></el-table-column>

      <el-table-column property="visitors" label="访问数量" align="center" width="300"></el-table-column>

      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetail(scope.row)">查看</el-button>
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

    const visitorData: BLOG.ADMIN.Visitor[] = [{
      date: '2016-05-02',
      visitors: 100,
      data: [],
      id: 'abcdefghigk'
    }]

    function showDetail(row: BLOG.ADMIN.Visitor) {

    }

    return {
      visitorData,
      showDetail
    }
  }
})
</script>

<style lang="less" scoped>
.admin-visitor {
  .admin-pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>