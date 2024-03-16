<!-- 获奖学生信息详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="awardeeModalApp.awardee"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="awardeeModalApp.title" bordered>
      <a-descriptions-item label="获奖人">
        {{ awardeeModalApp.awardee.studentName }}
      </a-descriptions-item>
      <a-descriptions-item label="学生学号">
        {{ awardeeModalApp.awardee.studentId }}
      </a-descriptions-item>
      <a-descriptions-item label="学生电话">
        {{ awardeeModalApp.awardee.contactTel }}
      </a-descriptions-item>
      <a-descriptions-item label="学生专业">
        {{ awardeeModalApp.awardee.major }}
      </a-descriptions-item>
      <a-descriptions-item label="学生班级">
        {{ awardeeModalApp.awardee.classGrade }}
      </a-descriptions-item>
      <a-descriptions-item label="学生邮箱">
        {{ awardeeModalApp.awardee.email }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖级别">
        {{ awardeeModalApp.awardGrade }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖类别">
        {{ awardeeModalApp.awardee.awardName }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ awardeeModalApp.awardee.remark }}
      </a-descriptions-item>
      <a-descriptions-item label="获奖时间">
        {{ awardeeModalApp.awardee.awardDate }}
      </a-descriptions-item>
<!--      <a-descriptions-item label="奖状、资源包" :span="2">-->
<!--        <m-attachment-->
<!--          :associate-form-id="awardeeListApp.currentId"-->
<!--          associate-form-name="award"-->
<!--          operator-type="view"-->
<!--        />-->
<!--      </a-descriptions-item>-->
      <a-descriptions-item label="状态">
        {{ awardeeModalApp.awardee.status }}
      </a-descriptions-item>
    </a-descriptions>
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {AwardeeService} from "@/views/ams/awardeeEntity/awardee/awardeeService";
import {AwardService} from "@/views/ams/awardEntity/award/awardService";
// import MAttachment from "@/components/MFileUpload/attachment";


const VXETable = require("vxe-table");

export default defineComponent({
  // components: {
  //   MAttachment,
  // },
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let awardeeListApp = inject('awardeeListApp', reactive({}));
    const awardeeModalApp = reactive({id: null,
      awardee: {},
      display: false,
      awardGrade: [],
    });

    onMounted(() => {
      awardeeModalApp.awardee = {};
      if (routeId) {
        awardeeModalApp.id = routeId;
      } else if (awardeeListApp.viewModalShowing) {
        awardeeModalApp.id = awardeeListApp.currentId;
        awardeeModalApp.display = true;
      }
      if (awardeeModalApp.id) {
        getInfo(awardeeModalApp.id);
      }
    })

    const getInfo = (id) => {
      AwardeeService.findAwardee(id).then((res) => {
        awardeeModalApp.awardee = res.data;
        getStudentInfo(awardeeModalApp.awardee.studentId)
        getCompetition(awardeeModalApp.awardee.awardId)
      })
    }

    //获取学生信息
    const getStudentInfo = (Id) => {
      // eslint-disable-next-line no-unused-vars
      AwardService.findStudentInfoById(Id).then((res1) => {
        awardeeModalApp.awardee.studentName = res1.data[0].name;
        awardeeModalApp.awardee.contactTel = res1.data[0].contactTel;
        awardeeModalApp.awardee.major = res1.data[0].major;
        awardeeModalApp.awardee.email = res1.data[0].email;
        awardeeModalApp.awardee.classGrade = res1.data[0].classGrade;
        awardeeModalApp.title = "查看"+awardeeModalApp.awardee.studentName+"的获奖信息";
      })
    }

    //获取竞赛信息

    const getCompetition = (Id) => {
      debugger
      // eslint-disable-next-line no-unused-vars
      AwardService.findAward(Id).then((res1) => {
        awardeeModalApp.awardGrade = res1.data.awardLevel+" / "+res1.data.awardGrade;
        awardeeModalApp.awardee.awardName = res1.data.competitionCategory+" / "+res1.data.competitionLevel;
        awardeeModalApp.awardee.awardDate = res1.data.awardDate.substring(0,10);
      }).catch(error=>{
        VXETable.modal.message({content: `加载数据出错，原因是：${error.message}`, status: 'error'});
      })
    }

    return {
      awardeeListApp,
      awardeeModalApp,
      routeId,
      getInfo,
      getStudentInfo,
      getCompetition
    }
  }
})
</script>

<style scoped>
</style>

