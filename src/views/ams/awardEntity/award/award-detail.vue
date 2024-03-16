<!-- 获奖登记详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="awardModalApp.award"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="awardModalApp.title" bordered>
<!--      <a-descriptions-item label="标识">-->
<!--        {{ awardModalApp.award.Eid }}-->
<!--      </a-descriptions-item>-->
<!--      <a-descriptions-item label="名称">-->
<!--        {{ awardModalApp.award.competitionName }}-->
<!--      </a-descriptions-item>-->
<!--      <a-descriptions-item label="创建人">-->
<!--        {{ awardModalApp.award.creatorName }}-->
<!--      </a-descriptions-item>-->
      <a-descriptions-item label="负责人">
        {{ awardModalApp.award.firstAwardeeName }}
      </a-descriptions-item>
      <a-descriptions-item label="负责人学院">
        {{ awardModalApp.award.collegeName }}
      </a-descriptions-item>
      <a-descriptions-item label="负责人专业">
        {{ awardModalApp.award.major }}
      </a-descriptions-item>
      <a-descriptions-item label="负责人年级">
        {{ awardModalApp.award.grade }}
      </a-descriptions-item>
      <a-descriptions-item label="负责人联系电话">
        {{ awardModalApp.award.contactTel }}
      </a-descriptions-item>
      <a-descriptions-item label="比赛项目名称">
        {{ awardModalApp.award.competitionNameName }}
      </a-descriptions-item>
      <a-descriptions-item label="作品名，参赛队名">
        {{ awardModalApp.award.workName }}
      </a-descriptions-item>
      <a-descriptions-item label="证书编号">
        {{ awardModalApp.award.certificateNo }}
      </a-descriptions-item>
      <a-descriptions-item label="竞赛组别">
        {{ awardModalApp.award.competitionGroup }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖级别">
        {{ awardModalApp.award.awardLevel }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖等级">
        {{ awardModalApp.award.awardGrade }}
      </a-descriptions-item>
      <a-descriptions-item label="类别">
        {{ awardModalApp.award.competitionCategory }}
      </a-descriptions-item>
      <a-descriptions-item label="举办单位等级">
        {{ awardModalApp.award.competitionLevel }}
      </a-descriptions-item>
      <a-descriptions-item label="举办单位">
        {{ awardModalApp.award.organizationName }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖日期">
        {{ awardModalApp.award.awardDate }}
      </a-descriptions-item>
      <a-descriptions-item label="第一指导教师">
        {{ awardModalApp.award.firstInstructorName}}
      </a-descriptions-item>
<!--      <a-descriptions-item label="证明文件">-->
<!--        {{ awardModalApp.award.evidence }}-->
<!--      </a-descriptions-item>-->
      <a-descriptions-item label="所有获奖学生">
        {{ awardModalApp.award.allStudents }}
      </a-descriptions-item>

      <a-descriptions-item label="指导教师">
        {{ awardModalApp.award.allInstructors }}
      </a-descriptions-item>

      <a-descriptions-item label="审核状态">
        {{ awardModalApp.award.auditStatus }}
      </a-descriptions-item>
      <a-descriptions-item label="审核人">
        {{ awardModalApp.award.reviewerName }}
      </a-descriptions-item>
<!--      <a-descriptions-item label="状态">-->
<!--        {{ awardModalApp.award.status }}-->
<!--      </a-descriptions-item>-->
<!--      <a-descriptions-item label="创建人ID">-->
<!--        {{ awardModalApp.award.creatorId }}-->
<!--      </a-descriptions-item>-->
<!--      <a-descriptions-item label="备注">-->
<!--        {{ awardModalApp.award.remark }}-->
<!--      </a-descriptions-item>-->
<!--      <a-descriptions-item label="创建时间">-->
<!--        {{ awardModalApp.award.createDatetime }}-->
<!--      </a-descriptions-item>-->
      <a-descriptions-item label="附件" :span="2">
        <m-attachment
          :associate-form-id="awardListApp.currentId"
          associate-form-name="award"
          operator-type="view"
        />
        <my-attachment
          :associate-form-id="awardListApp.currentId"
          associate-form-name="award"
          operator-type="view"
        />
      </a-descriptions-item>

      <a-descriptions-item label="驳回意见" style="color: red">
        {{ awardModalApp.award.remark }}
      </a-descriptions-item>
    </a-descriptions>

<!--    <a-card :bordered="false" title="审核不通过的原因如下" v-if="awardModalApp.award.auditStatus == '驳回'">-->
<!--      &lt;!&ndash; 按钮 &ndash;&gt;-->
<!--&lt;!&ndash;      &lt;!&ndash; 编辑器 &ndash;&gt;-->
<!--      <tinymce-editor-->
<!--        v-model:value="awardModalApp.award.remark"-->
<!--        :init="{height: 300}"-->
<!--        disabled="true"/>&ndash;&gt;-->

<!--    </a-card>-->
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {AwardService} from "@/views/ams/awardEntity/award/awardService";
import MAttachment from "@/components/MFileUpload/attachment";


export default defineComponent({
  components: {
    MAttachment,
  },
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let awardListApp = inject('awardListApp', reactive({}));
    const awardModalApp = reactive({id: null, award: {}, display: false});


    onMounted(() => {

      awardModalApp.award = {};
      if (routeId) {
        awardModalApp.id = routeId;
      } else if (awardListApp.viewModalShowing) {
        awardModalApp.id = awardListApp.currentId;
        awardModalApp.display = true;
      }
      if (awardModalApp.id) {
        getInfo(awardModalApp.id);
      }
    })

    const getInfo = (id) => {
      AwardService.findAward(id).then((res) => {
        awardModalApp.award = res.data;
        console.log("文件类型："+MAttachment.data().fileType);
        awardModalApp.title = "查看 " + awardModalApp.award.name;
      })
    }

    return {
      awardListApp,
      awardModalApp,
      routeId,
      getInfo,
    }
  }
})
</script>

<style scoped>
</style>

