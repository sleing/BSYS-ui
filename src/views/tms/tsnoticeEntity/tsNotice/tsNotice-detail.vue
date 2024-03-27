<!-- 通知管理详情弹窗 -->
<template>
  <a-form
    ref="form3"
    class="ele-form-detail"
    :model="tsNoticeModalApp.tsNotice"
    :label-col="{md: {span: 2}, sm: {span: 4}, xs: {span: 6}}"
    :wrapper-col="{md: {span: 22}, sm: {span: 20}, xs: {span: 18}}">
    <a-descriptions :title="tsNoticeModalApp.title" bordered>
      <a-descriptions-item label="标识">
        {{ tsNoticeModalApp.tsNotice.Eid }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人">
        {{ tsNoticeModalApp.tsNotice.creatorName }}
      </a-descriptions-item>
      <a-descriptions-item label="名称">
        {{ tsNoticeModalApp.tsNotice.name }}
      </a-descriptions-item>
      <a-descriptions-item label="通知主题">
        {{ tsNoticeModalApp.tsNotice.title }}
      </a-descriptions-item>
      <a-descriptions-item label="通知时间">
        {{ tsNoticeModalApp.tsNotice.noticeDate }}
      </a-descriptions-item>
      <a-descriptions-item label="通知部门">
        {{ tsNoticeModalApp.tsNotice.noticeDepartmentId }}
      </a-descriptions-item>
<!--      <a-descriptions-item label="通知内容">-->
<!--        {{ tsNoticeModalApp.tsNotice.content }}-->
<!--      </a-descriptions-item>-->
      <a-descriptions-item label="通知内容">
      <TinymceEditor
        disabled="true"
        v-model:value="tsNoticeModalApp.tsNotice.content"/>
      </a-descriptions-item>
      <a-descriptions-item label="审核状态">
        {{ tsNoticeModalApp.tsNotice.auditStatu }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ tsNoticeModalApp.tsNotice.status }}
      </a-descriptions-item>
      <a-descriptions-item label="创建人ID">
        {{ tsNoticeModalApp.tsNotice.creatorId }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ tsNoticeModalApp.tsNotice.remark }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ tsNoticeModalApp.tsNotice.createDatetime }}
      </a-descriptions-item>
      <a-descriptions-item label="附件" :span="2">
        <my-attachment
          :associate-form-id="tsNoticeModalApp.currentId"
          associate-form-name="tsNotice"
          operator-type="view"
        />
      </a-descriptions-item>

    </a-descriptions>
  </a-form>
</template>

<script>
import {defineComponent, reactive, onMounted, inject} from "vue";
import {useRoute} from "vue-router"
import {TsNoticeService} from "@/views/tms/tsnoticeEntity/tsNotice/tsNoticeService";

export default defineComponent({
  setup() {
    const route = useRoute();
    let routeId = route.params.id;
    let tsNoticeListApp = inject('tsNoticeListApp', reactive({}));
    const tsNoticeModalApp = reactive({id: null, tsNotice: {}, display: false});

    onMounted(() => {
      tsNoticeModalApp.tsNotice = {};
      if (routeId) {
        tsNoticeModalApp.id = routeId;
      } else if (tsNoticeListApp.viewModalShowing) {
        tsNoticeModalApp.id = tsNoticeListApp.currentId;
        tsNoticeModalApp.display = true;
      }
      if (tsNoticeModalApp.id) {
        getInfo(tsNoticeModalApp.id);
      }
    })

    const getInfo = (id) => {
      TsNoticeService.findTsNotice(id).then((res) => {
        tsNoticeModalApp.tsNotice = res.data;
        tsNoticeModalApp.title = "查看 " + tsNoticeModalApp.tsNotice.name;
      })
    }

    return {
      tsNoticeModalApp,
      routeId,
      getInfo,
    }
  }
})
</script>

<style scoped>
</style>

