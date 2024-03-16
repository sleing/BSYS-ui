
<!-- 获奖登记编辑弹窗 -->
<template>
    <div class="ele-body">
        <a-card :title="rewardModalApp.title" :bordered="false">
            <a-form
                    ref="form2"
                    :model="rewardModalApp.reward"
                    :rules="rewardModalApp.rules"
                    :label-col="{md: {span: 7}, sm: {span: 24}}"
                    :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
                <a-row :gutter="16">

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="级别:" name="level">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.level"
                                                    placeholder="请输入级别"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="竞赛名称:" name="title">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.title"
                                                    placeholder="请输入竞赛名称"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="指导教师:" name="instructors">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.instructors"
                                                    placeholder="请输入指导教师"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="证明文件:" name="evidence">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.evidence"
                                                    placeholder="请输入证明文件"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="时间:" name="year">
                                                                                    <a-date-picker
                                                    v-model:value="rewardModalApp.reward.year"
                                                    placeholder="请选择时间"
                                                    value-format="YYYY-MM-DD H:m:s"
                                                    class="ele-fluid"/>
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="举办单位:" name="organization">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.organization"
                                                    placeholder="请输入举办单位"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="获奖学生:" name="allStudents">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.allStudents"
                                                    placeholder="请输入获奖学生"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="审核状态:" name="auditStatus">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.auditStatus"
                                                    placeholder="请输入审核状态"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="作品名称:" name="workName">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.workName"
                                                    placeholder="请输入作品名称"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="获奖电话:" name="tel">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.tel"
                                                    placeholder="请输入获奖电话"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item label="学院:" name="college">
                                                                                    <a-input
                                                    v-model:value="rewardModalApp.reward.college"
                                                    placeholder="请输入学院"
                                                    :maxlength="255"
                                                    allow-clear
                                            />
                                                                            </a-form-item>
                                </a-col>

                    <a-col :md="12" :sm="24" :xs="24">
                        <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                            <!--class="ele-pull-right"-->
                            <div v-if="rewardModalApp.display">
                                <teleport to="#rewardEditModalFooter">
                                    <div>
                                        <a-space size="middle">
                                            <a-button @click="rewardListApp.editModalShowing=false">取消
                                            </a-button>
                                            <a-button
                                                    type="primary"
                                                    @click="onSubmit(rewardModalApp.reward)"
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
                            <div v-if="!rewardModalApp.display">
                                <a-space size="middle">
                                    <a-button @click="onBack()">返回列表</a-button>
                                    <a-button
                                            type="primary"
                                            @click="onSubmit(rewardModalApp.reward)"
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
    import {RewardService} from "@/views/bms/rewardEntity/reward/rewardService";
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
            let rewardListApp = inject('rewardListApp', reactive({}));
            const rewardModalApp = reactive({
                id: null,
                    reward: {},
                isEdit: false,
                display: false
            });
                rewardModalApp.rules = {
                                                                                                                                                                            level: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入级别',
                                trigger: 'blur'
                            }
                        ],
                                                                                    title: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入竞赛名称',
                                trigger: 'blur'
                            }
                        ],
                                                                                    instructors: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入指导教师',
                                trigger: 'blur'
                            }
                        ],
                                                                                    evidence: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入证明文件',
                                trigger: 'blur'
                            }
                        ],
                                                                                    year: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入时间',
                                trigger: 'blur'
                            }
                        ],
                                                                                    organization: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入举办单位',
                                trigger: 'blur'
                            }
                        ],
                                                                                    allStudents: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入获奖学生',
                                trigger: 'blur'
                            }
                        ],
                                                                                    auditStatus: [
                                                                                                                {
                            required:                                 true ,
                                type: 'string',
                                message: '请输入审核状态',
                                trigger: 'blur'
                            }
                        ],
                                                                                    workName: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入作品名称',
                                trigger: 'blur'
                            }
                        ],
                                                                                    tel: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入获奖电话',
                                trigger: 'blur'
                            }
                        ],
                                                                                    college: [
                                                                                                                {
                            required:  false ,
                                type: 'string',
                                message: '请输入学院',
                                trigger: 'blur'
                            }
                        ],
                                                                                                                                                                                                }

            onMounted(() => {
                //清理数据
                    rewardModalApp.reward = reactive({});
                if (routeId) {//路由
                        rewardModalApp.id = routeId;
                        rewardModalApp.display = false;
                    findReward(rewardModalApp.id);
                } else if (rewardListApp.editModalForEdit) {//修改弹窗
                        rewardModalApp.id = rewardListApp.currentId;
                        rewardModalApp.display = true;
                } else if (!rewardListApp.editModalForEdit && rewardListApp.addModalForEdit) {//新增弹窗
                        rewardModalApp.display = true;
                } else {
                        rewardModalApp.title = "新增学生";
                }
                if (rewardModalApp.id) findReward(rewardModalApp.id);
            })

            const findReward = (id) => {
                    RewardService.findRewardForView(id).then((res) => {
                        rewardModalApp.reward = res.data;
                    //TODO:为编辑准备.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    rewardModalApp.title = "编辑学生 " + rewardModalApp.reward.name;
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
                        RewardService.updateReward(data).then((res) => {
                        console.log(res);
                        VXETable.modal.message({content: '操作成功', status: 'success'});
                        setTimeout(onBack, 3000);
                    }).catch(error => {
                        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
                    })
                } else {
                    //新增
                        RewardService.saveReward(data).then((res) => {
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
                router.push(`/bms/rewardEntity/reward`);
                store.dispatch('user/tabRemove', route.fullPath);

            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return {
                cityData,
                routeId,
                    rewardListApp,
                    rewardModalApp,
                onSubmit,
                continueSubmit,
                onBack,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

        },
    })
</script>

<style scoped>

</style>
