
import axios from 'axios';

/**
 * 闲时表
 */
export class freeTimeService {
  // 分页查询列表
  static findTsFreeTimes (queryParams) {
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findTsFreeTimes',
      method: 'POST',
      data: queryParams
    });
  }

  //根据ID查询指定的闲时表
  static findTsFreeTime (tsFreeTimeId) {
    const query = {
      tsFreeTimeId
    }
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findTsFreeTime',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的闲时表(包含外键名称)
  static findTsFreeTimeForView (tsFreeTimeId) {
    const query = {
      tsFreeTimeId
    }
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findTsFreeTimeForView',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的闲时表(包含外键名称)
  static findTsFreeTimeForEdit (tsFreeTimeId) {
    const query = {
      tsFreeTimeId
    }
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findTsFreeTimeForEdit',
      method: 'POST',
      params: query,
    });
  }

  //根据ID查询指定的闲时表(只提取ID 和 Name)
  static findTsFreeTimesWithIdNameById (tsFreeTimeId) {
    const query = {
      tsFreeTimeId
    }
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findTsFreeTimesWithIdNameById',
      method: 'POST',
      params: query,
    });
  }

  //根据名称查询闲时表集合(只提取ID 和 Name)
  static findTsFreeTimesWithIdNameByName (tsFreeTimeName) {
    const query = {
      tsFreeTimeName
    }
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findTsFreeTimesWithIdNameByName',
      method: 'POST',
      params: query,
    });
  }

  //新增保存闲时表
  static saveTsFreeTime (tsFreeTime) {
    const query = {}
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/saveTsFreeTime',
      method: 'POST',
      params: query,
      data: tsFreeTime
    });
  }

  //修改保存闲时表
  static updateTsFreeTime (tsFreeTime) {
    const query = {}
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/updateTsFreeTime',
      method: 'POST',
      params: query,
      data: tsFreeTime
    });
  }

  //根据ID查询指定的闲时表(只提取ID 和 Name)
  static deleteTsFreeTime (tsFreeTimeId) {
    const query = {
      tsFreeTimeId
    }
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/deleteTsFreeTime',
      method: 'POST',
      params: query,
    });
  }

  //查询所有闲时记录
  static findAllFreeTimes () {
    const query ={}
    return axios({
      url: '/tms/tsfreeTimeEntity/TsFreeTime/findAllFreeTimes',
      method: 'POST',
      params: query,
    });
  }
}
