
import axios from 'axios';

/**
 * 部门信息管理
 */
export class TsDepartmentService {
    // 分页查询列表
    static findTsDepartments (queryParams) {
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/findTsDepartments',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的部门信息管理
    static findTsDepartment (tsDepartmentId) {
        const query = {
            tsDepartmentId
        }
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/findTsDepartment',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的部门信息管理(包含外键名称)
    static findTsDepartmentForView (tsDepartmentId) {
        const query = {
            tsDepartmentId
        }
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/findTsDepartmentForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的部门信息管理(包含外键名称)
    static findTsDepartmentForEdit (tsDepartmentId) {
        const query = {
            tsDepartmentId
        }
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/findTsDepartmentForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的部门信息管理(只提取ID 和 Name)
    static findTsDepartmentsWithIdNameById (tsDepartmentId) {
        const query = {
            tsDepartmentId
        }
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/findTsDepartmentsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询部门信息管理集合(只提取ID 和 Name)
    static findTsDepartmentsWithIdNameByName (tsDepartmentName) {
        const query = {
            tsDepartmentName
        }
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/findTsDepartmentsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存部门信息管理
    static saveTsDepartment (tsDepartment) {
        const query = {}
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/saveTsDepartment',
            method: 'POST',
            params: query,
            data: tsDepartment
        });
    }

    //修改保存部门信息管理
    static updateTsDepartment (tsDepartment) {
        const query = {}
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/updateTsDepartment',
            method: 'POST',
            params: query,
            data: tsDepartment
        });
    }

    //根据ID查询指定的部门信息管理(只提取ID 和 Name)
    static deleteTsDepartment (tsDepartmentId) {
        const query = {
            tsDepartmentId
        }
        return axios({
            url: '/tms/tsdepartmentEntity/TsDepartment/deleteTsDepartment',
            method: 'POST',
            params: query,
        });
    }
}
