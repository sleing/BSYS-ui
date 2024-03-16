
import axios from 'axios';

/**
 * 职务管理
 */
export class TsPositionService {
    // 分页查询列表
    static findTsPositions (queryParams) {
        return axios({
            url: '/tms/tspositionEntity/TsPosition/findTsPositions',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的职务管理
    static findTsPosition (tsPositionId) {
        const query = {
            tsPositionId
        }
        return axios({
            url: '/tms/tspositionEntity/TsPosition/findTsPosition',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的职务管理(包含外键名称)
    static findTsPositionForView (tsPositionId) {
        const query = {
            tsPositionId
        }
        return axios({
            url: '/tms/tspositionEntity/TsPosition/findTsPositionForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的职务管理(包含外键名称)
    static findTsPositionForEdit (tsPositionId) {
        const query = {
            tsPositionId
        }
        return axios({
            url: '/tms/tspositionEntity/TsPosition/findTsPositionForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的职务管理(只提取ID 和 Name)
    static findTsPositionsWithIdNameById (tsPositionId) {
        const query = {
            tsPositionId
        }
        return axios({
            url: '/tms/tspositionEntity/TsPosition/findTsPositionsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询职务管理集合(只提取ID 和 Name)
    static findTsPositionsWithIdNameByName (tsPositionName) {
        const query = {
            tsPositionName
        }
        return axios({
            url: '/tms/tspositionEntity/TsPosition/findTsPositionsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存职务管理
    static saveTsPosition (tsPosition) {
        const query = {}
        return axios({
            url: '/tms/tspositionEntity/TsPosition/saveTsPosition',
            method: 'POST',
            params: query,
            data: tsPosition
        });
    }

    //修改保存职务管理
    static updateTsPosition (tsPosition) {
        const query = {}
        return axios({
            url: '/tms/tspositionEntity/TsPosition/updateTsPosition',
            method: 'POST',
            params: query,
            data: tsPosition
        });
    }

    //根据ID查询指定的职务管理(只提取ID 和 Name)
    static deleteTsPosition (tsPositionId) {
        const query = {
            tsPositionId
        }
        return axios({
            url: '/tms/tspositionEntity/TsPosition/deleteTsPosition',
            method: 'POST',
            params: query,
        });
    }
}
