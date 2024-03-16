<!-- 团学会学生信息管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsStudentInfoModalApp.tsStudentInfo"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsStudentInfoModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsStudentInfoModalApp.tsStudentInfo.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsStudentInfoModalApp.tsStudentInfo.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsStudentInfoModalApp.tsStudentInfo.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学号">
                        {{ tsStudentInfoModalApp.tsStudentInfo.studentId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学院">
                        {{ tsStudentInfoModalApp.tsStudentInfo.collegeId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="专业">
                        {{ tsStudentInfoModalApp.tsStudentInfo.major }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="年级">
                        {{ tsStudentInfoModalApp.tsStudentInfo.grade }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="班级">
                        {{ tsStudentInfoModalApp.tsStudentInfo.classGrade }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="联系电话">
                        {{ tsStudentInfoModalApp.tsStudentInfo.contactTel }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="联系邮箱">
                        {{ tsStudentInfoModalApp.tsStudentInfo.email }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="政治面貌">
                        {{ tsStudentInfoModalApp.tsStudentInfo.politics }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsStudentInfoModalApp.tsStudentInfo.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsStudentInfoModalApp.tsStudentInfo.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsStudentInfoModalApp.tsStudentInfo.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsStudentInfoModalApp.tsStudentInfo.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsStudentInfoService} from "@/views/tms/tsstudentEntity/tsStudentInfo/tsStudentInfoService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsStudentInfoListApp = inject('tsStudentInfoListApp', reactive({}));
            const tsStudentInfoModalApp = reactive({id: null, tsStudentInfo: {}, display: false});

            onMounted(() => {
                    tsStudentInfoModalApp.tsStudentInfo = {};
                if (routeId) {
                        tsStudentInfoModalApp.id = routeId;
                } else if (tsStudentInfoListApp.viewModalShowing) {
                        tsStudentInfoModalApp.id = tsStudentInfoListApp.currentId;
                        tsStudentInfoModalApp.display = true;
                }
                if (tsStudentInfoModalApp.id) {
                    getInfo(tsStudentInfoModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsStudentInfoService.findTsStudentInfo(id).then((res) => {
                            tsStudentInfoModalApp.tsStudentInfo = res.data;
                            tsStudentInfoModalApp.title = "查看 " + tsStudentInfoModalApp.tsStudentInfo.name;
                })
            }

            return {
                    tsStudentInfoModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

