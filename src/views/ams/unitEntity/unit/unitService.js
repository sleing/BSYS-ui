
import axios from 'axios';

/**
 * 举办单位信息
 */
export class UnitService {
    // 分页查询列表
    static findUnits (queryParams) {
        return axios({
            url: '/ams/unitEntity/Unit/findUnits',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的举办单位信息
    static findUnit (unitId) {
        const query = {
            unitId
        }
        return axios({
            url: '/ams/unitEntity/Unit/findUnit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的举办单位信息(包含外键名称)
    static findUnitForView (unitId) {
        const query = {
            unitId
        }
        return axios({
            url: '/ams/unitEntity/Unit/findUnitForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的举办单位信息(包含外键名称)
    static findUnitForEdit (unitId) {
        const query = {
            unitId
        }
        return axios({
            url: '/ams/unitEntity/Unit/findUnitForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的举办单位信息(只提取ID 和 Name)
    static findUnitsWithIdNameById (unitId) {
        const query = {
            unitId
        }
        return axios({
            url: '/ams/unitEntity/Unit/findUnitsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询举办单位信息集合(只提取ID 和 Name)
    static findUnitsWithIdNameByName (unitName) {
        const query = {
            unitName
        }
        return axios({
            url: '/ams/unitEntity/Unit/findUnitsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存举办单位信息
    static saveUnit (unit) {
        const query = {}
        return axios({
            url: '/ams/unitEntity/Unit/saveUnit',
            method: 'POST',
            params: query,
            data: unit
        });
    }

    //修改保存举办单位信息
    static updateUnit (unit) {
        const query = {}
        return axios({
            url: '/ams/unitEntity/Unit/updateUnit',
            method: 'POST',
            params: query,
            data: unit
        });
    }

    //根据ID查询指定的举办单位信息(只提取ID 和 Name)
    static deleteUnit (unitId) {
        const query = {
            unitId
        }
        return axios({
            url: '/ams/unitEntity/Unit/deleteUnit',
            method: 'POST',
            params: query,
        });
    }
}
