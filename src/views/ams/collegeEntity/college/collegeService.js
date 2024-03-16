
import axios from 'axios';

/**
 * 学院信息
 */
export class CollegeService {
    // 分页查询列表
    static findColleges (queryParams) {
        return axios({
            url: '/ams/collegeEntity/College/findColleges',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的学院信息
    static findCollege (collegeId) {
        const query = {
            collegeId
        }
        return axios({
            url: '/ams/collegeEntity/College/findCollege',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的学院信息(包含外键名称)
    static findCollegeForView (collegeId) {
        const query = {
            collegeId
        }
        return axios({
            url: '/ams/collegeEntity/College/findCollegeForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的学院信息(包含外键名称)
    static findCollegeForEdit (collegeId) {
        const query = {
            collegeId
        }
        return axios({
            url: '/ams/collegeEntity/College/findCollegeForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的学院信息(只提取ID 和 Name)
    static findCollegesWithIdNameById (collegeId) {
        const query = {
            collegeId
        }
        return axios({
            url: '/ams/collegeEntity/College/findCollegesWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询学院信息集合(只提取ID 和 Name)
    static findCollegesWithIdNameByName (collegeName) {
        const query = {
            collegeName
        }
        return axios({
            url: '/ams/collegeEntity/College/findCollegesWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存学院信息
    static saveCollege (college) {
        const query = {}
        return axios({
            url: '/ams/collegeEntity/College/saveCollege',
            method: 'POST',
            params: query,
            data: college
        });
    }

    //修改保存学院信息
    static updateCollege (college) {
        const query = {}
        return axios({
            url: '/ams/collegeEntity/College/updateCollege',
            method: 'POST',
            params: query,
            data: college
        });
    }

    //根据ID查询指定的学院信息(只提取ID 和 Name)
    static deleteCollege (collegeId) {
        const query = {
            collegeId
        }
        return axios({
            url: '/ams/collegeEntity/College/deleteCollege',
            method: 'POST',
            params: query,
        });
    }
}
