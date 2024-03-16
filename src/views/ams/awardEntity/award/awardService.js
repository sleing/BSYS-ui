
import axios from 'axios';

/**
 * 获奖登记
 */
export class AwardService {
    // 分页查询列表
    static findAwards (queryParams) {
        return axios({
            url: '/ams/awardEntity/Award/findAwards',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的获奖登记
    static findAward (awardId) {
        const query = {
            awardId
        }
        return axios({
            url: '/ams/awardEntity/Award/findAward',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖登记(包含外键名称)
    static findAwardForView (awardId) {
        const query = {
            awardId
        }
        return axios({
            url: '/ams/awardEntity/Award/findAwardForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖登记(包含外键名称)
    static findAwardForEdit (awardId) {
        const query = {
            awardId
        }
        return axios({
            url: '/ams/awardEntity/Award/findAwardForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖登记(只提取ID 和 Name)
    static findAwardsWithIdNameById (awardId) {
        const query = {
            awardId
        }
        return axios({
            url: '/ams/awardEntity/Award/findAwardsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询获奖登记集合(只提取ID 和 Name)
    static findAwardsWithIdNameByName (awardName) {
        const query = {
            awardName
        }
        return axios({
            url: '/ams/awardEntity/Award/findAwardsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存获奖登记
    static saveAward (award) {
        const query = {}
        return axios({
            url: '/ams/awardEntity/Award/saveAward',
            method: 'POST',
            params: query,
            data: award
        });
    }

    //修改保存获奖登记
    static updateAward (award) {
        const query = {}
        return axios({
            url: '/ams/awardEntity/Award/updateAward',
            method: 'POST',
            params: query,
            data: award
        });
    }

    //根据ID查询指定的获奖登记(只提取ID 和 Name)
    static deleteAward (awardId) {
        const query = {
            awardId
        }
        return axios({
            url: '/ams/awardEntity/Award/deleteAward',
            method: 'POST',
            params: query,
        });
    }

  //根据ID查询指定的学生信息
  static findStudentInfoNumById(studentInfoId) {
    const query = {
      studentInfoId
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/findStudentInfoNumById',
      method: 'POST',
      params: query,
    });
  }

  //根据学生学号查询指定的学生信息
  static findStudentInfoById(studentInfoId) {
    const query = {
      studentInfoId
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/findStudentInfoNumById',
      method: 'POST',
      params: query,
    });
  }

  //根据教师工号查询指定的教师信息
  static findTeacherInfoById(teacherInfoId) {
    const query = {
      teacherInfoId
    }
    return axios({
      url: '/ams/teacherEntity/TeacherInfo/findTeacherInfosById',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的学生信息
  static findStudentInfo (studentInfoId) {
    debugger
    const query = {
      studentInfoId
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/findStudentInfo',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的竞赛信息
  static findCompetitionInfoByName (competitionId) {
    const query = {
      competitionId
    }
    return axios({
      url: '/ams/competitionEntity/Competition/findCompetition',
      method: 'POST',
      params: query,
    });
  }

  //查主办方
  static findCompetitionInfo (unitId) {
      debugger
    const query = {
      unitId
    }
    return axios({
      url: '/ams/unitEntity/Unit/findUnitsWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //通过教师表eid查询教师信息
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

  //保存学生
  static saveStudentInfo (studentInfo) {
    const query = {}
    return axios({
      url: '/ams/studentEntity/StudentInfo/saveStudentInfo',
      method: 'POST',
      params: query,
      data: studentInfo
    });
  }

  //新增学生 教师 竞赛 信息
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
//新增保存竞赛信息
  static saveCompetition (competition) {
    const query = {}
    return axios({
      url: '/ams/competitionEntity/Competition/saveCompetition',
      method: 'POST',
      params: query,
      data: competition
    });
  }
//新增保存主办方信息
  static saveUnit (unit) {
    const query = {}
    return axios({
      url: '/ams/unitEntity/Unit/saveUnit',
      method: 'POST',
      params: query,
      data: unit
    });
  }

  //根据ID查询指定的学院信息(包含外键名称)
  static findCollegeForView (collegeId) {
    const query = {
      collegeId
    }
    return axios({
      url: '/ams/collegeEntity/College/findCollegeForView',
      method: 'POST',
      params: query,
    });
  }

  //根据AwardID查询获奖学生信息(只提取studentId)
  static findAwardeeByAwardId (awardId) {
    const query = {
      awardId
    }
    return axios({
      url: '/ams/awardeeEntity/Awardee/findAwardeeByAwardId',
      method: 'POST',
      params: query,
    });
  }

  //根据AwardID查询指导教师信息(只提取studentId)
  static findInstructorByAwardId (awardId) {
    const query = {
      awardId
    }
    return axios({
      url: '/ams/instructorEntity/Instructor/findInstructorByAwardId',
      method: 'POST',
      params: query,
    });
  }

  //zhang
  static MyfindAwards(queryParams) {
    return axios({
      url: '/ams/awardEntity/Award/MyfindAwards',
      method: 'POST',
      data: queryParams
    });
  }

  static myUpdate(awardId) {
    const query = {
      awardId
    }
    return axios({
      url: '/ams/awardEntity/Award/myUpdate',
      method: 'POST',
      params: query
    });
  }

  static auditForCon(awardId,remarkContent) {
    const query = {
      awardId,remarkContent
    }
    return axios({
      url: '/ams/awardEntity/Award/auditForCon',
      method: 'POST',
      params: query
    });
  }

  static fileUpload(file){
    const query = {
      file
    }
    return axios({
      url: '/ams/studentEntity/StudentInfo/fileUpload',
      method: 'POST',
      params: query
    });
  }

  static fileUrl(eid) {
    const query = {
      eid
    }
    return axios({
      url: '/ams/awardEntity/Award/fileUrl',
      method: 'POST',
      params: query,
    });
  }

  static updateReviewer(userId,rowId) {
    const query = {
      userId,
      rowId
    }
    return axios({
      url: '/ams/awardEntity/Award/updateReviewer',
      method: 'POST',
      params: query
    });
  }

  //下载附件
  static down(attachmentId){
    return axios({
      method: 'get',
      url: "/erp/system/Attachment/download",
      params: {
        isOnline: false,
        attachmentId:attachmentId,
      },
      responseType: 'blob',
    })
  }

  //举办单位唯一
  static getUnitName (name) {
    const query = {
      name
    }
    return axios({
      url: '/ams/unitEntity/Unit/getUnitName',
      method: 'POST',
      params: query,
    });
  }

  //ocr 印章识别
  static seal(addr){
      const query = {
        addr
      }
      return axios({
        method: 'post',
        url: "/ocr/sealHandle",
        params:query
      })
  }

}
