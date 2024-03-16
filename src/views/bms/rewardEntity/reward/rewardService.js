
import axios from 'axios';

/**
 * 获奖登记
 */
export class RewardService {
    // 分页查询列表
    static findRewards (queryParams) {
        return axios({
            url: '/bms/rewardEntity/Reward/findRewards',
            method: 'POST',
            data: queryParams
        });
    }

    //根据ID查询指定的获奖登记
    static findReward (rewardId) {
        const query = {
            rewardId
        }
        return axios({
            url: '/bms/rewardEntity/Reward/findReward',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖登记(包含外键名称)
    static findRewardForView (rewardId) {
        const query = {
            rewardId
        }
        return axios({
            url: '/bms/rewardEntity/Reward/findRewardForView',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖登记(包含外键名称)
    static findRewardForEdit (rewardId) {
        const query = {
            rewardId
        }
        return axios({
            url: '/bms/rewardEntity/Reward/findRewardForEdit',
            method: 'POST',
            params: query,
        });
    }

    //根据ID查询指定的获奖登记(只提取ID 和 Name)
    static findRewardsWithIdNameById (rewardId) {
        const query = {
            rewardId
        }
        return axios({
            url: '/bms/rewardEntity/Reward/findRewardsWithIdNameById',
            method: 'POST',
            params: query,
        });
    }

    //根据名称查询获奖登记集合(只提取ID 和 Name)
    static findRewardsWithIdNameByName (rewardName) {
        const query = {
            rewardName
        }
        return axios({
            url: '/bms/rewardEntity/Reward/findRewardsWithIdNameByName',
            method: 'POST',
            params: query,
        });
    }

    //新增保存获奖登记
    static saveReward (reward) {
        const query = {}
        return axios({
            url: '/bms/rewardEntity/Reward/saveReward',
            method: 'POST',
            params: query,
            data: reward
        });
    }

    //修改保存获奖登记
    static updateReward (reward) {
        const query = {}
        return axios({
            url: '/bms/rewardEntity/Reward/updateReward',
            method: 'POST',
            params: query,
            data: reward
        });
    }

    //根据ID查询指定的获奖登记(只提取ID 和 Name)
    static deleteReward (rewardId) {
        const query = {
            rewardId
        }
        return axios({
            url: '/bms/rewardEntity/Reward/deleteReward',
            method: 'POST',
            params: query,
        });
    }
}
