<!-- 职务管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsPositiodalApp.tsPosition"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsPositionModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsPositionModalApp.tsPosition.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsPositionModalApp.tsPosition.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsPositionModalApp.tsPosition.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="职务描述">
                        {{ tsPositionModalApp.tsPosition.positionDetail }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsPositionModalApp.tsPosition.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsPositionModalApp.tsPosition.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsPositionModalApp.tsPosition.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsPositionModalApp.tsPosition.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsPositionService} from "@/views/tms/tspositionEntity/tsPosition/tsPositionService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsPositionListApp = inject('tsPositionListApp', reactive({}));
            const tsPositionModalApp = reactive({id: null, tsPosition: {}, display: false});

            onMounted(() => {
                    tsPositionModalApp.tsPosition = {};
                if (routeId) {
                        tsPositionModalApp.id = routeId;
                } else if (tsPositionListApp.viewModalShowing) {
                        tsPositionModalApp.id = tsPositionListApp.currentId;
                        tsPositionModalApp.display = true;
                }
                if (tsPositionModalApp.id) {
                    getInfo(tsPositionModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsPositionService.findTsPosition(id).then((res) => {
                            tsPositionModalApp.tsPosition = res.data;
                            tsPositionModalApp.title = "查看 " + tsPositionModalApp.tsPosition.name;
                })
            }

            return {
                    tsPositionModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

