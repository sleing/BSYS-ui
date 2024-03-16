
import axios from 'axios';

/**
 * 会议管理
 */
export class TsMeetingService {
    // 分页查询列表
    static findTsMeetings (queryParams) {
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/findTsMeetings',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的会议管理
    static findTsMeeting (tsMeetingId) {
        const query = {
            tsMeetingId
        }
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/findTsMeeting',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的会议管理(包含外键名称)
    static findTsMeetingForView (tsMeetingId) {
        const query = {
            tsMeetingId
        }
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/findTsMeetingForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的会议管理(包含外键名称)
    static findTsMeetingForEdit (tsMeetingId) {
        const query = {
            tsMeetingId
        }
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/findTsMeetingForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的会议管理(只提取ID 和 Name)
    static findTsMeetingsWithIdNameById (tsMeetingId) {
        const query = {
            tsMeetingId
        }
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/findTsMeetingsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询会议管理集合(只提取ID 和 Name)
    static findTsMeetingsWithIdNameByName (tsMeetingName) {
        const query = {
            tsMeetingName
        }
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/findTsMeetingsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存会议管理
    static saveTsMeeting (tsMeeting) {
        const query = {}
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/saveTsMeeting',
            method: 'POST',
            params: query,
            data: tsMeeting
        });
    }

    //修改保存会议管理
    static updateTsMeeting (tsMeeting) {
        const query = {}
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/updateTsMeeting',
            method: 'POST',
            params: query,
            data: tsMeeting
        });
    }

    //根据ID查询指定的会议管理(只提取ID 和 Name)
    static deleteTsMeeting (tsMeetingId) {
        const query = {
            tsMeetingId
        }
        return axios({
            url: '/tms/tsmeetingEntity/TsMeeting/deleteTsMeeting',
            method: 'POST',
            params: query,
        });
    }
}
