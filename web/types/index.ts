module BLOG {
  // admin 与 web 公用
  export module COMMON {

    // 文章列表
    export interface ArticleListItem {
      name: string
      _id?: string
      readNums: number
      isPublic: boolean
      category?: string
      abstract?: string
      banner?: string
    }

    // 文章详情
    export interface ArticleDetail {
      id: string            // id
      title: string         // 标题
      abstract: string      // 摘要
      banner: string        // banner图
      category: string      // 分类
      categoryLabel: string // 分类名字
      content: string       // 内容
      mavon: string         // 源代码
      readNums: number      // 阅读数
      likeNums: number      // 点赞数
      isPublic: boolean     // 是否发布
      created: string       // 创建时间
      updateTime: string    // 更新时间
      comment: any[]        // 评论
    }
  }

  // web 专用
  export module WEB {

  }

  // admin 专用
  export module ADMIN {

    // 左侧菜单
    export interface MenuItemType {
      path: string
      label: string
      icon: string
    }

    export interface Visitor {
      ip: string
      time: string
      url: string
    }

    // 访客记录
    export interface Visitors {
      _id?: string
      date: string,
      visitors: Visitor[]
    }

  }
}

export default BLOG