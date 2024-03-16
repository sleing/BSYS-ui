<!-- 办公地点管理详情弹窗 -->
<template>
            <a-form
                    ref="form3"
                    class="ele-form-detail"
                    :model="tsWorkPlaceModalApp.tsWorkPlace"
                    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
                    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
                <a-descriptions :title="tsWorkPlaceModalApp.title" bordered>
                                    <a-descriptions-item label="标识">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.Eid }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.creatorName }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="名称">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.name }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="办公地点">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.address }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="状态">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.status }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建人ID">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.creatorId }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="备注">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.remark }}
                    </a-descriptions-item>
                                    <a-descriptions-item label="创建时间">
                        {{ tsWorkPlaceModalApp.tsWorkPlace.createDatetime }}
                    </a-descriptions-item>
                                </a-descriptions>
            </a-form>
</template>

<script>
    import {defineComponent, reactive, onMounted, inject} from "vue";
    import {useRoute} from "vue-router"
    import {TsWorkPlaceService} from "@/views/tms/tsworklaceEntity/tsWorkPlace/tsWorkPlaceService";

    export default defineComponent({
        setup() {
            const route = useRoute();
            let routeId = route.params.id;
            let tsWorkPlaceListApp = inject('tsWorkPlaceListApp', reactive({}));
            const tsWorkPlaceModalApp = reactive({id: null, tsWorkPlace: {}, display: false});

            onMounted(() => {
                    tsWorkPlaceModalApp.tsWorkPlace = {};
                if (routeId) {
                        tsWorkPlaceModalApp.id = routeId;
                } else if (tsWorkPlaceListApp.viewModalShowing) {
                        tsWorkPlaceModalApp.id = tsWorkPlaceListApp.currentId;
                        tsWorkPlaceModalApp.display = true;
                }
                if (tsWorkPlaceModalApp.id) {
                    getInfo(tsWorkPlaceModalApp.id);
                }
            })

            const getInfo = (id) => {
                    TsWorkPlaceService.findTsWorkPlace(id).then((res) => {
                            tsWorkPlaceModalApp.tsWorkPlace = res.data;
                            tsWorkPlaceModalApp.title = "查看 " + tsWorkPlaceModalApp.tsWorkPlace.name;
                })
            }

            return {
                    tsWorkPlaceModalApp,
                routeId,
                getInfo,
            }
        }
    })
</script>

<style scoped>
</style>

