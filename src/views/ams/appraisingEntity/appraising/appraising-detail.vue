<!-- 评优评先登记详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="appraisingModalApp.appraising"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="appraisingModalApp.title" bordered>

      <a-descriptions-item label="名称">
        {{ appraisingModalApp.appraising.name }}
      </a-descriptions-item>
      <a-descriptions-item label="申报人学号">
        {{ appraisingModalApp.appraising.creatorName }}
      </a-descriptions-item>
      <a-descriptions-item label="性别">
        {{ appraisingModalApp.appraising.sex }}
      </a-descriptions-item>
      <a-descriptions-item label="申报人专业">
        {{ appraisingModalApp.appraising.major }}
      </a-descriptions-item>
      <a-descriptions-item label="申报人年级">
        {{ appraisingModalApp.appraising.grade }}
      </a-descriptions-item>
      <a-descriptions-item label="辅导员">
        {{ appraisingModalApp.appraising.instructor }}
      </a-descriptions-item>
      <a-descriptions-item label="民族">
        {{ appraisingModalApp.appraising.nation }}
      </a-descriptions-item>
      <a-descriptions-item label="政治面貌">
        {{ appraisingModalApp.appraising.political }}
      </a-descriptions-item>
      <a-descriptions-item label="担任的职务">
        {{ appraisingModalApp.appraising.job }}
      </a-descriptions-item>
      <a-descriptions-item label="第一学期平均成绩排名">
        {{ appraisingModalApp.appraising.firstAverageScore }}
      </a-descriptions-item>
      <a-descriptions-item label="第一学期平均成绩排名">
        {{ appraisingModalApp.appraising.secondAverageScore }}
      </a-descriptions-item>
      <a-descriptions-item label="第一学期奖学金排名">
        {{ appraisingModalApp.appraising.fristScholarshipRanking }}
      </a-descriptions-item>
      <a-descriptions-item label="第二学期奖学金排名">
        {{ appraisingModalApp.appraising.secondScholarshipRanking }}
      </a-descriptions-item>
      <a-descriptions-item label="英语成绩">
        {{ appraisingModalApp.appraising.englishScore }}
      </a-descriptions-item>
      <a-descriptions-item label="计算机成绩">
        {{ appraisingModalApp.appraising.computerScore }}
      </a-descriptions-item>
      <a-descriptions-item label="体育成绩">
        {{ appraisingModalApp.appraising.firstSportsScore }}
      </a-descriptions-item>
      <a-descriptions-item label="体育成绩">
        {{ appraisingModalApp.appraising.secondSportsScore }}
      </a-descriptions-item>
      <a-descriptions-item label="有无校级以上处分">
        {{ appraisingModalApp.appraising.schoolPunishment }}
      </a-descriptions-item>
      <a-descriptions-item label="有无违纪处分">
        {{ appraisingModalApp.appraising.punishment }}
      </a-descriptions-item>
      <a-descriptions-item label="不及格科目数(全学年)">
        {{ appraisingModalApp.appraising.failedSubjects }}
      </a-descriptions-item>
      <a-descriptions-item label="是否曾是文明寝室成员">
        {{ appraisingModalApp.appraising.isCivilizedDormitory }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖情况">
        {{ appraisingModalApp.appraising.award }}
      </a-descriptions-item>
      <a-descriptions-item label="主要突出事迹">
        {{ appraisingModalApp.appraising.deeds }}
      </a-descriptions-item>
      <a-descriptions-item label="学院负责人">
        {{ appraisingModalApp.appraising.collegeOpinion }}
      </a-descriptions-item>
      <a-descriptions-item label="学校负责人">
        {{ appraisingModalApp.appraising.schoolOpinion }}
      </a-descriptions-item>
      <a-descriptions-item label="证明材料">
        {{ appraisingModalApp.appraising.prove }}
      </a-descriptions-item>
      <a-descriptions-item label="分数1">
        {{ appraisingModalApp.appraising.mark1 }}
      </a-descriptions-item>
      <a-descriptions-item label="分数2">
        {{ appraisingModalApp.appraising.mark2 }}
      </a-descriptions-item>
      <a-descriptions-item label="评选排名">
        {{ appraisingModalApp.appraising.ranking }}
      </a-descriptions-item>
      <a-descriptions-item label="日期">
        {{ appraisingModalApp.appraising.date }}
      </a-descriptions-item>
      <a-descriptions-item label="申报项目名称">
        {{ appraisingModalApp.appraising.targetNameId }}
      </a-descriptions-item>
      <a-descriptions-item label="审核状态">
        {{ appraisingModalApp.appraising.auditStatus }}
      </a-descriptions-item>
      <a-descriptions-item label="审核人">
        {{ appraisingModalApp.appraising.reviewerId }}
      </a-descriptions-item>
      <a-descriptions-item label="审核意见">
        {{ appraisingModalApp.appraising.feedBack }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ appraisingModalApp.appraising.status }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人ID">
        {{ appraisingModalApp.appraising.creatorId }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ appraisingModalApp.appraising.remark }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ appraisingModalApp.appraising.createDatetime }}
      </a-descriptions-item>
    </a-descriptions>
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {AppraisingService} from "@/views/ams/appraisingEntity/appraising/appraisingService";

export default defineComponent({
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let appraisingListApp = inject('appraisingListApp', reactive({}));
    const appraisingModalApp = reactive({id: null, appraising: {}, display: false});

    onMounted(() => {
      appraisingModalApp.appraising = {};
      if (routeId) {
        appraisingModalApp.id = routeId;
      } else if (appraisingListApp.viewModalShowing) {
        appraisingModalApp.id = appraisingListApp.currentId;
        appraisingModalApp.display = true;
      }
      if (appraisingModalApp.id) {
        getInfo(appraisingModalApp.id);
      }
    })

    const getInfo = (id) => {
      AppraisingService.findAppraising(id).then((res) => {
        appraisingModalApp.appraising = res.data;
        appraisingModalApp.title = "查看 " + appraisingModalApp.appraising.name;
      })
    }

    return {
      appraisingModalApp,
      routeId,
      getInfo,
    }
  }
})
</script>

<style scoped>
</style>

