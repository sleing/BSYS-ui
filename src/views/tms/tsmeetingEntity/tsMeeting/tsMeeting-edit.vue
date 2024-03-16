
<!-- 会议管理编辑弹窗 -->
<template>
    <div class="ele-body">
        <a-card :title="tsMeetingModalApp.title" :bordered="false">
            <a-form
                    ref="form2"
                    :model="tsMeetingModalApp.tsMeeting"
                    :rules="tsMeetingModalApp.rules"
                    :label-col="{md: {span: 7}, sm: {span: 24}}"
                    :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
                <a-row :gutter="16">
                                                                                                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="会议主题:" name="theme">
                                                                                    <a-input
                                                    v-model:value="tsMeetingModalApp.tsMeeting.theme"
                                                    placeholder="请输入会议主题"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="主办单位:" name="organizationId">
                                                                                    <m-entity-select
                                                                                                    :default-value="tsMeetingModalApp.tsMeeting.organizationName"
                                                    v-model:value="tsMeetingModalApp.tsMeeting.organizationId"
                                                    placeholder="请选择主办单位"
                                                    module="tsmeetingEntity"
                                                    entity="TsDepartment"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="协办单位:" name="viceOrganizationId">
                                                                                    <m-entity-select
                                                                                                    :default-value="tsMeetingModalApp.tsMeeting.viceOrganizationName"
                                                    v-model:value="tsMeetingModalApp.tsMeeting.viceOrganizationId"
                                                    placeholder="请选择协办单位"
                                                    module="tsmeetingEntity"
                                                    entity="TsDepartment"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="会议时间:" name="meetingDate">
                                                                                    <a-date-picker
                                                    v-model:value="tsMeetingModalApp.tsMeeting.meetingDate"
                                                    placeholder="请选择会议时间"
                                                    value-format="YYYY-MM-DD H:m:s"
                                                    class="ele-fluid"/>
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="参会人员:" name="conferee">
                                                                                    <a-input
                                                    v-model:value="tsMeetingModalApp.tsMeeting.conferee"
                                                    placeholder="请输入参会人员"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="会议记录:" name="meetingRecord">
                                                                                    <a-input
                                                    v-model:value="tsMeetingModalApp.tsMeeting.meetingRecord"
                                                    placeholder="请输入会议记录"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="会议方式:" name="meetingMode">
                                                                                    <m-dict-select
                                                    v-model:value="tsMeetingModalApp.tsMeeting.meetingMode"
                                                    placeholder="请选择会议方式"
                                                    dict="会议方式"/>
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="会议地址:" name="meetingAddress">
                                                                                    <a-input
                                                    v-model:value="tsMeetingModalApp.tsMeeting.meetingAddress"
                                                    placeholder="请输入会议地址"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                                                                                                                        
                    <a-col :md="12" :sm="24" :xs="24">
                        <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                            <!--class="ele-pull-right"-->
                            <div v-if="tsMeetingModalApp.display">
                                <teleport to="#tsMeetingEditModalFooter">
                                    <div>
                                        <a-space size="middle">
                                            <a-button @click="tsMeetingListApp.editModalShowing=false">取消
                                            </a-button>
                                            <a-button
                                                    type="primary"
                                                    @click="onSubmit(tsMeetingModalApp.tsMeeting)"
                                                    :loading="loading">提交
                                            </a-button>
                                            <!--<a-button v-if="!eid"
                                                      type="dashed"
                                                      @click="continueSubmit"
                                                      :loading="loading">继续提交
                                            </a-button>-->
                                        </a-space>
                                    </div>
                                </teleport>
                            </div>
                            <div v-if="!tsMeetingModalApp.display">
                                <a-space size="middle">
                                    <a-button @click="onBack()">返回列表</a-button>
                                    <a-button
                                            type="primary"
                                            @click="onSubmit(tsMeetingModalApp.tsMeeting)"
                                            :loading="loading">提交
                                    </a-button>
                                    <!--<a-button v-if="!eid"
                                              type="dashed"
                                              @click="continueSubmit"
                                              :loading="loading">继续提交
                                    </a-button>-->
                                </a-space>
                            </div>

                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>

    </div>

</template>

<script>
    import {defineComponent, inject, reactive, onMounted} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import {TsMeetingService} from "@/views/tms/tsmeetingEntity/tsMeeting/tsMeetingService";
    import {VXETable} from 'vxe-table'
    import {useStore} from "vuex";
    import regions from 'ele-admin-pro/packages/regions.js';

                                                                                                                                                                                                                                                                                                                                                                
                        import MDictSelect from "@/components/MDict/dictSelect";
                                                import MEntitySelect from "@/components/MEntity/entitySelect";
        
    export default defineComponent({
        components: {
                                                                MDictSelect,
                                                    MEntitySelect,
                    },
        setup() {
            // 省市区数据
            const cityData = regions
            const route = useRoute();
            const router = useRouter();
            const store = useStore();
            let routeId = route.params.id;
            let tsMeetingListApp = inject('tsMeetingListApp', reactive({}));
            const tsMeetingModalApp = reactive({
                id: null,
                    tsMeeting: {},
                isEdit: false,
                display: false
            });
                tsMeetingModalApp.rules = {
                                                                                                                                                                            theme: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入会议主题',
                                trigger: 'blur'
                            }
                        ],
                                                                                    organizationId: [
                                                                                                                {
                            required:  false ,
                                type: 'number',
                                message: '请输入主办单位',
                                trigger: 'blur'
                            }
                        ],
                                                                                    organizationName: [
                                                                                    {
                            required:  false ,
                                type: 'string',
                                message: '请输入主办单位',
                                trigger: 'blur'
                            }
                        ],
                                                                                    viceOrganizationId: [
                                                                                                                {
                            required:  false ,
                                type: 'number',
                                message: '请输入协办单位',
                                trigger: 'blur'
                            }
                        ],
                                                                                    viceOrganizationName: [
                                                                                    {
                            required:  false ,
                                type: 'string',
                                message: '请输入协办单位',
                                trigger: 'blur'
                            }
                        ],
                                                                                    meetingDate: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入会议时间',
                                trigger: 'blur'
                            }
                        ],
                                                                                    conferee: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入参会人员',
                                trigger: 'blur'
                            }
                        ],
                                                                                    meetingRecord: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入会议记录',
                                trigger: 'blur'
                            }
                        ],
                                                                                    meetingMode: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入会议方式',
                                trigger: 'blur'
                            }
                        ],
                                                                                    meetingAddress: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入会议地址',
                                trigger: 'blur'
                            }
                        ],
                                                                                                                                                                                                }

            onMounted(() => {
                //清理数据
                    tsMeetingModalApp.tsMeeting = reactive({});
                if (routeId) {//路由
                        tsMeetingModalApp.id = routeId;
                        tsMeetingModalApp.display = false;
                    findTsMeeting(tsMeetingModalApp.id);
                } else if (tsMeetingListApp.editModalForEdit) {//修改弹窗
                        tsMeetingModalApp.id = tsMeetingListApp.currentId;
                        tsMeetingModalApp.display = true;
                } else if (!tsMeetingListApp.editModalForEdit && tsMeetingListApp.addModalForEdit) {//新增弹窗
                        tsMeetingModalApp.display = true;
                } else {
                        tsMeetingModalApp.title = "新增学生";
                }
                if (tsMeetingModalApp.id) findTsMeeting(tsMeetingModalApp.id);
            })

            const findTsMeeting = (id) => {
                    TsMeetingService.findTsMeetingForView(id).then((res) => {
                        tsMeetingModalApp.tsMeeting = res.data;
                    //TODO:为编辑准备.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                tsMeetingModalApp.title = "编辑学生 " + tsMeetingModalApp.tsMeeting.name;
                }).catch(error => {
                    VXETable.modal.message({content: `查找学生出错，原因是：${error.message}`, status: 'error'});
                })
            }

            /*TODO:提交 新增&编辑*/
            const onSubmit = (data) => {
                // debugger;
                //当为数组时用逗号连接
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if (data.eid) {
                    //修改
                        TsMeetingService.updateTsMeeting(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                } else {
                    //新增
                        TsMeetingService.saveTsMeeting(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                }
            }

            /*TODO:继续提交*/
            const continueSubmit = () => {
                VXETable.modal.message({content: 'error 提示', status: 'error'});
            }

            /*TODO:返回列表*/
            const onBack = () => {
                router.push(`/tms/tsmeetingEntity/tsMeeting`);
                store.dispatch('user/tabRemove', route.fullPath);

            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            return {
                cityData,
                routeId,
                    tsMeetingListApp,
                    tsMeetingModalApp,
                onSubmit,
                continueSubmit,
                onBack,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

        },
    })
</script>

<style scoped>

</style>
