<!-- 竞赛信息详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="competitionModalApp.competition"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="competitionModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ competitionModalApp.competition.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ competitionModalApp.competition.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ competitionModalApp.competition.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="获奖级别">
                        {{ competitionModalApp.competition.awardLevel }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="主办方">
                        {{ competitionModalApp.competition.unitsId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="类别">
                        {{ competitionModalApp.competition.competitionCategory }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="级别">
                        {{ competitionModalApp.competition.competitionLevel }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ competitionModalApp.competition.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ competitionModalApp.competition.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ competitionModalApp.competition.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ competitionModalApp.competition.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {CompetitionService} from "@/views/ams/competitionEntity/competition/competitionService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let competitionListApp = inject('competitionListApp', reactive({}));
            const competitionModalApp = reactive({id: null, competition: {}, display: false});

            onMounted(() => {
                    competitionModalApp.competition = {};
                if (routeId) {
                        competitionModalApp.id = routeId;
                } else if (competitionListApp.viewModalShowing) {
                        competitionModalApp.id = competitionListApp.currentId;
                        competitionModalApp.display = true;
                }
                if (competitionModalApp.id) {
                    getInfo(competitionModalApp.id);
                }
            })

            const getInfo = (id) => {
                    CompetitionService.findCompetition(id).then((res) => {
                            competitionModalApp.competition = res.data;
                            competitionModalApp.title = "查看 " + competitionModalApp.competition.name;
                })
            }

            return {
                    competitionModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

