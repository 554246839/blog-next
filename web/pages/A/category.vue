<template>
  <div class="admin-category-list">
    <div>
      <el-button type="primary" size="small" @click="dialogFormVisible = true">新增分类</el-button>
    </div>
    <div v-if="data.length" class="category-container">
      <el-tag
        v-for="tag in data"
        :key="tag.value"
        class="tag-item"
        closable
        @close="deleteCategoryEvent(tag)"
        :type="tag.value">
        {{tag.name}}
      </el-tag>
    </div>

    <el-dialog title="新增分类" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" :autofocus="true" size="small" />
        </el-form-item>
        <el-form-item label="分类ID" :label-width="formLabelWidth">
          <el-input v-model="form.value" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addCategoryEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, ref, Ref } from '@vue/composition-api'
import { getCategoryList, addCategory, deleteCategory } from './api'

export default defineComponent({
  setup(props: PropType<any>, content: SetupContext) {
    const root: any = content.root
    
    const data: Ref = ref([])
    const activeItem: Ref = ref('')
    const dialogFormVisible: Ref = ref(false)
    const formLabelWidth: Ref = ref('80px')
    const form: Ref = ref({
      name: '',
      value: ''
    })

    async function requestData() {
      const res = await getCategoryList(root.$http)
      data.value = res
    }

    async function addCategoryEvent() {
      await addCategory(root.$http, form.value)

      requestData()
      dialogFormVisible.value = false
      form.value = {
        name: '',
        value: ''
      }
    }

    async function deleteCategoryEvent(tag: any) {
      
      root.$confirm('确认是否删除该分类?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(root.$http, tag._id).then((res: any) => {
          requestData()
          root.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    }

    requestData()

    return {
      addCategoryEvent,
      deleteCategoryEvent,
      form,
      data,
      activeItem,
      dialogFormVisible,
      formLabelWidth
    }
  }
})
</script>

<style lang="less" scoped>
.admin-category-list {
  .category-container {
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
  }
  .tag-item {
    margin: 10px;
  }
}
</style>