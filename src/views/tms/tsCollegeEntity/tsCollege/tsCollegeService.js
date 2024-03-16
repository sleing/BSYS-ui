
import axios from 'axios';

/**
 * 院系信息
 */
export class TsCollegeService {
    // 分页查询列表
    static findTsColleges (queryParams) {
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/findTsColleges',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的院系信息
    static findTsCollege (tsCollegeId) {
        const query = {
            tsCollegeId
        }
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/findTsCollege',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的院系信息(包含外键名称)
    static findTsCollegeForView (tsCollegeId) {
        const query = {
            tsCollegeId
        }
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/findTsCollegeForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的院系信息(包含外键名称)
    static findTsCollegeForEdit (tsCollegeId) {
        const query = {
            tsCollegeId
        }
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/findTsCollegeForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的院系信息(只提取ID 和 Name)
    static findTsCollegesWithIdNameById (tsCollegeId) {
        const query = {
            tsCollegeId
        }
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/findTsCollegesWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询院系信息集合(只提取ID 和 Name)
    static findTsCollegesWithIdNameByName (tsCollegeName) {
        const query = {
            tsCollegeName
        }
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/findTsCollegesWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存院系信息
    static saveTsCollege (tsCollege) {
        const query = {}
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/saveTsCollege',
            method: 'POST',
            params: query,
            data: tsCollege
        });
    }

    //修改保存院系信息
    static updateTsCollege (tsCollege) {
        const query = {}
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/updateTsCollege',
            method: 'POST',
            params: query,
            data: tsCollege
        });
    }

    //根据ID查询指定的院系信息(只提取ID 和 Name)
    static deleteTsCollege (tsCollegeId) {
        const query = {
            tsCollegeId
        }
        return axios({
            url: '/tms/tsCollegeEntity/TsCollege/deleteTsCollege',
            method: 'POST',
            params: query,
        });
    }
}
