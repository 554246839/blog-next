module BLOG {
  // admin 与 web 公用
  export module COMMON {

    // 文章信息
    export interface ArticleListItem {
      name: string
      id: string
      readNums: number
      isPublic: boolean,
      category?: string
      content?: string
      abstract?: string
      banner?: string
    }

    // 文章详情
    export interface ArticleDetail {
      
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

    // 访客记录
    export interface Visitor {
      date: string,
      visitors: number,
      data: any[],
      id: string
    }

  }
}

export default BLOG