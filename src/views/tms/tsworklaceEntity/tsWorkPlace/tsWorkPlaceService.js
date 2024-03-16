
import axios from 'axios';

/**
 * 办公地点管理
 */
export class TsWorkPlaceService {
    // 分页查询列表
    static findTsWorkPlaces (queryParams) {
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/findTsWorkPlaces',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的办公地点管理
    static findTsWorkPlace (tsWorkPlaceId) {
        const query = {
            tsWorkPlaceId
        }
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/findTsWorkPlace',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的办公地点管理(包含外键名称)
    static findTsWorkPlaceForView (tsWorkPlaceId) {
        const query = {
            tsWorkPlaceId
        }
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/findTsWorkPlaceForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的办公地点管理(包含外键名称)
    static findTsWorkPlaceForEdit (tsWorkPlaceId) {
        const query = {
            tsWorkPlaceId
        }
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/findTsWorkPlaceForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的办公地点管理(只提取ID 和 Name)
    static findTsWorkPlacesWithIdNameById (tsWorkPlaceId) {
        const query = {
            tsWorkPlaceId
        }
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/findTsWorkPlacesWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询办公地点管理集合(只提取ID 和 Name)
    static findTsWorkPlacesWithIdNameByName (tsWorkPlaceName) {
        const query = {
            tsWorkPlaceName
        }
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/findTsWorkPlacesWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存办公地点管理
    static saveTsWorkPlace (tsWorkPlace) {
        const query = {}
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/saveTsWorkPlace',
            method: 'POST',
            params: query,
            data: tsWorkPlace
        });
    }

    //修改保存办公地点管理
    static updateTsWorkPlace (tsWorkPlace) {
        const query = {}
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/updateTsWorkPlace',
            method: 'POST',
            params: query,
            data: tsWorkPlace
        });
    }

    //根据ID查询指定的办公地点管理(只提取ID 和 Name)
    static deleteTsWorkPlace (tsWorkPlaceId) {
        const query = {
            tsWorkPlaceId
        }
        return axios({
            url: '/tms/tsworklaceEntity/TsWorkPlace/deleteTsWorkPlace',
            method: 'POST',
            params: query,
        });
    }
}
