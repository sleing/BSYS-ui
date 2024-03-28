import axios from 'axios';

/**
 * 通知管理
 */
export class TsNoticeService {
  // 分页查询列表
  static findTsNotices(queryParams) {
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNotices',
      method: 'POST',
      data: queryParams
    });
  }

  //查询未审核通知
  static findTsNoticesWithoutAudition(queryParams) {
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNoticesWithoutAudition',
      method: 'POST',
      data: queryParams
    });
  }

  //根据ID查询指定的通知管理
  static findTsNotice(tsNoticeId) {
    const query = {
      tsNoticeId
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNotice',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的通知管理(包含外键名称)
  static findTsNoticeForView(tsNoticeId) {
    const query = {
      tsNoticeId
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNoticeForView',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的通知管理(包含外键名称)
  static findTsNoticeForEdit(tsNoticeId) {
    const query = {
      tsNoticeId
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNoticeForEdit',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的通知管理(只提取ID 和 Name)
  static findTsNoticesWithIdNameById(tsNoticeId) {
    const query = {
      tsNoticeId
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNoticesWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //根据名称查询通知管理集合(只提取ID 和 Name)
  static findTsNoticesWithIdNameByName(tsNoticeName) {
    const query = {
      tsNoticeName
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/findTsNoticesWithIdNameByName',
      method: 'POST',
      params: query,
    });
  }

  //新增保存通知管理
  static saveTsNotice(tsNotice) {
    const query = {}
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/saveTsNotice',
      method: 'POST',
      params: query,
      data: tsNotice
    });
  }

  //修改保存通知管理
  static updateTsNotice(tsNotice) {
    const query = {}
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/updateTsNotice',
      method: 'POST',
      params: query,
      data: tsNotice
    });
  }

  //根据ID查询指定的通知管理(只提取ID 和 Name)
  static deleteTsNotice(tsNoticeId) {
    const query = {
      tsNoticeId
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/deleteTsNotice',
      method: 'POST',
      params: query,
    });
  }

  //邮箱通知
  static sendEmail(subject,body) {
    const query = {
      subject,body
    }
    return axios({
      url: '/tms/tsnoticeEntity/TsNotice/sendEmail',
      method: 'POST',
      params: query,
    });
  }
}
