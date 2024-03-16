
import axios from 'axios';

/**
 * 获奖学生信息
 */
export class AwardeeService {
    // 分页查询列表
    static findAwardees (queryParams) {
        return axios({
            url: '/ams/awardeeEntity/Awardee/findAwardees',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的获奖学生信息
    static findAwardee (awardeeId) {
        const query = {
            awardeeId
        }
        return axios({
            url: '/ams/awardeeEntity/Awardee/findAwardee',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖学生信息(包含外键名称)
    static findAwardeeForView (awardeeId) {
        const query = {
            awardeeId
        }
        return axios({
            url: '/ams/awardeeEntity/Awardee/findAwardeeForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖学生信息(包含外键名称)
    static findAwardeeForEdit (awardeeId) {
        const query = {
            awardeeId
        }
        return axios({
            url: '/ams/awardeeEntity/Awardee/findAwardeeForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖学生信息(只提取ID 和 Name)
    static findAwardeesWithIdNameById (awardeeId) {
        const query = {
            awardeeId
        }
        return axios({
            url: '/ams/awardeeEntity/Awardee/findAwardeesWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询获奖学生信息集合(只提取ID 和 Name)
    static findAwardeesWithIdNameByName (awardeeName) {
        const query = {
            awardeeName
        }
        return axios({
            url: '/ams/awardeeEntity/Awardee/findAwardeesWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存获奖学生信息
    static saveAwardee (awardee) {
        const query = {}
        return axios({
            url: '/ams/awardeeEntity/Awardee/saveAwardee',
            method: 'POST',
            params: query,
            data: awardee
        });
    }

    //修改保存获奖学生信息
    static updateAwardee (awardee) {
        const query = {}
        return axios({
            url: '/ams/awardeeEntity/Awardee/updateAwardee',
            method: 'POST',
            params: query,
            data: awardee
        });
    }

    //根据ID查询指定的获奖学生信息(只提取ID 和 Name)
    static deleteAwardee (awardeeId) {
        const query = {
            awardeeId
        }
        return axios({
            url: '/ams/awardeeEntity/Awardee/deleteAwardee',
            method: 'POST',
            params: query,
        });
    }


}
