/**
 * 简体中文
 */
export default {
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: {_name: '工作台'},
      analysis: {_name: '分析页'},
      monitor: {_name: '监控页'}
    },
    system: {
      _name: '系统管理',
      user: {_name: '用户管理'},
      role: {_name: '角色管理'},
      menu: {_name: '菜单管理'},
      dictionary: {_name: '字典管理'},
      organization: {_name: '机构管理'},
      loginRecord: {_name: '登录日志'},
      operRecord: {_name: '操作日志'}
    },
    form: {
      _name: '表单页面',
      basic: {_name: '基础表单'},
      advanced: {_name: '复杂表单'},
      step: {_name: '分步表单'}
    },
    list: {
      _name: '列表页面',
      basic: {_name: '基础列表'},
      advanced: {_name: '复杂列表'},
      card: {
        _name: '卡片列表',
        project: {_name: '项目列表'},
        application: {_name: '应用列表'},
        article: {_name: '文章列表'}
      }
    },
    result: {
      _name: '结果页面',
      success: {_name: '成功页'},
      fail: {_name: '失败页'}
    },
    exception: {
      _name: '异常页面',
      '403': {_name: '403'},
      '404': {_name: '404'},
      '500': {_name: '500'}
    },
    user: {
      _name: '个人中心',
      info: {_name: '个人资料'},
      profile: {_name: '个人资料'},
      message: {_name: '我的消息'}
    },
    extension: {
      _name: '扩展组件',
      icon: {_name: '字体图标'},
      file: {_name: '文件列表'},
      printer: {_name: '打印插件'},
      excel: {_name: 'excel插件'},
      dragsort: {_name: '拖拽排序'},
      map: {_name: '地图组件'},
      player: {_name: '视频播放'},
      editor: {_name: '富文本框'},
      more: {_name: '更多组件'}
    },
    example: {
      _name: '经典实例',
      document: {_name: '案卷调整'},
      choose: {_name: '批量选择'},
      eleadmin: {_name: '内嵌页面'}
    },
    'https://maoqiao/goods/9': {_name: '获取授权'}
  },
  layout: {
    home: '主页',
    header: {
      profile: '个人中心',
      password: '修改密码',
      logout: '退出登录'
    },
    footer: {
      website: '官网',
      document: '文档',
      authorization: '授权',
      copyright: 'Copyright © CQNU 计算机与信息科学学院-ICDIO实验室-DDD-Nu项目组'
    },
    logout: {
      title: '提示',
      message: '确定要退出登录吗?'
    }
  }
}
