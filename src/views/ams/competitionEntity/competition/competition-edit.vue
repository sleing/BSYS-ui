<!-- 竞赛信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="competitionModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="competitionModalApp.competition"
        :rules="competitionModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="竞赛名称:" name="name">
              <a-input
                v-model:value="competitionModalApp.competition.name"
                placeholder="请输入竞赛名称"
                :maxlength="255"
                allow-clear
                @blur="competitionNameIsOnly"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="获奖级别:" name="awardLevel">
              <m-dict-select
                v-model:value="competitionModalApp.competition.awardLevel"
                placeholder="请选择获奖级别"
                dict="获奖级别"/>
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="主办方:" name="unitsId">
              <m-entity-select
                :default-value="competitionModalApp.competition.unitsName"
                v-model:value="competitionModalApp.competition.unitsId"
                placeholder="请选择主办方"
                module="unitEntity"
                entity="Unit"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="类别:" name="competitionCategory">
              <m-dict-select
                v-model:value="competitionModalApp.competition.competitionCategory"
                placeholder="请选择类别"
                dict="竞赛类别"/>
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="单位级别:" name="competitionLevel">
              <m-dict-select
                v-model:value="competitionModalApp.competition.competitionLevel"
                placeholder="请选择单位级别"
                dict="竞赛级别"/>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="competitionModalApp.display">
                <teleport to="#competitionEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="competitionListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(competitionModalApp.competition)"
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
              <div v-if="!competitionModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(competitionModalApp.competition)"
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
import {CompetitionService} from "@/views/ams/competitionEntity/competition/competitionService";
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
    let competitionListApp = inject('competitionListApp', reactive({}));
    const competitionModalApp = reactive({
      id: null,
      competition: {},
      isEdit: false,
      display: false
    });
    competitionModalApp.rules = {
      name:[
        {
          required: true,
          type: 'string',
          message: '请输入竞赛名称',
          trigger: 'blur'
      }
      ],
      awardLevel: [
        {
          required: false,
          type: 'string',
          message: '请输入竞赛级别',
          trigger: 'blur'
        }
      ],
      unitsId: [
        {
          required: true,
          type: 'number',
          message: '请输入举办单位',
          trigger: 'blur'
        }
      ],
      unitsName: [
        {
          required: true,
          type: 'string',
          message: '请输入举办单位',
          trigger: 'blur'
        }
      ],
      competitionCategory: [
        {
          required: false,
          type: 'string',
          message: '请输入类别',
          trigger: 'blur'
        }
      ],
      competitionLevel: [
        {
          required: false,
          type: 'string',
          message: '请输入单位等级',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      competitionModalApp.competition = reactive({});
      if (routeId) {//路由
        competitionModalApp.id = routeId;
        competitionModalApp.display = false;
        findCompetition(competitionModalApp.id);
      } else if (competitionListApp.editModalForEdit) {//修改弹窗
        competitionModalApp.id = competitionListApp.currentId;
        competitionModalApp.display = true;
      } else if (!competitionListApp.editModalForEdit && competitionListApp.addModalForEdit) {//新增弹窗
        competitionModalApp.display = true;
      } else {
        competitionModalApp.title = "新增学生";
      }
      if (competitionModalApp.id) findCompetition(competitionModalApp.id);
    })

    const findCompetition = (id) => {
      CompetitionService.findCompetitionForView(id).then((res) => {
        competitionModalApp.competition = res.data;
        //TODO:为编辑准备.
        competitionModalApp.title = "编辑学生 " + competitionModalApp.competition.name;
      }).catch(error => {
        VXETable.modal.message({content: `查找学生出错，原因是：${error.message}`, status: 'error'});
      })
    }

    const teamFlags = reactive({
      competitionNameFlag: false
    })
    //检验新增竞赛信息是否重复
    const competitionNameIsOnly = () => {
      if (competitionModalApp.competition.name != null) {
        CompetitionService.getCompetitionEidByName(competitionModalApp.competition.name.trim()).then((res) => {
          if (res.data == true) {
            teamFlags.competitionNameFlag = false;
            VXETable.modal.message({content: `该竞赛可能已经存在`, status: 'error'});
          } else {
            teamFlags.competitionNameFlag = true;
          }
        })
          .catch(error => {
            console.log(error);
            VXETable.modal.message({content: `加载数据出错之竞赛名称，原因是：${error.message}`, status: 'error'});
          })
      }
    }

    /*TODO:提交 新增&编辑*/
    const onSubmit = (data) => {
      // debugger;
      //当为数组时用逗号连接
      if (data.eid) {
        //修改
        if (data.name != undefined && data.unitsId != undefined) {
          CompetitionService.updateCompetition(data).then((res) => {
            console.log(res);
            VXETable.modal.message({content: '操作成功', status: 'success'});
            setTimeout(onBack, 1000);
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        }else {
          VXETable.modal.message({content: `请填写完整且正确的信息`, status: 'error'});
        }

      } else {
        //新增
        if (teamFlags.competitionNameFlag == true && data.name != undefined && data.unitsId != undefined) {
          CompetitionService.saveCompetition(data).then((res) => {
            console.log(res);
            VXETable.modal.message({content: '操作成功', status: 'success'});
            setTimeout(onBack, 1000);
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        }else {
          VXETable.modal.message({content: `请填写完整且正确的信息`, status: 'error'});
        }

      }
    }

    /*TODO:继续提交*/
    const continueSubmit = () => {
      VXETable.modal.message({content: 'error 提示', status: 'error'});
    }

    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/competitionEntity/competition`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      competitionListApp,
      competitionModalApp,
      onSubmit,
      continueSubmit,
      onBack,
      competitionNameIsOnly,
      teamFlags
    }

  },
})
</script>

<style scoped>

</style>
