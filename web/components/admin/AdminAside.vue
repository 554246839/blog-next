<template>
  <el-menu
    :default-active="activeIndex"
    class="admin-aside-menu"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    active-text-color="#ffd04b"
    :collapse="isCollapse">

    <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">
      <i :class="item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <div class="admin-toggle-show" @click="toggleAside">.<br>.<br>.</div>

  </el-menu>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, SetupContext } from '@vue/composition-api'
import BLOG from '../../types/index'

const menuList: BLOG.ADMIN.MenuItemType[] = [
  {
    path: '/a/articleList',
    label: '文章列表',
    icon: 'el-icon-menu'
  }, {
    path: '/a/article/0',
    label: '新增文章',
    icon: 'el-icon-edit'
  }, {
    path: '/a/category',
    label: '分类管理',
    icon: 'el-icon-bangzhu'
  }, {
    path: '/a/visitor',
    label: '查看访客',
    icon: 'el-icon-s-custom'
  }
]

export default defineComponent({
  setup(props: PropType<any>, context: SetupContext) {
    const isCollapse: Ref = ref(false)

    const activeIndex: ComputedRef<any> = computed(() => {
    // @ts-ignore
      let index: string = context.root.$route.path
      let label: string = ''

      if (index.startsWith('/a/article') && index !== '/a/article/0' && index !== '/a/articleList') {
        index = '/a/articleList'
        label = '文章编辑'
      } else {
        label = menuList.filter(item => item.path === index)[0].label
      }
      
      context.emit('input', label)

      return index
    })

    function handleSelect(index: string, indexPath: string) {
      const menuItem: BLOG.ADMIN.MenuItemType[] = menuList.filter(item => item.path === index)
      context.emit('handleSelect', menuItem[0].label)
    }

    function toggleAside() {
      isCollapse.value = !isCollapse.value
      context.emit('toggleAside', !isCollapse.value ? '250px' : '63px')
    }

    return {
      activeIndex,
      isCollapse,
      handleSelect,
      toggleAside,
      menuList
    }
  }
})
</script>

<style lang="less" scoped>
.admin-aside-menu {
  height: 100%;
  .admin-toggle-show {
    position: absolute;
    color: #fff;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    width: 10px;
    text-align: center;
    background: grey;
    font-size: 20px;
    line-height: 5px;
    white-space: wrap;
    opacity: .2;
    &:hover {
      opacity: .8;
    }
  }
}
</style>