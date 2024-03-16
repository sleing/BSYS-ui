
<!-- 指导教师信息编辑弹窗 -->
<template>
    <div class="ele-body">
        <a-card :title="instructorModalApp.title" :bordered="false">
            <a-form
                    ref="form2"
                    :model="instructorModalApp.instructor"
                    :rules="instructorModalApp.rules"
                    :label-col="{md: {span: 7}, sm: {span: 24}}"
                    :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
                <a-row :gutter="16">

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="序号:" name="displayIndex">
                                                                                    <a-input-number
                                                    v-model:value="instructorModalApp.instructor.displayIndex"
                                                    placeholder="请输入序号"
                                                    :min="0"
                                                    :step="1"
                                                    class="ele-fluid"
                                            ></a-input-number>
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="教师实体:" name="teacherId">
                                                                                    <m-entity-select
                                                                                                    :default-value="instructorModalApp.instructor.teacherName"
                                                    v-model:value="instructorModalApp.instructor.teacherId"
                                                    placeholder="请选择教师实体"
                                                    module="instructorEntity"
                                                    entity="TeacherInfo"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="获奖信息:" name="awardId">
                                                                                    <m-entity-select
                                                                                                    :default-value="instructorModalApp.instructor.awardName"
                                                    v-model:value="instructorModalApp.instructor.awardId"
                                                    placeholder="请选择获奖信息"
                                                    module="instructorEntity"
                                                    entity="Award"
                                                    class="ele-fluid"
                                            />
                                                                            </a-form-item>
                                </a-col>

                    <a-col :md="12" :sm="24" :xs="24">
                        <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                            <!--class="ele-pull-right"-->
                            <div v-if="instructorModalApp.display">
                                <teleport to="#instructorEditModalFooter">
                                    <div>
                                        <a-space size="middle">
                                            <a-button @click="instructorListApp.editModalShowing=false">取消
                                            </a-button>
                                            <a-button
                                                    type="primary"
                                                    @click="onSubmit(instructorModalApp.instructor)"
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
                            <div v-if="!instructorModalApp.display">
                                <a-space size="middle">
                                    <a-button @click="onBack()">返回列表</a-button>
                                    <a-button
                                            type="primary"
                                            @click="onSubmit(instructorModalApp.instructor)"
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
    import {InstructorService} from "@/views/ams/instructorEntity/instructor/instructorService";
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
            let instructorListApp = inject('instructorListApp', reactive({}));
            const instructorModalApp = reactive({
                id: null,
                    instructor: {},
                isEdit: false,
                display: false
            });
                instructorModalApp.rules = {
                                                                                                                                                                            displayIndex: [
                                                                                                                {
                            required:                                 true ,
                                type: 'number',
                                message: '请输入序号',
                                trigger: 'blur'
                            }
                        ],
                                                                                    teacherName: [
                                                                                    {
                            required:  false ,
                                type: 'string',
                                message: '请输入教师实体',
                                trigger: 'blur'
                            }
                        ],
                                                                                    teacherId: [
                                                                                                                {
                            required:                                 true ,
                                type: 'number',
                                message: '请输入教师实体',
                                trigger: 'blur'
                            }
                        ],
                                                                                    awardId: [
                                                                                                                {
                            required:                                 true ,
                                type: 'number',
                                message: '请输入获奖信息',
                                trigger: 'blur'
                            }
                        ],
                                                                                    awardName: [
                                                                                    {
                            required:  false ,
                                type: 'string',
                                message: '请输入获奖信息',
                                trigger: 'blur'
                            }
                        ],
                                                                                                                                                                                                }

            onMounted(() => {
                //清理数据
                    instructorModalApp.instructor = reactive({});
                if (routeId) {//路由
                        instructorModalApp.id = routeId;
                        instructorModalApp.display = false;
                    findInstructor(instructorModalApp.id);
                } else if (instructorListApp.editModalForEdit) {//修改弹窗
                        instructorModalApp.id = instructorListApp.currentId;
                        instructorModalApp.display = true;
                } else if (!instructorListApp.editModalForEdit && instructorListApp.addModalForEdit) {//新增弹窗
                        instructorModalApp.display = true;
                } else {
                        instructorModalApp.title = "新增学生";
                }
                if (instructorModalApp.id) findInstructor(instructorModalApp.id);
            })

            const findInstructor = (id) => {
                    InstructorService.findInstructorForView(id).then((res) => {
                        instructorModalApp.instructor = res.data;
                    //TODO:为编辑准备.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    instructorModalApp.title = "编辑学生 " + instructorModalApp.instructor.name;
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
                        InstructorService.updateInstructor(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                } else {
                    //新增
                        InstructorService.saveInstructor(data).then((res) => {
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
                router.push(`/ams/instructorEntity/instructor`);
                store.dispatch('user/tabRemove', route.fullPath);

            }
                                                                                                                                                                                                                                                                                                                return {
                cityData,
                routeId,
                    instructorListApp,
                    instructorModalApp,
                onSubmit,
                continueSubmit,
                onBack,
                                                                                                                                                                                                                                                                                                                                                                                                    }

        },
    })
</script>

<style scoped>

</style>
