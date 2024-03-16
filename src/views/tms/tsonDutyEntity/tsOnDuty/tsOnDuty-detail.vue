<!-- 值班管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsOnDutyModalApp.tsOnDuty"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsOnDutyModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsOnDutyModalApp.tsOnDuty.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsOnDutyModalApp.tsOnDuty.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsOnDutyModalApp.tsOnDuty.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="值班时间">
                        {{ tsOnDutyModalApp.tsOnDuty.onDutyTime }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="值班地点">
                        {{ tsOnDutyModalApp.tsOnDuty.onDutyAddressId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="值班人员">
                        {{ tsOnDutyModalApp.tsOnDuty.onDutyStuId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsOnDutyModalApp.tsOnDuty.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsOnDutyModalApp.tsOnDuty.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsOnDutyModalApp.tsOnDuty.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsOnDutyModalApp.tsOnDuty.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsOnDutyService} from "@/views/tms/tsonDutyEntity/tsOnDuty/tsOnDutyService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsOnDutyListApp = inject('tsOnDutyListApp', reactive({}));
            const tsOnDutyModalApp = reactive({id: null, tsOnDuty: {}, display: false});

            onMounted(() => {
                    tsOnDutyModalApp.tsOnDuty = {};
                if (routeId) {
                        tsOnDutyModalApp.id = routeId;
                } else if (tsOnDutyListApp.viewModalShowing) {
                        tsOnDutyModalApp.id = tsOnDutyListApp.currentId;
                        tsOnDutyModalApp.display = true;
                }
                if (tsOnDutyModalApp.id) {
                    getInfo(tsOnDutyModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsOnDutyService.findTsOnDuty(id).then((res) => {
                            tsOnDutyModalApp.tsOnDuty = res.data;
                            tsOnDutyModalApp.title = "查看 " + tsOnDutyModalApp.tsOnDuty.name;
                })
            }

            return {
                    tsOnDutyModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

