<!-- 学生处评优评先关联详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="appraisedModalApp.appraised"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="appraisedModalApp.title" bordered>
      <a-descriptions-item label="标识">
        {{ appraisedModalApp.appraised.Eid }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人">
        {{ appraisedModalApp.appraised.creatorName }}
      </a-descriptions-item>
      <a-descriptions-item label="名称">
        {{ appraisedModalApp.appraised.name }}
      </a-descriptions-item>
      <a-descriptions-item label="序号">
        {{ appraisedModalApp.appraised.displayIndex }}
      </a-descriptions-item>
      <a-descriptions-item label="学生">
        {{ appraisedModalApp.appraised.studentId }}
      </a-descriptions-item>
      <a-descriptions-item label="评优信息">
        {{ appraisedModalApp.appraised.appraisingId }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ appraisedModalApp.appraised.status }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人ID">
        {{ appraisedModalApp.appraised.creatorId }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ appraisedModalApp.appraised.remark }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ appraisedModalApp.appraised.createDatetime }}
      </a-descriptions-item>
    </a-descriptions>
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {AppraisedService} from "@/views/ams/appraisedEntity/appraised/appraisedService";

export default defineComponent({
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let appraisedListApp = inject('appraisedListApp', reactive({}));
    const appraisedModalApp = reactive({id: null, appraised: {}, display: false});

    onMounted(() => {
      appraisedModalApp.appraised = {};
      if (routeId) {
        appraisedModalApp.id = routeId;
      } else if (appraisedListApp.viewModalShowing) {
        appraisedModalApp.id = appraisedListApp.currentId;
        appraisedModalApp.display = true;
      }
      if (appraisedModalApp.id) {
        getInfo(appraisedModalApp.id);
      }
    })

    const getInfo = (id) => {
      AppraisedService.findAppraised(id).then((res) => {
        appraisedModalApp.appraised = res.data;
        appraisedModalApp.title = "查看 " + appraisedModalApp.appraised.name;
      })
    }

    return {
      appraisedModalApp,
      routeId,
      getInfo,
    }
  }
})
</script>

<style scoped>
</style>

