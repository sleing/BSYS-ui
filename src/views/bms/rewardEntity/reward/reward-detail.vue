<!-- 获奖登记详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="rewardModalApp.reward"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="rewardModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ rewardModalApp.reward.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ rewardModalApp.reward.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ rewardModalApp.reward.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="级别">
                        {{ rewardModalApp.reward.level }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="竞赛名称">
                        {{ rewardModalApp.reward.title }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="指导教师">
                        {{ rewardModalApp.reward.instructors }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="证明文件">
                        {{ rewardModalApp.reward.evidence }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="时间">
                        {{ rewardModalApp.reward.year }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="举办单位">
                        {{ rewardModalApp.reward.organization }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="获奖学生">
                        {{ rewardModalApp.reward.allStudents }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="审核状态">
                        {{ rewardModalApp.reward.auditStatus }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="作品名称">
                        {{ rewardModalApp.reward.workName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="获奖电话">
                        {{ rewardModalApp.reward.tel }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学院">
                        {{ rewardModalApp.reward.college }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ rewardModalApp.reward.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ rewardModalApp.reward.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ rewardModalApp.reward.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ rewardModalApp.reward.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {RewardService} from "@/views/bms/rewardEntity/reward/rewardService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let rewardListApp = inject('rewardListApp', reactive({}));
            const rewardModalApp = reactive({id: null, reward: {}, display: false});

            onMounted(() => {
                    rewardModalApp.reward = {};
                if (routeId) {
                        rewardModalApp.id = routeId;
                } else if (rewardListApp.viewModalShowing) {
                        rewardModalApp.id = rewardListApp.currentId;
                        rewardModalApp.display = true;
                }
                if (rewardModalApp.id) {
                    getInfo(rewardModalApp.id);
                }
            })

            const getInfo = (id) => {
                    RewardService.findReward(id).then((res) => {
                            rewardModalApp.reward = res.data;
                            rewardModalApp.title = "查看 " + rewardModalApp.reward.name;
                })
            }

            return {
                    rewardModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

