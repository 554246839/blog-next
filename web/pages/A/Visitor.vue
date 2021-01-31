<template>
  <div class="admin-visitor">
    <el-table
      ref="singleTable"
      :data="visitorData.list"
      highlight-current-row
      style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column property="date" label="日期"></el-table-column>

      <el-table-column label="访问数量" align="center" width="300">
        <template slot-scope="scope">
          <span>{{scope.row.visitors.length}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="admin-pagination"
      layout="prev, pager, next, jumper, total"
      hide-on-single-page
      :page-size="visitorData.pageSize"
      :total="visitorData.total"
      @current-change="getVisitor">
    </el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="ip" label="IP" width="150"></el-table-column>
        <el-table-column property="url" label="Url"></el-table-column>
        <el-table-column property="time" label="Time" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, SetupContext } from '@vue/composition-api'
import { getVisitors } from './api'
import BLOG from '../../types/index'

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {
    const root: any = context.root

    const visitorData: Ref<BLOG.ADMIN.Visitors[]> = ref([])
    const dialogTableVisible: Ref = ref(false)
    const gridData: Ref<BLOG.ADMIN.Visitor[]> = ref([])
    const dialogTitle: Ref = ref('')
    
    async function getVisitor(pageNo: number = 1) {
      const res = await getVisitors(root.$http, {
        params: {
          pageSize: 10,
          pageNo
        }
      })
      visitorData.value = res
      console.log(res)
    }
    getVisitor()

    function showDetail(row: BLOG.ADMIN.Visitors) {
      dialogTitle.value = row.date
      gridData.value = row.visitors
      dialogTableVisible.value = true
    }

    return {
      getVisitor,
      visitorData,
      showDetail,
      dialogTableVisible,
      gridData,
      dialogTitle
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