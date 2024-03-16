<!-- 学生信息详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="studentInfoModalApp.studentInfo"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="studentInfoModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ studentInfoModalApp.studentInfo.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ studentInfoModalApp.studentInfo.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ studentInfoModalApp.studentInfo.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学号">
                        {{ studentInfoModalApp.studentInfo.studentId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学院">
                        {{ studentInfoModalApp.studentInfo.collegeId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="专业">
                        {{ studentInfoModalApp.studentInfo.major }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="年级">
                        {{ studentInfoModalApp.studentInfo.grade }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="班级">
                        {{ studentInfoModalApp.studentInfo.classGrade }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="联系电话">
                        {{ studentInfoModalApp.studentInfo.contactTel }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="联系邮箱">
                        {{ studentInfoModalApp.studentInfo.email }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ studentInfoModalApp.studentInfo.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ studentInfoModalApp.studentInfo.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ studentInfoModalApp.studentInfo.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ studentInfoModalApp.studentInfo.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {StudentInfoService} from "@/views/ams/studentEntity/studentInfo/studentInfoService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let studentInfoListApp = inject('studentInfoListApp', reactive({}));
            const studentInfoModalApp = reactive({id: null, studentInfo: {}, display: false});

            onMounted(() => {
                    studentInfoModalApp.studentInfo = {};
                if (routeId) {
                        studentInfoModalApp.id = routeId;
                } else if (studentInfoListApp.viewModalShowing) {
                        studentInfoModalApp.id = studentInfoListApp.currentId;
                        studentInfoModalApp.display = true;
                }
                if (studentInfoModalApp.id) {
                    getInfo(studentInfoModalApp.id);
                }
            })

            const getInfo = (id) => {
                    StudentInfoService.findStudentInfo(id).then((res) => {
                            studentInfoModalApp.studentInfo = res.data;
                            studentInfoModalApp.title = "查看 " + studentInfoModalApp.studentInfo.name;
                })
            }

            return {
                    studentInfoModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

