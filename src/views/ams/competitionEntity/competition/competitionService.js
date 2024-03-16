
import axios from 'axios';

/**
 * 竞赛信息
 */
export class CompetitionService {
    // 分页查询列表
    static findCompetitions (queryParams) {
        return axios({
            url: '/ams/competitionEntity/Competition/findCompetitions',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的竞赛信息
    static findCompetition (competitionId) {
        const query = {
            competitionId
        }
        return axios({
            url: '/ams/competitionEntity/Competition/findCompetition',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的竞赛信息(包含外键名称)
    static findCompetitionForView (competitionId) {
        const query = {
            competitionId
        }
        return axios({
            url: '/ams/competitionEntity/Competition/findCompetitionForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的竞赛信息(包含外键名称)
    static findCompetitionForEdit (competitionId) {
        const query = {
            competitionId
        }
        return axios({
            url: '/ams/competitionEntity/Competition/findCompetitionForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的竞赛信息(只提取ID 和 Name)
    static findCompetitionsWithIdNameById (competitionId) {
        const query = {
            competitionId
        }
        return axios({
            url: '/ams/competitionEntity/Competition/findCompetitionsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询竞赛信息集合(只提取ID 和 Name)
    static findCompetitionsWithIdNameByName (competitionName) {
        const query = {
            competitionName
        }
        return axios({
            url: '/ams/competitionEntity/Competition/findCompetitionsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存竞赛信息
    static saveCompetition (competition) {
        const query = {}
        return axios({
            url: '/ams/competitionEntity/Competition/saveCompetition',
            method: 'POST',
            params: query,
            data: competition
        });
    }

    //修改保存竞赛信息
    static updateCompetition (competition) {
        const query = {}
        return axios({
            url: '/ams/competitionEntity/Competition/updateCompetition',
            method: 'POST',
            params: query,
            data: competition
        });
    }

    //根据ID查询指定的竞赛信息(只提取ID 和 Name)
    static deleteCompetition (competitionId) {
        const query = {
            competitionId
        }
        return axios({
            url: '/ams/competitionEntity/Competition/deleteCompetition',
            method: 'POST',
            params: query,
        });
    }

    //检验竞赛名称是否重复
    static getCompetitionEidByName(competitionName) {
      const query = {
        competitionName
      }
      return axios({
        url: '/ams/competitionEntity/Competition/getCompetitionEidByName',
        method: 'POST',
        params: query,
      });
    }
}
