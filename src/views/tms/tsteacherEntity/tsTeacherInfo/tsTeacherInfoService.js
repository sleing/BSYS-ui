
import axios from 'axios';

/**
 * 老师信息管理
 */
export class TsTeacherInfoService {
    // 分页查询列表
    static findTsTeacherInfos (queryParams) {
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/findTsTeacherInfos',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的老师信息管理
    static findTsTeacherInfo (tsTeacherInfoId) {
        const query = {
            tsTeacherInfoId
        }
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/findTsTeacherInfo',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的老师信息管理(包含外键名称)
    static findTsTeacherInfoForView (tsTeacherInfoId) {
        const query = {
            tsTeacherInfoId
        }
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/findTsTeacherInfoForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的老师信息管理(包含外键名称)
    static findTsTeacherInfoForEdit (tsTeacherInfoId) {
        const query = {
            tsTeacherInfoId
        }
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/findTsTeacherInfoForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的老师信息管理(只提取ID 和 Name)
    static findTsTeacherInfosWithIdNameById (tsTeacherInfoId) {
        const query = {
            tsTeacherInfoId
        }
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/findTsTeacherInfosWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询老师信息管理集合(只提取ID 和 Name)
    static findTsTeacherInfosWithIdNameByName (tsTeacherInfoName) {
        const query = {
            tsTeacherInfoName
        }
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/findTsTeacherInfosWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存老师信息管理
    static saveTsTeacherInfo (tsTeacherInfo) {
        const query = {}
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/saveTsTeacherInfo',
            method: 'POST',
            params: query,
            data: tsTeacherInfo
        });
    }

    //修改保存老师信息管理
    static updateTsTeacherInfo (tsTeacherInfo) {
        const query = {}
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/updateTsTeacherInfo',
            method: 'POST',
            params: query,
            data: tsTeacherInfo
        });
    }

    //根据ID查询指定的老师信息管理(只提取ID 和 Name)
    static deleteTsTeacherInfo (tsTeacherInfoId) {
        const query = {
            tsTeacherInfoId
        }
        return axios({
            url: '/tms/tsteacherEntity/TsTeacherInfo/deleteTsTeacherInfo',
            method: 'POST',
            params: query,
        });
    }
}
