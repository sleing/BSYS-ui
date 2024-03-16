<!-- 学生处评优评先类别信息详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="appraisingTypeModalApp.appraisingType"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="appraisingTypeModalApp.title" bordered>
      <a-descriptions-item label="标识">
        {{ appraisingTypeModalApp.appraisingType.Eid }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人">
        {{ appraisingTypeModalApp.appraisingType.creatorName }}
      </a-descriptions-item>
      <a-descriptions-item label="名称">
        {{ appraisingTypeModalApp.appraisingType.name }}
      </a-descriptions-item>
      <a-descriptions-item label="介绍">
        {{ appraisingTypeModalApp.appraisingType.introduction }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ appraisingTypeModalApp.appraisingType.status }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人ID">
        {{ appraisingTypeModalApp.appraisingType.creatorId }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ appraisingTypeModalApp.appraisingType.remark }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ appraisingTypeModalApp.appraisingType.createDatetime }}
      </a-descriptions-item>
    </a-descriptions>
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {AppraisingTypeService} from "@/views/ams/appraisingTypeEntity/appraisingType/appraisingTypeService";

export default defineComponent({
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let appraisingTypeListApp = inject('appraisingTypeListApp', reactive({}));
    const appraisingTypeModalApp = reactive({id: null, appraisingType: {}, display: false});

    onMounted(() => {
      appraisingTypeModalApp.appraisingType = {};
      if (routeId) {
        appraisingTypeModalApp.id = routeId;
      } else if (appraisingTypeListApp.viewModalShowing) {
        appraisingTypeModalApp.id = appraisingTypeListApp.currentId;
        appraisingTypeModalApp.display = true;
      }
      if (appraisingTypeModalApp.id) {
        getInfo(appraisingTypeModalApp.id);
      }
    })

    const getInfo = (id) => {
      AppraisingTypeService.findAppraisingType(id).then((res) => {
        appraisingTypeModalApp.appraisingType = res.data;
        appraisingTypeModalApp.title = "查看 " + appraisingTypeModalApp.appraisingType.name;
      })
    }

    return {
      appraisingTypeModalApp,
      routeId,
      getInfo,
    }
  }
})
</script>

<style scoped>
</style>

