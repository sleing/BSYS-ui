/** 常用工具方法 license by http://eleadmin.com */
import {useStore} from "vuex";

export default {

  /**
   * 取字典
   * @param dict 字典类型
   */
  getDict(dictType, lis) {
    //实验室模块字典去掉”lis_“前缀后返回，其他不变
    if (lis) {
      const store = useStore();
      let dict;
      if (dictType.indexOf('.') > -1) {
        dict = store.state.user.user.dicts ? store.state.user.user.dicts[dictType.split(".")[0]] : [];
        if (!dict) return [];
        if (!dict.children) return [];
        return this.getDictChildren(dict, dictType.split("."), 1)
      } else {
        dict = store.state.user.user.dicts ? store.state.user.user.dicts[dictType] : [];
        if (!dict) return [];
        if (!dict.children) return [];
        dict.children.forEach((item) => {
          if (item.dictName.indexOf('lis_') !== -1) {
            item.dictName = item.dictName.substring(4)
          }
          item.children.forEach((item) => {
            if (item.dictName.indexOf('lis_') !== -1) {
              item.dictName = item.dictName.substring(4)
            }
          })
        })
        return dict.children;
      }
    } else {
      const store = useStore();
      let dict;
      if (dictType.indexOf('.') > -1) {
        dict = store.state.user.user.dicts ? store.state.user.user.dicts[dictType.split(".")[0]] : [];
        if (!dict) return [];
        if (!dict.children) return [];
        return this.getDictChildren(dict, dictType.split("."), 1)
      } else {
        dict = store.state.user.user.dicts ? store.state.user.user.dicts[dictType] : [];
        if (!dict) return [];
        if (!dict.children) return [];
        return dict.children;
      }
    }
  },
  /**
   * 返回字典的下一级
   */
  getDictChildren(dict, arr, current) {
    for (let i = 0; i < dict.children.length; i++) {
      if (dict && dict.children && dict.children[i].dictName === arr[current]) {
        return dict.children[i].children;
      }
    }
  },

  /**
   * 取系统参数
   * @param name
   */
  getConfig(configName) {
    const store = useStore();
    let config = store.state.user.user.configs[configName];
    if (!config) return {};
    return config;
  }

}
