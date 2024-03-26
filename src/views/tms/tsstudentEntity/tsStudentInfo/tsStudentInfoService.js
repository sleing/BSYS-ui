import axios from 'axios';

/**
 * 团学会学生信息管理
 */
export class TsStudentInfoService {
  // 分页查询列表
  static findTsStudentInfos(queryParams) {
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/findTsStudentInfos',
      method: 'POST',
      data: queryParams
    });
  }

  //根据ID查询指定的团学会学生信息管理
  static findTsStudentInfo(tsStudentInfoId) {
    const query = {
      tsStudentInfoId
    }
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/findTsStudentInfo',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的团学会学生信息管理(包含外键名称)
  static findTsStudentInfoForView(tsStudentInfoId) {
    const query = {
      tsStudentInfoId
    }
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/findTsStudentInfoForView',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的团学会学生信息管理(包含外键名称)
  static findTsStudentInfoForEdit(tsStudentInfoId) {
    const query = {
      tsStudentInfoId
    }
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/findTsStudentInfoForEdit',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的团学会学生信息管理(只提取ID 和 Name)
  static findTsStudentInfosWithIdNameById(tsStudentInfoId) {
    const query = {
      tsStudentInfoId
    }
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/findTsStudentInfosWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //根据名称查询团学会学生信息管理集合(只提取ID 和 Name)
  static findTsStudentInfosWithIdNameByName(tsStudentInfoName) {
    const query = {
      tsStudentInfoName
    }
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/findTsStudentInfosWithIdNameByName',
      method: 'POST',
      params: query,
    });
  }

  //新增保存团学会学生信息管理
  static saveTsStudentInfo(tsStudentInfo) {
    const query = {}
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/saveTsStudentInfo',
      method: 'POST',
      params: query,
      data: tsStudentInfo
    });
  }

  //修改保存团学会学生信息管理
  static updateTsStudentInfo(tsStudentInfo) {
    const query = {}
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/updateTsStudentInfo',
      method: 'POST',
      params: query,
      data: tsStudentInfo
    });
  }

  //根据ID查询指定的团学会学生信息管理(只提取ID 和 Name)
  static deleteTsStudentInfo(tsStudentInfoId) {
    const query = {
      tsStudentInfoId
    }
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/deleteTsStudentInfo',
      method: 'POST',
      params: query,
    });
  }

  static mutiImport(students) {
    return axios({
      url: '/tms/tsstudentEntity/TsStudentInfo/mutiImport',
      method: 'POST',
      data: {
        'students': JSON.stringify(students)
      },
    });
  }
}
