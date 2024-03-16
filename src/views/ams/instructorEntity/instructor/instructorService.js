
import axios from 'axios';

/**
 * 指导教师信息
 */
export class InstructorService {
    // 分页查询列表
    static findInstructors (queryParams) {
        return axios({
            url: '/ams/instructorEntity/Instructor/findInstructors',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的指导教师信息
    static findInstructor (instructorId) {
        const query = {
            instructorId
        }
        return axios({
            url: '/ams/instructorEntity/Instructor/findInstructor',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的指导教师信息(包含外键名称)
    static findInstructorForView (instructorId) {
        const query = {
            instructorId
        }
        return axios({
            url: '/ams/instructorEntity/Instructor/findInstructorForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的指导教师信息(包含外键名称)
    static findInstructorForEdit (instructorId) {
        const query = {
            instructorId
        }
        return axios({
            url: '/ams/instructorEntity/Instructor/findInstructorForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的指导教师信息(只提取ID 和 Name)
    static findInstructorsWithIdNameById (instructorId) {
        const query = {
            instructorId
        }
        return axios({
            url: '/ams/instructorEntity/Instructor/findInstructorsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询指导教师信息集合(只提取ID 和 Name)
    static findInstructorsWithIdNameByName (instructorName) {
        const query = {
            instructorName
        }
        return axios({
            url: '/ams/instructorEntity/Instructor/findInstructorsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存指导教师信息
    static saveInstructor (instructor) {
        const query = {}
        return axios({
            url: '/ams/instructorEntity/Instructor/saveInstructor',
            method: 'POST',
            params: query,
            data: instructor
        });
    }

    //修改保存指导教师信息
    static updateInstructor (instructor) {
        const query = {}
        return axios({
            url: '/ams/instructorEntity/Instructor/updateInstructor',
            method: 'POST',
            params: query,
            data: instructor
        });
    }

    //根据ID查询指定的指导教师信息(只提取ID 和 Name)
    static deleteInstructor (instructorId) {
        const query = {
            instructorId
        }
        return axios({
            url: '/ams/instructorEntity/Instructor/deleteInstructor',
            method: 'POST',
            params: query,
        });
    }
}
