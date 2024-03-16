<!-- 活动中心详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsActivityModalApp.tsActivity"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsActivityModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsActivityModalApp.tsActivity.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsActivityModalApp.tsActivity.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsActivityModalApp.tsActivity.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="序号">
                        {{ tsActivityModalApp.tsActivity.activityIndex }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动类型">
                        {{ tsActivityModalApp.tsActivity.activityType }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动时间">
                        {{ tsActivityModalApp.tsActivity.activityDate }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动主持人">
                        {{ tsActivityModalApp.tsActivity.activityHostId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动地点">
                        {{ tsActivityModalApp.tsActivity.activityAdd }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="参与人员">
                        {{ tsActivityModalApp.tsActivity.participant }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动内容">
                        {{ tsActivityModalApp.tsActivity.activityContent }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动评价">
                        {{ tsActivityModalApp.tsActivity.activityEval }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="活动资料">
                        {{ tsActivityModalApp.tsActivity.activityFile }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="举办时长">
                        {{ tsActivityModalApp.tsActivity.holdTime }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsActivityModalApp.tsActivity.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsActivityModalApp.tsActivity.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsActivityModalApp.tsActivity.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsActivityModalApp.tsActivity.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsActivityService} from "@/views/tms/tsactivityEntity/tsActivity/tsActivityService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsActivityListApp = inject('tsActivityListApp', reactive({}));
            const tsActivityModalApp = reactive({id: null, tsActivity: {}, display: false});

            onMounted(() => {
                    tsActivityModalApp.tsActivity = {};
                if (routeId) {
                        tsActivityModalApp.id = routeId;
                } else if (tsActivityListApp.viewModalShowing) {
                        tsActivityModalApp.id = tsActivityListApp.currentId;
                        tsActivityModalApp.display = true;
                }
                if (tsActivityModalApp.id) {
                    getInfo(tsActivityModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsActivityService.findTsActivity(id).then((res) => {
                            tsActivityModalApp.tsActivity = res.data;
                            tsActivityModalApp.title = "查看 " + tsActivityModalApp.tsActivity.name;
                })
            }

            return {
                    tsActivityModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

