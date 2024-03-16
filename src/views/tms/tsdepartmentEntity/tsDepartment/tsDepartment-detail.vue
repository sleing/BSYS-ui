<!-- 部门信息管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsDepartmentModalApp.tsDepartment"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsDepartmentModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsDepartmentModalApp.tsDepartment.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsDepartmentModalApp.tsDepartment.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsDepartmentModalApp.tsDepartment.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门级别">
                        {{ tsDepartmentModalApp.tsDepartment.departmentLevel }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门主管老师">
                        {{ tsDepartmentModalApp.tsDepartment.supervisorTeaId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门主管学生">
                        {{ tsDepartmentModalApp.tsDepartment.supervisorStuId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门主要负责人">
                        {{ tsDepartmentModalApp.tsDepartment.leaderId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门负责人">
                        {{ tsDepartmentModalApp.tsDepartment.viceLeader }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门成员">
                        {{ tsDepartmentModalApp.tsDepartment.member }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="部门描述">
                        {{ tsDepartmentModalApp.tsDepartment.description }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="成立日期">
                        {{ tsDepartmentModalApp.tsDepartment.foundDate }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsDepartmentModalApp.tsDepartment.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsDepartmentModalApp.tsDepartment.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsDepartmentModalApp.tsDepartment.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsDepartmentModalApp.tsDepartment.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsDepartmentService} from "@/views/tms/tsdepartmentEntity/tsDepartment/tsDepartmentService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsDepartmentListApp = inject('tsDepartmentListApp', reactive({}));
            const tsDepartmentModalApp = reactive({id: null, tsDepartment: {}, display: false});

            onMounted(() => {
                    tsDepartmentModalApp.tsDepartment = {};
                if (routeId) {
                        tsDepartmentModalApp.id = routeId;
                } else if (tsDepartmentListApp.viewModalShowing) {
                        tsDepartmentModalApp.id = tsDepartmentListApp.currentId;
                        tsDepartmentModalApp.display = true;
                }
                if (tsDepartmentModalApp.id) {
                    getInfo(tsDepartmentModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsDepartmentService.findTsDepartment(id).then((res) => {
                            tsDepartmentModalApp.tsDepartment = res.data;
                            tsDepartmentModalApp.title = "查看 " + tsDepartmentModalApp.tsDepartment.name;
                })
            }

            return {
                    tsDepartmentModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

