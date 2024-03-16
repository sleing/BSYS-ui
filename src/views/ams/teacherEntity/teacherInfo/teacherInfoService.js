
import axios from 'axios';
//import setting from "@/config/setting";

/**
 * 教师信息
 */
export class TeacherInfoService {
    // 分页查询列表
    static findTeacherInfos (queryParams) {
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/findTeacherInfos',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的教师信息
    static findTeacherInfo (teacherInfoId) {
        const query = {
            teacherInfoId
        }
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/findTeacherInfo',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的教师信息(包含外键名称)
    static findTeacherInfoForView (teacherInfoId) {
        const query = {
            teacherInfoId
        }
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/findTeacherInfoForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的教师信息(包含外键名称)
    static findTeacherInfoForEdit (teacherInfoId) {
        const query = {
            teacherInfoId
        }
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/findTeacherInfoForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的教师信息(只提取ID 和 Name)
    static findTeacherInfosWithIdNameById (teacherInfoId) {
        const query = {
            teacherInfoId
        }
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/findTeacherInfosWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询教师信息集合(只提取ID 和 Name)
    static findTeacherInfosWithIdNameByName (teacherInfoName) {
        const query = {
            teacherInfoName
        }
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/findTeacherInfosWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存教师信息
    static saveTeacherInfo (teacherInfo) {
        const query = {}
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/saveTeacherInfo',
            method: 'POST',
            params: query,
            data: teacherInfo
        });
    }

    //修改保存教师信息
    static updateTeacherInfo (teacherInfo) {
        const query = {}
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/updateTeacherInfo',
            method: 'POST',
            params: query,
            data: teacherInfo
        });
    }

    //根据ID查询指定的教师信息(只提取ID 和 Name)
    static deleteTeacherInfo (teacherInfoId) {
        const query = {
            teacherInfoId
        }
        return axios({
            url: '/ams/teacherEntity/TeacherInfo/deleteTeacherInfo',
            method: 'POST',
            params: query,
        });
    }

    static uploadUrl(teacherInfos){
      const query = {
        teacherInfos
      }
      return axios({
        url: '/ams/teacherEntity/TeacherInfo/deleteTeacherInfo',
        method: 'POST',
        params: query,
      });
    }

  static uploadTeacherInfos(file){
    const query = {
      file
    }
    return axios({
      url: '/ams/teacherEntity/TeacherInfo/uploadTeacherInfos',
      method: 'POST',
      params: query,
    });
  }

  //获取老师EID
  static getTeacherEid (teacherId) {
    const query = {
      teacherId
    }
    return axios({
      url: '/ams/teacherEntity/TeacherInfo/getTeacherEid',
      method: 'POST',
      params: query,
    });
  }
}
