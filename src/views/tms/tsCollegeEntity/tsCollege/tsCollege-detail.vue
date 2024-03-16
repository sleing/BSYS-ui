<!-- 院系信息详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsCollegeModalApp.tsCollege"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsCollegeModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsCollegeModalApp.tsCollege.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsCollegeModalApp.tsCollege.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsCollegeModalApp.tsCollege.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsCollegeModalApp.tsCollege.tsRemark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsCollegeModalApp.tsCollege.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsCollegeModalApp.tsCollege.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsCollegeModalApp.tsCollege.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsCollegeModalApp.tsCollege.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsCollegeService} from "@/views/tms/tsCollegeEntity/tsCollege/tsCollegeService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsCollegeListApp = inject('tsCollegeListApp', reactive({}));
            const tsCollegeModalApp = reactive({id: null, tsCollege: {}, display: false});

            onMounted(() => {
                    tsCollegeModalApp.tsCollege = {};
                if (routeId) {
                        tsCollegeModalApp.id = routeId;
                } else if (tsCollegeListApp.viewModalShowing) {
                        tsCollegeModalApp.id = tsCollegeListApp.currentId;
                        tsCollegeModalApp.display = true;
                }
                if (tsCollegeModalApp.id) {
                    getInfo(tsCollegeModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsCollegeService.findTsCollege(id).then((res) => {
                            tsCollegeModalApp.tsCollege = res.data;
                            tsCollegeModalApp.title = "查看 " + tsCollegeModalApp.tsCollege.name;
                })
            }

            return {
                    tsCollegeModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

