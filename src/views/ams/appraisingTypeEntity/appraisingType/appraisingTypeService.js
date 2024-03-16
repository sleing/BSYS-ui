import axios from 'axios';

/**
 * 学生处评优评先类别信息
 */
export class AppraisingTypeService {
  // 分页查询列表
  static findAppraisingTypes(queryParams) {
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/findAppraisingTypes',
      method: 'POST',
      data: queryParams
    });
  }

  //根据ID查询指定的学生处评优评先类别信息
  static findAppraisingType(appraisingTypeId) {
    const query = {
      appraisingTypeId
    }
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/findAppraisingType',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生处评优评先类别信息(包含外键名称)
  static findAppraisingTypeForView(appraisingTypeId) {
    const query = {
      appraisingTypeId
    }
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/findAppraisingTypeForView',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生处评优评先类别信息(包含外键名称)
  static findAppraisingTypeForEdit(appraisingTypeId) {
    const query = {
      appraisingTypeId
    }
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/findAppraisingTypeForEdit',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生处评优评先类别信息(只提取ID 和 Name)
  static findAppraisingTypesWithIdNameById(appraisingTypeId) {
    const query = {
      appraisingTypeId
    }
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/findAppraisingTypesWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //根据名称查询学生处评优评先类别信息集合(只提取ID 和 Name)
  static findAppraisingTypesWithIdNameByName(appraisingTypeName) {
    const query = {
      appraisingTypeName
    }
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/findAppraisingTypesWithIdNameByName',
      method: 'POST',
      params: query,
    });
  }

  //新增保存学生处评优评先类别信息
  static saveAppraisingType(appraisingType) {
    const query = {}
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/saveAppraisingType',
      method: 'POST',
      params: query,
      data: appraisingType
    });
  }

  //修改保存学生处评优评先类别信息
  static updateAppraisingType(appraisingType) {
    const query = {}
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/updateAppraisingType',
      method: 'POST',
      params: query,
      data: appraisingType
    });
  }

  //根据ID查询指定的学生处评优评先类别信息(只提取ID 和 Name)
  static deleteAppraisingType(appraisingTypeId) {
    const query = {
      appraisingTypeId
    }
    return axios({
      url: '/ams/appraisingTypeEntity/AppraisingType/deleteAppraisingType',
      method: 'POST',
      params: query,
    });
  }
}
