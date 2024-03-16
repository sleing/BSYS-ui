import axios from 'axios';

/**
 * 学生处评优评先关联
 */
export class AppraisedService {
  // 分页查询列表
  static findAppraiseds(queryParams) {
    return axios({
      url: '/ams/appraisedEntity/Appraised/findAppraiseds',
      method: 'POST',
      data: queryParams
    });
  }

  //根据ID查询指定的学生处评优评先关联
  static findAppraised(appraisedId) {
    const query = {
      appraisedId
    }
    return axios({
      url: '/ams/appraisedEntity/Appraised/findAppraised',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生处评优评先关联(包含外键名称)
  static findAppraisedForView(appraisedId) {
    const query = {
      appraisedId
    }
    return axios({
      url: '/ams/appraisedEntity/Appraised/findAppraisedForView',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生处评优评先关联(包含外键名称)
  static findAppraisedForEdit(appraisedId) {
    const query = {
      appraisedId
    }
    return axios({
      url: '/ams/appraisedEntity/Appraised/findAppraisedForEdit',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生处评优评先关联(只提取ID 和 Name)
  static findAppraisedsWithIdNameById(appraisedId) {
    const query = {
      appraisedId
    }
    return axios({
      url: '/ams/appraisedEntity/Appraised/findAppraisedsWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //根据名称查询学生处评优评先关联集合(只提取ID 和 Name)
  static findAppraisedsWithIdNameByName(appraisedName) {
    const query = {
      appraisedName
    }
    return axios({
      url: '/ams/appraisedEntity/Appraised/findAppraisedsWithIdNameByName',
      method: 'POST',
      params: query,
    });
  }

  //新增保存学生处评优评先关联
  static saveAppraised(appraised) {
    const query = {}
    return axios({
      url: '/ams/appraisedEntity/Appraised/saveAppraised',
      method: 'POST',
      params: query,
      data: appraised
    });
  }

  //修改保存学生处评优评先关联
  static updateAppraised(appraised) {
    const query = {}
    return axios({
      url: '/ams/appraisedEntity/Appraised/updateAppraised',
      method: 'POST',
      params: query,
      data: appraised
    });
  }

  //根据ID查询指定的学生处评优评先关联(只提取ID 和 Name)
  static deleteAppraised(appraisedId) {
    const query = {
      appraisedId
    }
    return axios({
      url: '/ams/appraisedEntity/Appraised/deleteAppraised',
      method: 'POST',
      params: query,
    });
  }
}
