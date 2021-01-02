<template>
  <div class="atricle-edit">
    <el-form label-position="left" label-width="80px" :model="articleInfo">
      <el-form-item label="标题">
        <el-input v-model="articleInfo.name" size="small" class="article-input"></el-input>
      </el-form-item>
      <el-form-item label="banner">
        <upload />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-radio-group v-model="articleInfo.category">
          <el-radio label="Javascript"></el-radio>
          <el-radio label="TypeScript"></el-radio>
          <el-radio label="NodeJs"></el-radio>
          <el-radio label="Webpack"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor
          v-model="articleInfo.content"
          class="mavon-editor"
          :tabSize="2"
          codeStyle="gruvbox-dark"
          ref="mavonEditor"
          @imgAdd="imgAdd"
          :ishljs="true">
        </mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" class="atricle-footer-button">发布</el-button>
        <el-button size="small" class="atricle-footer-button">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, SetupContext } from '@vue/composition-api'
import BLOG from '../../../types'

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {

      // @ts-ignore
    const type: ComputedRef<any> = computed(() => context.root.$route.params.id === '0' ? '新增' : '编辑')

    const articleInfo: BLOG.COMMON.ArticleListItem = {
      name: '',
      category: '',
      content: 'content....haaaaaaaaaaaaaa',
      banner: '',
      id: '',
      readNums: 0,
      isPublic: false
    }

    function imgAdd(pos: any, $file: File) {
      var formdata = new FormData()
      formdata.append('image', $file)

      // @ts-ignore
      context.root.$http({
        url: '/uploadImg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url: string) => {
        // @ts-ignore
        context.refs.mavonEditor.$img2Url(pos, url)
      })
    }

    return {
      type,
      imgAdd,
      articleInfo
    }
  }
})
</script>

<style lang="less" scoped>
.atricle-edit {
  .article-input {
    width: 400px;
  }
  .mavon-editor {
    height: 700px;
  }
  .atricle-footer-button {
    width: 80px;
  }
}
</style>