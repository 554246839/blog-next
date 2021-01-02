<template>
  <div>
    <el-upload
      action="#"
      :limit="1"
      list-type="picture-card"
      :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {

    const dialogImageUrl: Ref = ref('')
    const dialogVisible: Ref = ref(false)
    const disabled: Ref = ref(false)

    function handlePictureCardPreview() {}
    function handleRemove() {}
    function handleDownload() {}

    return {
      dialogImageUrl,
      dialogVisible,
      disabled,
      handlePictureCardPreview,
      handleRemove,
      handleDownload
    }
  }
})
</script>