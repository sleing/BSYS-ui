<!-- 会议管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsMeetingModalApp.tsMeeting"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsMeetingModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsMeetingModalApp.tsMeeting.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsMeetingModalApp.tsMeeting.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsMeetingModalApp.tsMeeting.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="会议主题">
                        {{ tsMeetingModalApp.tsMeeting.theme }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="主办单位">
                        {{ tsMeetingModalApp.tsMeeting.organizationId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="协办单位">
                        {{ tsMeetingModalApp.tsMeeting.viceOrganizationId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="会议时间">
                        {{ tsMeetingModalApp.tsMeeting.meetingDate }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="参会人员">
                        {{ tsMeetingModalApp.tsMeeting.conferee }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="会议记录">
                        {{ tsMeetingModalApp.tsMeeting.meetingRecord }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="会议方式">
                        {{ tsMeetingModalApp.tsMeeting.meetingMode }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="会议地址">
                        {{ tsMeetingModalApp.tsMeeting.meetingAddress }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsMeetingModalApp.tsMeeting.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsMeetingModalApp.tsMeeting.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsMeetingModalApp.tsMeeting.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsMeetingModalApp.tsMeeting.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsMeetingService} from "@/views/tms/tsmeetingEntity/tsMeeting/tsMeetingService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsMeetingListApp = inject('tsMeetingListApp', reactive({}));
            const tsMeetingModalApp = reactive({id: null, tsMeeting: {}, display: false});

            onMounted(() => {
                    tsMeetingModalApp.tsMeeting = {};
                if (routeId) {
                        tsMeetingModalApp.id = routeId;
                } else if (tsMeetingListApp.viewModalShowing) {
                        tsMeetingModalApp.id = tsMeetingListApp.currentId;
                        tsMeetingModalApp.display = true;
                }
                if (tsMeetingModalApp.id) {
                    getInfo(tsMeetingModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsMeetingService.findTsMeeting(id).then((res) => {
                            tsMeetingModalApp.tsMeeting = res.data;
                            tsMeetingModalApp.title = "查看 " + tsMeetingModalApp.tsMeeting.name;
                })
            }

            return {
                    tsMeetingModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

