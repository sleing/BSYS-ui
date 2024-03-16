
import axios from 'axios';

/**
 * 活动中心
 */
export class TsActivityService {
    // 分页查询列表
    static findTsActivitys (queryParams) {
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/findTsActivitys',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的活动中心
    static findTsActivity (tsActivityId) {
        const query = {
            tsActivityId
        }
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/findTsActivity',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的活动中心(包含外键名称)
    static findTsActivityForView (tsActivityId) {
        const query = {
            tsActivityId
        }
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/findTsActivityForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的活动中心(包含外键名称)
    static findTsActivityForEdit (tsActivityId) {
        const query = {
            tsActivityId
        }
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/findTsActivityForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的活动中心(只提取ID 和 Name)
    static findTsActivitysWithIdNameById (tsActivityId) {
        const query = {
            tsActivityId
        }
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/findTsActivitysWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询活动中心集合(只提取ID 和 Name)
    static findTsActivitysWithIdNameByName (tsActivityName) {
        const query = {
            tsActivityName
        }
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/findTsActivitysWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存活动中心
    static saveTsActivity (tsActivity) {
        const query = {}
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/saveTsActivity',
            method: 'POST',
            params: query,
            data: tsActivity
        });
    }

    //修改保存活动中心
    static updateTsActivity (tsActivity) {
        const query = {}
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/updateTsActivity',
            method: 'POST',
            params: query,
            data: tsActivity
        });
    }

    //根据ID查询指定的活动中心(只提取ID 和 Name)
    static deleteTsActivity (tsActivityId) {
        const query = {
            tsActivityId
        }
        return axios({
            url: '/tms/tsactivityEntity/TsActivity/deleteTsActivity',
            method: 'POST',
            params: query,
        });
    }
}
