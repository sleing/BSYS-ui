
import axios from 'axios';

/**
 * 学生信息
 */
export class StudentInfoService {
    // 分页查询列表
    static findStudentInfos (queryParams) {
        return axios({
            url: '/ams/studentEntity/StudentInfo/findStudentInfos',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的学生信息
    static findStudentInfo (studentInfoId) {
        const query = {
            studentInfoId
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/findStudentInfo',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的学生信息(包含外键名称)
    static findStudentInfoForView (studentInfoId) {
        const query = {
            studentInfoId
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/findStudentInfoForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的学生信息(包含外键名称)
    static findStudentInfoForEdit (studentInfoId) {
        const query = {
            studentInfoId
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/findStudentInfoForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的学生信息(只提取ID 和 Name)
    static findStudentInfosWithIdNameById (studentInfoId) {
        const query = {
            studentInfoId
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/findStudentInfosWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询学生信息集合(只提取ID 和 Name)
    static findStudentInfosWithIdNameByName (studentInfoName) {
        const query = {
            studentInfoName
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/findStudentInfosWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存学生信息
    static saveStudentInfo (studentInfo) {
        const query = {
          studentInfo
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/saveStudentInfo',
            method: 'POST',
            params: query,
            data: studentInfo
        });
    }

    //修改保存学生信息
    static updateStudentInfo (studentInfo) {
        const query = {}
        return axios({
            url: '/ams/studentEntity/StudentInfo/updateStudentInfo',
            method: 'POST',
            params: query,
            data: studentInfo
        });
    }

    //根据ID查询指定的学生信息(只提取ID 和 Name)
    static deleteStudentInfo (studentInfoId) {
        const query = {
            studentInfoId
        }
        return axios({
            url: '/ams/studentEntity/StudentInfo/deleteStudentInfo',
            method: 'POST',
            params: query,
        });
    }

  //学生注册时候发送验证码
  static sendCheckCode (email) {
    const query = {
      email
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/sendCheckCode',
      method: 'POST',
      params: query,
    });
  }

  //学生匹配验证码
  static checkCode (code,email) {
    const query = {
      code,
      email
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/checkCode',
      method: 'POST',
      params: query,
    });
  }

  //（通过获取学生学号返回eid）
  static getStudentEid (studentId) {
    const query = {
      studentId
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/getStudentEid',
      method: 'POST',
      params: query,
    });
  }

  // (通过获取学生邮箱返回eid)
  static getStudentEidByEmail (email) {
    const query = {
      email
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/getStudentEidByEmail',
      method: 'POST',
      params: query,
    });
  }

  //(修改学生信息)
  static updateStudentInfoMy (studentId,name,major,collegeId,grade,classGrade,contactTel,email,remark) {
    const query = {
      studentId,
      name,
      major,
      collegeId,
      grade,
      classGrade,
      contactTel,
      email,
      remark
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/updateStudentInfoMy',
      method: 'POST',
      params: query,
    });
  }


  //(修改学生信息)
  static saveStudentInfoMy (studentId,name,major,collegeId,grade,classGrade,contactTel,email,remark) {
    const query = {
      studentId,
      name,
      major,
      collegeId,
      grade,
      classGrade,
      contactTel,
      email,
      remark
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/saveStudentInfoMy',
      method: 'POST',
      params: query,
    });
  }


}
