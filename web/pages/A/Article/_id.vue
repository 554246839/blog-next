<template>
  <div class="atricle-edit">
    <el-form label-position="left" label-width="80px" :model="articleInfo">
      <el-form-item label="标题">
        <el-input v-model="articleInfo.title" size="small" class="article-input"></el-input>
      </el-form-item>
      <el-form-item label="banner">
        <upload :getUrl="getUrl" :default-img="articleInfo.banner" />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="articleInfo.abstract" type="textarea" class="article-abstract" :rows="3" />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-radio-group v-model="articleInfo.category">
          <el-radio
            v-for="item in categoryList"
            :key="item.value"
            :label="item.value"
          >
            {{item.name}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor
          v-model="articleInfo.mavon"
          class="mavon-editor"
          :tabSize="2"
          codeStyle="gruvbox-dark"
          ref="mavonEditor"
          @imgAdd="imgAdd"
          @change="saveContent"
          :ishljs="true">
        </mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" class="atricle-footer-button" @click="publicArticle(true)">发布</el-button>
        <el-button size="small" class="atricle-footer-button" @click="publicArticle(false)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, SetupContext } from '@vue/composition-api'
import { getArticleDetail, uploadImg, getCategoryList, putArticle } from '../api'
import { dateFormat } from '../../../utils'

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {
    const root: any = context.root
    const refs: any = context.refs
    const id: string = root.$route.params.id
    const categoryList: Ref = ref([])

    const articleInfo: Ref = ref({})

    const type: ComputedRef<any> = computed(() => {
      return root.$route.params.id === '0' ? '新增' : '编辑'
    })
    
    function requestData() {
      // 获取数据
      if (id === '0') {
        articleInfo.value = {
          _id: id,
          title: '',
          category: '',
          categoryLabel: '',
          abstract: '',
          content: '',
          mavon: '',
          banner: '',
          readNums: 0,
          likeNums: 0,
          isPublic: false,
          created: '',
          updateTime: '',
          comment: []
        }
      } else {
        getArticleDetail(root.$http, id).then((data: any) => {
          articleInfo.value = data
        })
      }
    }
    async function requestCategory() {
      const res = await getCategoryList(root.$http)
      categoryList.value = res
    }
    requestData()
    requestCategory()

    function imgAdd(pos: any, $file: File) {
      const formdata: FormData = new FormData()
      formdata.append('image', $file)

      uploadImg(root.$http, formdata).then((data: any) => {
        refs.mavonEditor.$img2Url(pos, data.url)
      })
    }

    function getUrl(url: string) {
      articleInfo.value.banner = url
    }

    function saveContent(value: string, render: string) {
      articleInfo.value.content = render
    }

    function publicArticle(isPublic: boolean) {

      const date: string = dateFormat('YYYY-MM-DD hh:mm:ss', new Date())
      if (id === '0') {
        articleInfo.value.created = date
      }
      articleInfo.value.updateTime = date

      putArticle(root.$http, { ...articleInfo.value, isPublic }).then((res: any) => {
        if (isPublic) {
          root.$message.success('发布成功')
          root.$router.push('/a/articleList')
          return
        }
        root.$message.success('已保存为草稿')
        root.$router.push('/a/articleList')
      })
    }

    return {
      type,
      imgAdd,
      articleInfo,
      publicArticle,
      saveContent,
      getUrl,
      categoryList
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
  .article-abstract {
    width: 600px;
  }
}
</style>