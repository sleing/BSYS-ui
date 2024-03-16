
<!-- 院系信息编辑弹窗 -->
<template>
    <div class="ele-body">
        <a-card :title="tsCollegeModalApp.title" :bordered="false">
            <a-form
                    ref="form2"
                    :model="tsCollegeModalApp.tsCollege"
                    :rules="tsCollegeModalApp.rules"
                    :label-col="{md: {span: 7}, sm: {span: 24}}"
                    :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
                <a-row :gutter="16">
                                                                                                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="备注:" name="tsRemark">
                                                                                    <a-input
                                                    v-model:value="tsCollegeModalApp.tsCollege.tsRemark"
                                                    placeholder="请输入备注"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                                                                                                                        
                    <a-col :md="12" :sm="24" :xs="24">
                        <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                            <!--class="ele-pull-right"-->
                            <div v-if="tsCollegeModalApp.display">
                                <teleport to="#tsCollegeEditModalFooter">
                                    <div>
                                        <a-space size="middle">
                                            <a-button @click="tsCollegeListApp.editModalShowing=false">取消
                                            </a-button>
                                            <a-button
                                                    type="primary"
                                                    @click="onSubmit(tsCollegeModalApp.tsCollege)"
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
                            <div v-if="!tsCollegeModalApp.display">
                                <a-space size="middle">
                                    <a-button @click="onBack()">返回列表</a-button>
                                    <a-button
                                            type="primary"
                                            @click="onSubmit(tsCollegeModalApp.tsCollege)"
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
    import {TsCollegeService} from "@/views/tms/tsCollegeEntity/tsCollege/tsCollegeService";
    import {VXETable} from 'vxe-table'
    import {useStore} from "vuex";
    import regions from 'ele-admin-pro/packages/regions.js';

                                                                                                                                                                                
                                                
    export default defineComponent({
        components: {
                                                                                },
        setup() {
            // 省市区数据
            const cityData = regions
            const route = useRoute();
            const router = useRouter();
            const store = useStore();
            let routeId = route.params.id;
            let tsCollegeListApp = inject('tsCollegeListApp', reactive({}));
            const tsCollegeModalApp = reactive({
                id: null,
                    tsCollege: {},
                isEdit: false,
                display: false
            });
                tsCollegeModalApp.rules = {
                                                                                                                                                                            tsRemark: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入备注',
                                trigger: 'blur'
                            }
                        ],
                                                                                                                                                                                                }

            onMounted(() => {
                //清理数据
                    tsCollegeModalApp.tsCollege = reactive({});
                if (routeId) {//路由
                        tsCollegeModalApp.id = routeId;
                        tsCollegeModalApp.display = false;
                    findTsCollege(tsCollegeModalApp.id);
                } else if (tsCollegeListApp.editModalForEdit) {//修改弹窗
                        tsCollegeModalApp.id = tsCollegeListApp.currentId;
                        tsCollegeModalApp.display = true;
                } else if (!tsCollegeListApp.editModalForEdit && tsCollegeListApp.addModalForEdit) {//新增弹窗
                        tsCollegeModalApp.display = true;
                } else {
                        tsCollegeModalApp.title = "新增学生";
                }
                if (tsCollegeModalApp.id) findTsCollege(tsCollegeModalApp.id);
            })

            const findTsCollege = (id) => {
                    TsCollegeService.findTsCollegeForView(id).then((res) => {
                        tsCollegeModalApp.tsCollege = res.data;
                    //TODO:为编辑准备.
                                                                                                                                                                                                                                                                                                                                                                                                            tsCollegeModalApp.title = "编辑学生 " + tsCollegeModalApp.tsCollege.name;
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
                        TsCollegeService.updateTsCollege(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                } else {
                    //新增
                        TsCollegeService.saveTsCollege(data).then((res) => {
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
                router.push(`/tms/tsCollegeEntity/tsCollege`);
                store.dispatch('user/tabRemove', route.fullPath);

            }
                                                                                                                                                                                                                                                        return {
                cityData,
                routeId,
                    tsCollegeListApp,
                    tsCollegeModalApp,
                onSubmit,
                continueSubmit,
                onBack,
                                                                                                                                                                                                                                                                                                                            }

        },
    })
</script>

<style scoped>

</style>
