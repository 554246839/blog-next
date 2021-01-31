<template>
  <div class="upload-img">
    <div class="upload-main" title="上传banner">
      <input type="file" ref="uploader" id="upload-input" @change="uploadImgEvent">
      <label for="upload-input" class="upload-label">
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="uploaded-img" alt="">
        <i v-else class="el-icon-upload">
          上传
        </i>
      </label>
      <div v-if="dialogImageUrl" class="hover">
        <i class="el-icon-zoom-in" title="大图" @click="dialogVisible = true"></i>
        <i class="el-icon-delete" title="删除" @click="handleRemove"></i>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, SetupContext } from '@vue/composition-api'
import { deleteImg, uploadImg } from '../../pages/a/api'

interface Props {
  getUrl: Function,
  defaultImg: String
}

export default defineComponent({
  props: {
    getUrl: {
      type: Function
    },
    defaultImg: {
      type: String,
      default: ''
    }
  },
  setup(props: Props, context: SetupContext) {
    const root: any = context.root
    const refs: any = context.refs

    const dialogImageUrl: ComputedRef = computed(() => props.defaultImg)
    const dialogVisible: Ref = ref(false)

    function handlePictureCardPreview() {
      dialogVisible.value = true
    }

    function handleRemove() {
      deleteImg(root.$http, { url: dialogImageUrl }).then((res: any) => {
        refs.uploader.value = ''
        props.getUrl('')
      })
    }
    
    function uploadImgEvent(e: any) {
      const file: File = e.target.files[0]
      const formData: FormData = new FormData()
      formData.append('image', file)

      uploadImg(root.$http, formData).then((data: any) => {
        props.getUrl(data.url)
      })
    }

    return {
      dialogImageUrl,
      dialogVisible,
      handlePictureCardPreview,
      handleRemove,
      uploadImgEvent
    }
  }
})
</script>

<style lang="less" scoped>
.upload-img {
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  .upload-main {
    &:hover .hover {
      visibility: visible;
    }
  }
  #upload-input {
    display: none;
  }
  .upload-label {
    cursor: pointer;
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
    &:hover {
      color: #666;
    }
  }
  .hover {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    color: #fff;
    font-size: 20px;
    background: 0, 0, 0, rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    i {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>