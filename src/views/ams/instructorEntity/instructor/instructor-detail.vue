<!-- 指导教师信息详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="instructorModalApp.instructor"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="instructorModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ instructorModalApp.instructor.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ instructorModalApp.instructor.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ instructorModalApp.instructor.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="序号">
                        {{ instructorModalApp.instructor.displayIndex }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="教师实体">
                        {{ instructorModalApp.instructor.teacherId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="获奖信息">
                        {{ instructorModalApp.instructor.awardId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ instructorModalApp.instructor.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ instructorModalApp.instructor.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ instructorModalApp.instructor.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ instructorModalApp.instructor.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {InstructorService} from "@/views/ams/instructorEntity/instructor/instructorService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let instructorListApp = inject('instructorListApp', reactive({}));
            const instructorModalApp = reactive({id: null, instructor: {}, display: false});

            onMounted(() => {
                    instructorModalApp.instructor = {};
                if (routeId) {
                        instructorModalApp.id = routeId;
                } else if (instructorListApp.viewModalShowing) {
                        instructorModalApp.id = instructorListApp.currentId;
                        instructorModalApp.display = true;
                }
                if (instructorModalApp.id) {
                    getInfo(instructorModalApp.id);
                }
            })

            const getInfo = (id) => {
                    InstructorService.findInstructor(id).then((res) => {
                            instructorModalApp.instructor = res.data;
                            instructorModalApp.title = "查看 " + instructorModalApp.instructor.name;
                })
            }

            return {
                    instructorModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

