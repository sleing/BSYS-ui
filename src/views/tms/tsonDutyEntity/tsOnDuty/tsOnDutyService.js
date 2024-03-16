
import axios from 'axios';

/**
 * 值班管理
 */
export class TsOnDutyService {
    // 分页查询列表
    static findTsOnDutys (queryParams) {
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/findTsOnDutys',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的值班管理
    static findTsOnDuty (tsOnDutyId) {
        const query = {
            tsOnDutyId
        }
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/findTsOnDuty',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的值班管理(包含外键名称)
    static findTsOnDutyForView (tsOnDutyId) {
        const query = {
            tsOnDutyId
        }
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/findTsOnDutyForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的值班管理(包含外键名称)
    static findTsOnDutyForEdit (tsOnDutyId) {
        const query = {
            tsOnDutyId
        }
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/findTsOnDutyForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的值班管理(只提取ID 和 Name)
    static findTsOnDutysWithIdNameById (tsOnDutyId) {
        const query = {
            tsOnDutyId
        }
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/findTsOnDutysWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询值班管理集合(只提取ID 和 Name)
    static findTsOnDutysWithIdNameByName (tsOnDutyName) {
        const query = {
            tsOnDutyName
        }
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/findTsOnDutysWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存值班管理
    static saveTsOnDuty (tsOnDuty) {
        const query = {}
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/saveTsOnDuty',
            method: 'POST',
            params: query,
            data: tsOnDuty
        });
    }

    //修改保存值班管理
    static updateTsOnDuty (tsOnDuty) {
        const query = {}
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/updateTsOnDuty',
            method: 'POST',
            params: query,
            data: tsOnDuty
        });
    }

    //根据ID查询指定的值班管理(只提取ID 和 Name)
    static deleteTsOnDuty (tsOnDutyId) {
        const query = {
            tsOnDutyId
        }
        return axios({
            url: '/tms/tsonDutyEntity/TsOnDuty/deleteTsOnDuty',
            method: 'POST',
            params: query,
        });
    }
}
