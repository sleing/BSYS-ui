<!-- 举办单位信息详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="unitModalApp.unit"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="unitModalApp.title" bordered>
      <a-descriptions-item label="标识">
        {{ unitModalApp.unit.Eid }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人">
        {{ unitModalApp.unit.creatorName }}
      </a-descriptions-item>
      <a-descriptions-item label="名称">
        {{ unitModalApp.unit.name }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ unitModalApp.unit.status }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人ID">
        {{ unitModalApp.unit.creatorId }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ unitModalApp.unit.remark }}
      </a-descriptions-item>
<!--      <a-descriptions-item label="创建时间">-->
<!--        {{ unitModalApp.unit.createDatetime }}-->
<!--      </a-descriptions-item>-->
    </a-descriptions>
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {UnitService} from "@/views/ams/unitEntity/unit/unitService";

export default defineComponent({
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let unitListApp = inject('unitListApp', reactive({}));
    const unitModalApp = reactive({id: null, unit: {}, display: false});

    onMounted(() => {
      unitModalApp.unit = {};
      if (routeId) {
        unitModalApp.id = routeId;
      } else if (unitListApp.viewModalShowing) {
        unitModalApp.id = unitListApp.currentId;
        unitModalApp.display = true;
      }
      if (unitModalApp.id) {
        getInfo(unitModalApp.id);
      }
    })

    const getInfo = (id) => {
      UnitService.findUnit(id).then((res) => {
        unitModalApp.unit = res.data;
        unitModalApp.title = "查看 " + unitModalApp.unit.name;
      })
    }

    return {
      unitModalApp,
      routeId,
      getInfo,
    }
  }
})
</script>

<style scoped>
</style>

