
<!-- 老师信息管理编辑弹窗 -->
<template>
    <div class="ele-body">
        <a-card :title="tsTeacherInfoModalApp.title" :bordered="false">
            <a-form
                    ref="form2"
                    :model="tsTeacherInfoModalApp.tsTeacherInfo"
                    :rules="tsTeacherInfoModalApp.rules"
                    :label-col="{md: {span: 7}, sm: {span: 24}}"
                    :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
                <a-row :gutter="16">
                                                                                                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="老师工号:" name="teacherId">
                                                                                    <a-input
                                                    v-model:value="tsTeacherInfoModalApp.tsTeacherInfo.teacherId"
                                                    placeholder="请输入老师工号"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="学院:" name="collegeId">
                                                                                    <m-entity-select
                                                                                                    :default-value="tsTeacherInfoModalApp.tsTeacherInfo.collegeName"
                                                    v-model:value="tsTeacherInfoModalApp.tsTeacherInfo.collegeId"
                                                    placeholder="请选择学院"
                                                    module="tsteacherEntity"
                                                    entity="TsCollege"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="邮箱:" name="email">
                                                                                    <a-input
                                                    v-model:value="tsTeacherInfoModalApp.tsTeacherInfo.email"
                                                    placeholder="请输入邮箱"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="职务:" name="positionId">
                                                                                    <m-entity-select
                                                                                                    :default-value="tsTeacherInfoModalApp.tsTeacherInfo.positionName"
                                                    v-model:value="tsTeacherInfoModalApp.tsTeacherInfo.positionId"
                                                    placeholder="请选择职务"
                                                    module="tsteacherEntity"
                                                    entity="TsPosition"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="联系电话:" name="telNumber">
                                                                                    <a-input
                                                    v-model:value="tsTeacherInfoModalApp.tsTeacherInfo.telNumber"
                                                    placeholder="请输入联系电话"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                                                                                                                        
                    <a-col :md="12" :sm="24" :xs="24">
                        <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                            <!--class="ele-pull-right"-->
                            <div v-if="tsTeacherInfoModalApp.display">
                                <teleport to="#tsTeacherInfoEditModalFooter">
                                    <div>
                                        <a-space size="middle">
                                            <a-button @click="tsTeacherInfoListApp.editModalShowing=false">取消
                                            </a-button>
                                            <a-button
                                                    type="primary"
                                                    @click="onSubmit(tsTeacherInfoModalApp.tsTeacherInfo)"
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
                            <div v-if="!tsTeacherInfoModalApp.display">
                                <a-space size="middle">
                                    <a-button @click="onBack()">返回列表</a-button>
                                    <a-button
                                            type="primary"
                                            @click="onSubmit(tsTeacherInfoModalApp.tsTeacherInfo)"
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
    import {TsTeacherInfoService} from "@/views/tms/tsteacherEntity/tsTeacherInfo/tsTeacherInfoService";
    import {VXETable} from 'vxe-table'
    import {useStore} from "vuex";
    import regions from 'ele-admin-pro/packages/regions.js';

                                                                                                                                                                                                                                                                                        
                                                        import MEntitySelect from "@/components/MEntity/entitySelect";
        
    export default defineComponent({
        components: {
                                                                                        MEntitySelect,
                    },
        setup() {
            // 省市区数据
            const cityData = regions
            const route = useRoute();
            const router = useRouter();
            const store = useStore();
            let routeId = route.params.id;
            let tsTeacherInfoListApp = inject('tsTeacherInfoListApp', reactive({}));
            const tsTeacherInfoModalApp = reactive({
                id: null,
                    tsTeacherInfo: {},
                isEdit: false,
                display: false
            });
                tsTeacherInfoModalApp.rules = {
                                                                                                                                                                            teacherId: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入老师工号',
                                trigger: 'blur'
                            }
                        ],
                                                                                    collegeName: [
                                                                                    {
                            required:  false ,
                                type: 'string',
                                message: '请输入学院',
                                trigger: 'blur'
                            }
                        ],
                                                                                    collegeId: [
                                                                                                                {
                            required:  false ,
                                type: 'number',
                                message: '请输入学院',
                                trigger: 'blur'
                            }
                        ],
                                                                                    email: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入邮箱',
                                trigger: 'blur'
                            }
                        ],
                                                                                    positionName: [
                                                                                    {
                            required:  false ,
                                type: 'string',
                                message: '请输入职务',
                                trigger: 'blur'
                            }
                        ],
                                                                                    positionId: [
                                                                                                                {
                            required:  false ,
                                type: 'number',
                                message: '请输入职务',
                                trigger: 'blur'
                            }
                        ],
                                                                                    telNumber: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入联系电话',
                                trigger: 'blur'
                            }
                        ],
                                                                                                                                                                                                }

            onMounted(() => {
                //清理数据
                    tsTeacherInfoModalApp.tsTeacherInfo = reactive({});
                if (routeId) {//路由
                        tsTeacherInfoModalApp.id = routeId;
                        tsTeacherInfoModalApp.display = false;
                    findTsTeacherInfo(tsTeacherInfoModalApp.id);
                } else if (tsTeacherInfoListApp.editModalForEdit) {//修改弹窗
                        tsTeacherInfoModalApp.id = tsTeacherInfoListApp.currentId;
                        tsTeacherInfoModalApp.display = true;
                } else if (!tsTeacherInfoListApp.editModalForEdit && tsTeacherInfoListApp.addModalForEdit) {//新增弹窗
                        tsTeacherInfoModalApp.display = true;
                } else {
                        tsTeacherInfoModalApp.title = "新增学生";
                }
                if (tsTeacherInfoModalApp.id) findTsTeacherInfo(tsTeacherInfoModalApp.id);
            })

            const findTsTeacherInfo = (id) => {
                    TsTeacherInfoService.findTsTeacherInfoForView(id).then((res) => {
                        tsTeacherInfoModalApp.tsTeacherInfo = res.data;
                    //TODO:为编辑准备.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            tsTeacherInfoModalApp.title = "编辑学生 " + tsTeacherInfoModalApp.tsTeacherInfo.name;
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
                        TsTeacherInfoService.updateTsTeacherInfo(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                } else {
                    //新增
                        TsTeacherInfoService.saveTsTeacherInfo(data).then((res) => {
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
                router.push(`/tms/tsteacherEntity/tsTeacherInfo`);
                store.dispatch('user/tabRemove', route.fullPath);

            }
                                                                                                                                                                                                                                                                                                                                                                        return {
                cityData,
                routeId,
                    tsTeacherInfoListApp,
                    tsTeacherInfoModalApp,
                onSubmit,
                continueSubmit,
                onBack,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

        },
    })
</script>

<style scoped>

</style>
