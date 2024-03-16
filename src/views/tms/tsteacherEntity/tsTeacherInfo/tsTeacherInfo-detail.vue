<!-- 老师信息管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsTeacherInfoModalApp.tsTeacherInfo"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsTeacherInfoModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="老师工号">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.teacherId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学院">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.collegeId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="邮箱">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.email }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="职务">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.positionId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="联系电话">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.telNumber }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsTeacherInfoModalApp.tsTeacherInfo.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsTeacherInfoService} from "@/views/tms/tsteacherEntity/tsTeacherInfo/tsTeacherInfoService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsTeacherInfoListApp = inject('tsTeacherInfoListApp', reactive({}));
            const tsTeacherInfoModalApp = reactive({id: null, tsTeacherInfo: {}, display: false});

            onMounted(() => {
                    tsTeacherInfoModalApp.tsTeacherInfo = {};
                if (routeId) {
                        tsTeacherInfoModalApp.id = routeId;
                } else if (tsTeacherInfoListApp.viewModalShowing) {
                        tsTeacherInfoModalApp.id = tsTeacherInfoListApp.currentId;
                        tsTeacherInfoModalApp.display = true;
                }
                if (tsTeacherInfoModalApp.id) {
                    getInfo(tsTeacherInfoModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsTeacherInfoService.findTsTeacherInfo(id).then((res) => {
                            tsTeacherInfoModalApp.tsTeacherInfo = res.data;
                            tsTeacherInfoModalApp.title = "查看 " + tsTeacherInfoModalApp.tsTeacherInfo.name;
                })
            }

            return {
                    tsTeacherInfoModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

