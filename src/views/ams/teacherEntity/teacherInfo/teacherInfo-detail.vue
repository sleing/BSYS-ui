<!-- 教师信息详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="teacherInfoModalApp.teacherInfo"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="teacherInfoModalApp.title" bordered>
                                    <a-descriptions-item label="创建人">
                        {{ teacherInfoModalApp.teacherInfo.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ teacherInfoModalApp.teacherInfo.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="教师工号">
                        {{ teacherInfoModalApp.teacherInfo.teacherId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="学院">
                        {{ teacherInfoModalApp.teacherInfo.collegeId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="邮箱">
                        {{ teacherInfoModalApp.teacherInfo.email }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ teacherInfoModalApp.teacherInfo.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ teacherInfoModalApp.teacherInfo.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TeacherInfoService} from "@/views/ams/teacherEntity/teacherInfo/teacherInfoService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let teacherInfoListApp = inject('teacherInfoListApp', reactive({}));
            const teacherInfoModalApp = reactive({id: null, teacherInfo: {}, display: false});

            onMounted(() => {
                    teacherInfoModalApp.teacherInfo = {};
                if (routeId) {
                        teacherInfoModalApp.id = routeId;
                } else if (teacherInfoListApp.viewModalShowing) {
                        teacherInfoModalApp.id = teacherInfoListApp.currentId;
                        teacherInfoModalApp.display = true;
                }
                if (teacherInfoModalApp.id) {
                    getInfo(teacherInfoModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TeacherInfoService.findTeacherInfo(id).then((res) => {
                            teacherInfoModalApp.teacherInfo = res.data;
                            teacherInfoModalApp.title = "查看 " + teacherInfoModalApp.teacherInfo.name;
                })
            }

            return {
                    teacherInfoModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

