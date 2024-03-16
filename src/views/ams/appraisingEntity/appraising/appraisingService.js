import axios from 'axios';

/**
 * 评优评先登记
 */
export class AppraisingService {
  // 分页查询列表
  static findAppraisings(queryParams) {
    return axios({
      url: '/ams/appraisingEntity/Appraising/findAppraisings',
      method: 'POST',
      data: queryParams
    });
  }

  //根据ID查询指定的评优评先登记
  static findAppraising(appraisingId) {
    const query = {
      appraisingId
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/findAppraising',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的评优评先登记(包含外键名称)
  static findAppraisingForView(appraisingId) {
    const query = {
      appraisingId
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/findAppraisingForView',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的评优评先登记(包含外键名称)
  static findAppraisingForEdit(appraisingId) {
    const query = {
      appraisingId
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/findAppraisingForEdit',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的评优评先登记(只提取ID 和 Name)
  static findAppraisingsWithIdNameById(appraisingId) {
    const query = {
      appraisingId
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/findAppraisingsWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //根据名称查询评优评先登记集合(只提取ID 和 Name)
  static findAppraisingsWithIdNameByName(appraisingName) {
    const query = {
      appraisingName
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/findAppraisingsWithIdNameByName',
      method: 'POST',
      params: query,
    });
  }

  //新增保存评优评先登记
  static saveAppraising(appraising) {
    const query = {}
    return axios({
      url: '/ams/appraisingEntity/Appraising/saveAppraising',
      method: 'POST',
      params: query,
      data: appraising
    });
  }

  //修改保存评优评先登记
  static updateAppraising(appraising) {
    const query = {}
    return axios({
      url: '/ams/appraisingEntity/Appraising/updateAppraising',
      method: 'POST',
      params: query,
      data: appraising
    });
  }

  //根据ID查询指定的评优评先登记(只提取ID 和 Name)
  static deleteAppraising(appraisingId) {
    const query = {
      appraisingId
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/deleteAppraising',
      method: 'POST',
      params: query,
    });
  }

  static MyfindAppraisings(queryParams) {
    return axios({
      url: '/ams/appraisingEntity/Appraising/myfindAppraisings',
      method: 'POST',
      data: queryParams
    });
  }

  static auditForCon(Id,remarkContent) {
    const query = {
      Id,remarkContent
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/auditForCon',
      method: 'POST',
      params: query
    });
  }


  static myUpdate(Id) {
    const query = {
      Id
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/myUpdate',
      method: 'POST',
      params: query
    });
  }

  static updateReviewer(userId,rowId) {
    const query = {
      userId,
      rowId
    }
    return axios({
      url: '/ams/appraisingEntity/Appraising/updateReviewer',
      method: 'POST',
      params: query
    });
  }
}
