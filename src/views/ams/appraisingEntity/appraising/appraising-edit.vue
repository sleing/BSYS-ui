<!-- 评优评先登记编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="appraisingModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="appraisingModalApp.appraising"
        :rules="appraisingModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="申报项目名称:" name="targetNameId">
              <m-entity-select
                :default-value="appraisingModalApp.appraising.targetNameName"
                v-model:value="appraisingModalApp.appraising.targetNameId"
                placeholder="请选择申报项目名称"
                module="appraisingTypeEntity"
                entity="AppraisingType"
                class="ele-fluid"
                sys="ams"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="申报人:" name="studentId">
              <m-entity-select
                :default-value="appraisingModalApp.appraising.studentName"
                v-model:value="appraisingModalApp.appraising.studentId"
                placeholder="请选择申报人"
                module="studentEntity"
                entity="StudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="性别:" name="sex">
              <m-dict-select
                v-model:value="appraisingModalApp.appraising.sex"
                placeholder="请选择性别"
                dict="性别"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="申报人学院:" name="collegeId">
              <m-entity-select
                :default-value="appraisingModalApp.appraising.collegeName"
                v-model:value="appraisingModalApp.appraising.collegeId"
                placeholder="请选择申报人学院"
                module="collegeEntity"
                entity="College"
                class="ele-fluid"
                sys="ams"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="申报人专业:" name="major">
              <a-input
                v-model:value="appraisingModalApp.appraising.major"
                placeholder="请输入申报人专业"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="申报人年级:" name="grade">
              <a-input
                v-model:value="appraisingModalApp.appraising.grade"
                placeholder="请输入申报人年级"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="辅导员:" name="instructor">
              <a-input
                v-model:value="appraisingModalApp.appraising.instructor"
                placeholder="请输入辅导员"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="民族:" name="nation">
              <a-input
                v-model:value="appraisingModalApp.appraising.nation"
                placeholder="请输入民族"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="政治面貌:" name="political">
              <a-input
                v-model:value="appraisingModalApp.appraising.political"
                placeholder="请输入政治面貌"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="担任的职务:" name="job">
              <a-input
                v-model:value="appraisingModalApp.appraising.job"
                placeholder="请输入担任的职务"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="平均成绩排名:" name="firstAverageScore">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.firstAverageScore"
                placeholder="请输入第一学期平均成绩排名"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="平均成绩排名:" name="secondAverageScore">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.secondAverageScore"
                placeholder="请输入第二学期平均成绩排名"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="奖学金排名:" name="fristScholarshipRanking">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.fristScholarshipRanking"
                placeholder="请输入第一学期奖学金排名"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="奖学金排名:" name="secondScholarshipRanking">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.secondScholarshipRanking"
                placeholder="请输入第二学期奖学金排名"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="英语成绩:" name="englishScore">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.englishScore"
                placeholder="请输入英语成绩"
                :min="0"
                :step="0.01"
                class="ele-fluid importanceI"></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="计算机成绩:" name="computerScore">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.computerScore"
                placeholder="请输入计算机成绩"
                :min="0"
                :step="0.01"
                class="ele-fluid importanceI"></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="体育成绩:" name="firstSportsScore">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.firstSportsScore"
                placeholder="请输入体育成绩"
                :min="0"
                :step="0.01"
                class="ele-fluid importanceI"></a-input-number>
            </a-form-item>
          </a-col>


          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="校级处分:" name="schoolPunishment">
              <m-dict-select
                v-model:value="appraisingModalApp.appraising.schoolPunishment"
                placeholder="请选择有无校级以上处分"
                dict="有无"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="有无违纪处分:" name="punishment">
              <m-dict-select
                v-model:value="appraisingModalApp.appraising.punishment"
                placeholder="请选择有无违纪处分"
                dict="有无"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="不及格科目数:" name="failedSubjects">
              <a-input-number
                v-model:value="appraisingModalApp.appraising.failedSubjects"
                placeholder="请输入不及格科目数(全学年)"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="文明寝室:" name="isCivilizedDormitory">
              <m-dict-select
                v-model:value="appraisingModalApp.appraising.isCivilizedDormitory"
                placeholder="请选择是否曾是文明寝室成员"
                dict="是否"/>
            </a-form-item>
          </a-col>

          <a-span class="span">主要获奖情况:</a-span>
<!--          <a-col :lg="16" :md="12" :sm="24" :xs="24">-->
<!--          </a-col>-->
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-textarea
              v-model:value="appraisingModalApp.appraising.award"
              placeholder="请输入获奖情况"
              :maxlength="455"
              allow-clear
              class="award_detail"
            />
          </a-col>


          <a-span class="span">主要突出事迹:</a-span>
<!--          <a-col :lg="16" :md="12" :sm="24" :xs="24">-->
<!--          </a-col>-->
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-textarea
              v-model:value="appraisingModalApp.appraising.deeds"
              placeholder="请输入主要突出事迹"
              :maxlength="455"
              allow-clear
              class="deeds"
            />
          </a-col>


          <!--          <a-col :lg="16" :md="12" :sm="24" :xs="24">-->
          <!--          </a-col>-->

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="填报日期:" name="date">
              <a-date-picker
                v-model:value="appraisingModalApp.appraising.date"
                placeholder="请选择日期"
                value-format="YYYY-MM-DD H:m:s"
                class="ele-fluid"/>
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
          </a-col>
          <a-p class="span">证明材料</a-p>
          <a-col :lg="24" :md="8" :sm="24" :xs="24">
          </a-col>
          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="奖状或证书:" name="prove">
              <img v-if="appraisingModalApp.isPicture" :src="appraisingModalApp.phone_tip_url" class="avatar"
                   @click="look">
              <a-upload
                name="file"
                :multiple="false"
                :action="uploadUrl"
                :headers="headers"
                :limit="1"
                @change="handleChangeFile"
              >
                <vxe-button status="primary" icon="vxe-icon--plus">{{ appraisingModalApp.phone_tip }}</vxe-button>
              </a-upload>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="上传示例图:">
              <img src="@/assets/myAward.jpg" style="width: 320px;height: 220px;">
            </a-form-item>
          </a-col>


          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="appraisingModalApp.display">
                <teleport to="#appraisingEditModalFooter">
                  <div>
                    <a-space size="small">
                      <a-button @click="appraisingListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(appraisingModalApp.appraising)"
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
              <div v-if="!appraisingModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(appraisingModalApp.appraising)"
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
import {defineComponent, inject, reactive, onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router"
import {AppraisingService} from "@/views/ams/appraisingEntity/appraising/appraisingService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';
import {toRaw} from '@vue/reactivity'
import setting from "@/config/setting";

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
    let appraisingListApp = inject('appraisingListApp', reactive({}));

    const uploadUrl = ref("http://localhost:8081/api/file/upload?token=" + setting.takeToken())

    const appraisingModalApp = reactive({
      id: null,
      appraising: {},
      isEdit: false,
      display: false,
      isPicture: false,
      phone_tip_url: '',
      phone_tip: "上传图片",
    });
    appraisingModalApp.rules = {
      studentName: [
        {
          required: false,
          type: 'string',
          message: '请输入申报人',
          trigger: 'blur'
        }
      ],
      studentId: [
        {
          required: true,
          type: 'number',
          message: '请输入申报人',
          trigger: 'blur'
        }
      ],
      sex: [
        {
          required: true,
          type: 'string',
          message: '请输入性别',
          trigger: 'blur'
        }
      ],
      collegeName: [
        {
          required: false,
          type: 'string',
          message: '请输入申报人学院',
          trigger: 'blur'
        }
      ],
      collegeId: [
        {
          required: true,
          type: 'number',
          message: '请输入申报人学院',
          trigger: 'blur'
        }
      ],
      major: [
        {
          required: true,
          type: 'string',
          message: '请输入申报人专业',
          trigger: 'blur'
        }
      ],
      grade: [
        {
          required: true,
          type: 'string',
          message: '请输入申报人年级',
          trigger: 'blur'
        }
      ],
      instructor: [
        {
          required: true,
          type: 'string',
          message: '请输入辅导员',
          trigger: 'blur'
        }
      ],
      nation: [
        {
          required: true,
          type: 'string',
          message: '请输入民族',
          trigger: 'blur'
        }
      ],
      political: [
        {
          required: true,
          type: 'string',
          message: '请输入政治面貌',
          trigger: 'blur'
        }
      ],
      job: [
        {
          required: false,
          type: 'string',
          message: '请输入担任的职务',
          trigger: 'blur'
        }
      ],
      firstAverageScore: [
        {
          required: false,
          type: 'number',
          message: '请输入第一学期平均成绩排名',
          trigger: 'blur'
        }
      ],
      secondAverageScore: [
        {
          required: false,
          type: 'number',
          message: '请输入第二学期平均成绩排名',
          trigger: 'blur'
        }
      ],
      fristScholarshipRanking: [
        {
          required: false,
          type: 'number',
          message: '请输入第一学期奖学金排名',
          trigger: 'blur'
        }
      ],
      secondScholarshipRanking: [
        {
          required: false,
          type: 'number',
          message: '请输入第二学期奖学金排名',
          trigger: 'blur'
        }
      ],
      englishScore: [
        {
          required: false,
          type: 'number',
          message: '请输入英语成绩',
          trigger: 'blur'
        }
      ],
      computerScore: [
        {
          required: false,
          type: 'number',
          message: '请输入计算机成绩',
          trigger: 'blur'
        }
      ],
      firstSportsScore: [
        {
          required: false,
          type: 'number',
          message: '请输入体育成绩',
          trigger: 'blur'
        }
      ],
      secondSportsScore: [
        {
          required: false,
          type: 'number',
          message: '请输入体育成绩',
          trigger: 'blur'
        }
      ],
      schoolPunishment: [
        {
          required: false,
          type: 'string',
          message: '请输入有无校级以上处分',
          trigger: 'blur'
        }
      ],
      punishment: [
        {
          required: false,
          type: 'string',
          message: '请输入有无违纪处分',
          trigger: 'blur'
        }
      ],
      failedSubjects: [
        {
          required: false,
          type: 'number',
          message: '请输入不及格科目数(全学年)',
          trigger: 'blur'
        }
      ],
      isCivilizedDormitory: [
        {
          required: false,
          type: 'string',
          message: '请输入是否曾是文明寝室成员',
          trigger: 'blur'
        }
      ],
      award: [
        {
          required: false,
          type: 'string',
          message: '请输入获奖情况',
          trigger: 'blur'
        }
      ],
      deeds: [
        {
          required: false,
          type: 'string',
          message: '请输入主要突出事迹',
          trigger: 'blur'
        }
      ],
      collegeOpinion: [
        {
          required: false,
          type: 'string',
          message: '请输入学院负责人',
          trigger: 'blur'
        }
      ],
      schoolOpinion: [
        {
          required: false,
          type: 'string',
          message: '请输入学校负责人',
          trigger: 'blur'
        }
      ],
      prove: [
        {
          required: false,
          type: 'string',
          message: '请输入证明材料',
          trigger: 'blur'
        }
      ],
      mark1: [
        {
          required: false,
          type: 'string',
          message: '请输入分数1',
          trigger: 'blur'
        }
      ],
      mark2: [
        {
          required: false,
          type: 'string',
          message: '请输入分数2',
          trigger: 'blur'
        }
      ],
      ranking: [
        {
          required: false,
          type: 'number',
          message: '请输入评选排名',
          trigger: 'blur'
        }
      ],
      date: [
        {
          required: false,
          type: 'string',
          message: '请输入日期',
          trigger: 'blur'
        }
      ],
      targetNameName: [
        {
          required: false,
          type: 'string',
          message: '请输入申报项目名称',
          trigger: 'blur'
        }
      ],
      targetNameId: [
        {
          required: true,
          type: 'number',
          message: '请输入申报项目名称',
          trigger: 'blur'
        }
      ],
      auditStatus: [
        {
          required: false,
          type: 'string',
          message: '请输入审核状态',
          trigger: 'blur'
        }
      ],
      reviewerId: [
        {
          required: false,
          type: 'number',
          message: '请输入审核人',
          trigger: 'blur'
        }
      ],
      reviewerName: [
        {
          required: false,
          type: 'string',
          message: '请输入审核人',
          trigger: 'blur'
        }
      ],
      feedBack: [
        {
          required: false,
          type: 'string',
          message: '请输入审核意见',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      appraisingModalApp.appraising = reactive({});
      if (routeId) {//路由
        appraisingModalApp.id = routeId;
        appraisingModalApp.display = false;
        findAppraising(appraisingModalApp.id);
      } else if (appraisingListApp.editModalForEdit) {//修改弹窗
        appraisingModalApp.id = appraisingListApp.currentId;
        appraisingModalApp.display = true;
      } else if (!appraisingListApp.editModalForEdit && appraisingListApp.addModalForEdit) {//新增弹窗
        appraisingModalApp.display = true;
      } else {
        appraisingModalApp.title = "新增学生";
      }
      if (appraisingModalApp.id) findAppraising(appraisingModalApp.id);
    })

    const findAppraising = (id) => {
      AppraisingService.findAppraisingForView(id).then((res) => {
        appraisingModalApp.appraising = res.data;
        //TODO:为编辑准备.
        appraisingModalApp.title = "编辑学生 " + appraisingModalApp.appraising.name;
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
        AppraisingService.updateAppraising(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        AppraisingService.saveAppraising(data).then((res) => {
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
      router.push(`/ams/appraisingEntity/appraising`);
      store.dispatch('user/tabRemove', route.fullPath);

    }

    const handleChangeFile = (info) => {
      let list = toRaw(info.fileList);
      if (list.length == 2) {
        list[0] = list[1]
        list.length--;
      }

      if (info.file.status !== 'uploading') {
        console.log("fileList" + info.fileList);
        console.log("List" + list);
        appraisingModalApp.phone_tip_url = info.file.response.location;
      }
      if (info.file.status === 'done') {
        appraisingModalApp.phone_tip = "重新上传图片"
        appraisingModalApp.appraising.prove = appraisingModalApp.phone_tip_url
        appraisingModalApp.isPicture = true
        VXETable.modal.message({content: `${info.file.name} 上传成功`, status: 'success'});
      } else if (info.file.status === 'error') {
        VXETable.modal.message({content: `${info.file.name} 上传失败`, status: 'error'});
      }
    }

    const look = () => {
      //window.location.href=awardModalApp.phone_tip_url;
      window.open(appraisingModalApp.phone_tip_url);
    }

    return {
      cityData,
      routeId,
      appraisingListApp,
      appraisingModalApp,
      onSubmit,
      continueSubmit,
      onBack,
      handleChangeFile,
      headers: {
        authorization: 'authorization-text',
      },
      uploadUrl,
      look
    }

  },
})
</script>

<style scoped>
.award_detail {
  height: 130px;
  width: 90%;
  left: 3.5%;
  margin-top: 15px;
}

.deeds {
  height: 130px;
  width: 90%;
  left: 3.5%;
  margin-top: 15px;
}

.span {
  padding-left: 3.8%;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 15px;
}

.avatar {
  width: 200px;
  /*height: 150px;*/
  display: block;
}

</style>
