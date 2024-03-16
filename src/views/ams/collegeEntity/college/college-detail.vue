<!-- 学院信息详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="collegeModalApp.college"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="collegeModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ collegeModalApp.college.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ collegeModalApp.college.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ collegeModalApp.college.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ collegeModalApp.college.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ collegeModalApp.college.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ collegeModalApp.college.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ collegeModalApp.college.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {CollegeService} from "@/views/ams/collegeEntity/college/collegeService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let collegeListApp = inject('collegeListApp', reactive({}));
            const collegeModalApp = reactive({id: null, college: {}, display: false});

            onMounted(() => {
                    collegeModalApp.college = {};
                if (routeId) {
                        collegeModalApp.id = routeId;
                } else if (collegeListApp.viewModalShowing) {
                        collegeModalApp.id = collegeListApp.currentId;
                        collegeModalApp.display = true;
                }
                if (collegeModalApp.id) {
                    getInfo(collegeModalApp.id);
                }
            })

            const getInfo = (id) => {
                    CollegeService.findCollege(id).then((res) => {
                            collegeModalApp.college = res.data;
                            collegeModalApp.title = "查看 " + collegeModalApp.college.name;
                })
            }

            return {
                    collegeModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

