
<!-- 团学会学生信息管理编辑弹窗 -->
<template>
    <div class="ele-body">
        <a-card :title="tsStudentInfoModalApp.title" :bordered="false">
            <a-form
                    ref="form2"
                    :model="tsStudentInfoModalApp.tsStudentInfo"
                    :rules="tsStudentInfoModalApp.rules"
                    :label-col="{md: {span: 7}, sm: {span: 24}}"
                    :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
                <a-row :gutter="16">
                                                                                                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="学号:" name="studentId">
                                                                                    <a-input
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.studentId"
                                                    placeholder="请输入学号"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="学院:" name="collegeId">
                                                                                    <m-entity-select
                                                                                                    :default-value="tsStudentInfoModalApp.tsStudentInfo.collegeName"
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.collegeId"
                                                    placeholder="请选择学院"
                                                    module="tsstudentEntity"
                                                    entity="TsCollege"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="专业:" name="major">
                                                                                    <a-input
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.major"
                                                    placeholder="请输入专业"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="年级:" name="grade">
                                                                                    <a-input
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.grade"
                                                    placeholder="请输入年级"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="班级:" name="classGrade">
                                                                                    <a-input
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.classGrade"
                                                    placeholder="请输入班级"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="联系电话:" name="contactTel">
                                                                                    <a-input
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.contactTel"
                                                    placeholder="请输入联系电话"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="联系邮箱:" name="email">
                                                                                    <a-input
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.email"
                                                    placeholder="请输入联系邮箱"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="政治面貌:" name="politics">
                                                                                    <m-dict-select
                                                    v-model:value="tsStudentInfoModalApp.tsStudentInfo.politics"
                                                    placeholder="请选择政治面貌"
                                                    dict="政治面貌"/>
                                                                            </a-form-item>
                                </a-col>
                                                                                                                                                                                                                                                        
                    <a-col :md="12" :sm="24" :xs="24">
                        <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                            <!--class="ele-pull-right"-->
                            <div v-if="tsStudentInfoModalApp.display">
                                <teleport to="#tsStudentInfoEditModalFooter">
                                    <div>
                                        <a-space size="middle">
                                            <a-button @click="tsStudentInfoListApp.editModalShowing=false">取消
                                            </a-button>
                                            <a-button
                                                    type="primary"
                                                    @click="onSubmit(tsStudentInfoModalApp.tsStudentInfo)"
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
                            <div v-if="!tsStudentInfoModalApp.display">
                                <a-space size="middle">
                                    <a-button @click="onBack()">返回列表</a-button>
                                    <a-button
                                            type="primary"
                                            @click="onSubmit(tsStudentInfoModalApp.tsStudentInfo)"
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
    import {TsStudentInfoService} from "@/views/tms/tsstudentEntity/tsStudentInfo/tsStudentInfoService";
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
            let tsStudentInfoListApp = inject('tsStudentInfoListApp', reactive({}));
            const tsStudentInfoModalApp = reactive({
                id: null,
                    tsStudentInfo: {},
                isEdit: false,
                display: false
            });
                tsStudentInfoModalApp.rules = {
                                                                                                                                                                            studentId: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入学号',
                                trigger: 'blur'
                            }
                        ],
                                                                                    collegeId: [
                                                                                                                {
                            required:                                 true ,
                                type: 'number',
                                message: '请输入学院',
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
                                                                                    major: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入专业',
                                trigger: 'blur'
                            }
                        ],
                                                                                    grade: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入年级',
                                trigger: 'blur'
                            }
                        ],
                                                                                    classGrade: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入班级',
                                trigger: 'blur'
                            }
                        ],
                                                                                    contactTel: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入联系电话',
                                trigger: 'blur'
                            }
                        ],
                                                                                    email: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入联系邮箱',
                                trigger: 'blur'
                            }
                        ],
                                                                                    politics: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入政治面貌',
                                trigger: 'blur'
                            }
                        ],
                                                                                                                                                                                                }

            onMounted(() => {
                //清理数据
                    tsStudentInfoModalApp.tsStudentInfo = reactive({});
                if (routeId) {//路由
                        tsStudentInfoModalApp.id = routeId;
                        tsStudentInfoModalApp.display = false;
                    findTsStudentInfo(tsStudentInfoModalApp.id);
                } else if (tsStudentInfoListApp.editModalForEdit) {//修改弹窗
                        tsStudentInfoModalApp.id = tsStudentInfoListApp.currentId;
                        tsStudentInfoModalApp.display = true;
                } else if (!tsStudentInfoListApp.editModalForEdit && tsStudentInfoListApp.addModalForEdit) {//新增弹窗
                        tsStudentInfoModalApp.display = true;
                } else {
                        tsStudentInfoModalApp.title = "新增学生";
                }
                if (tsStudentInfoModalApp.id) findTsStudentInfo(tsStudentInfoModalApp.id);
            })

            const findTsStudentInfo = (id) => {
                    TsStudentInfoService.findTsStudentInfoForView(id).then((res) => {
                        tsStudentInfoModalApp.tsStudentInfo = res.data;
                    //TODO:为编辑准备.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                tsStudentInfoModalApp.title = "编辑学生 " + tsStudentInfoModalApp.tsStudentInfo.name;
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
                        TsStudentInfoService.updateTsStudentInfo(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                } else {
                    //新增
                        TsStudentInfoService.saveTsStudentInfo(data).then((res) => {
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
                router.push(`/tms/tsstudentEntity/tsStudentInfo`);
                store.dispatch('user/tabRemove', route.fullPath);

            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            return {
                cityData,
                routeId,
                    tsStudentInfoListApp,
                    tsStudentInfoModalApp,
                onSubmit,
                continueSubmit,
                onBack,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

        },
    })
</script>

<style scoped>

</style>
