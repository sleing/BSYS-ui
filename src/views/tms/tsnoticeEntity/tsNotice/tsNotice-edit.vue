<!-- 通知管理编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="tsNoticeModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="tsNoticeModalApp.tsNotice"
        :rules="tsNoticeModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="通知主题:" name="title">
              <a-input
                v-model:value="tsNoticeModalApp.tsNotice.title"
                placeholder="请输入通知主题"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="通知时间:" name="noticeDate">
              <a-date-picker
                v-model:value="tsNoticeModalApp.tsNotice.noticeDate"
                placeholder="请选择通知时间"
                value-format="YYYY-MM-DD H:m:s"
                class="ele-fluid"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="通知部门:" name="noticeDepartmentId">
              <m-entity-select
                :default-value="tsNoticeModalApp.tsNotice.noticeDepartmentName"
                v-model:value="tsNoticeModalApp.tsNotice.noticeDepartmentId"
                placeholder="请选择通知部门"
                module="tsdepartmentEntity"
                entity="TsDepartment"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

<!--          <a-col :lg="6" :md="12" :sm="24" :xs="24">-->
<!--            <a-form-item label="通知内容:" name="content">-->
<!--              <a-input-->
<!--                v-model:value="tsNoticeModalApp.tsNotice.content"-->
<!--                placeholder="请输入通知内容"-->
<!--                :maxlength="255"-->
<!--                allow-clear-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-form-item label="通知内容:" :label-col="{span:6}" :wrapper-col="{span:18}" style="color: red;">
          <TinymceEditor
            v-model:value="tsNoticeModalApp.tsNotice.content"
          />
          </a-form-item>

          <a-form-item label="通知文件:" :label-col="{span:6}" :wrapper-col="{span:18}" style="color: red;">
            <my-attachment
              :associate-form-id="tsNoticeModalApp.currentId"
              associate-form-name="tsNotice"
              v-on:fileList="fileListFromParentMy"
              :operator-type="operatorType"
              ref="attachment1"
            />
            <a-p class="theTip">仅能上传.7z,.zip,.rar，.pdf,.docx 格式的文件</a-p>
          </a-form-item>

          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="通知类型:" name="status">
              <m-dict-select
                v-model:value="tsNoticeModalApp.tsNotice.status"
                dict="通知类型"
                placeholder="请选择通知类型"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
<!--            <a-form-item label="审核状态:" name="auditStatu">-->
<!--              <m-dict-select-->
<!--                v-model:value="tsNoticeModalApp.tsNotice.auditStatu"-->
<!--                placeholder="请选择审核状态"-->
<!--                dict="审核状态"/>-->
<!--            </a-form-item>-->
            <a-form-item label="审核状态:" name="content">
              <a-input
                v-model:value="tsNoticeModalApp.tsNotice.auditStatu"
                defaultValue="未审核"
                disabled="true"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="tsNoticeModalApp.display">
                <teleport to="#tsNoticeEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="tsNoticeListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(tsNoticeModalApp.tsNotice)"
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
              <div v-if="!tsNoticeModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(tsNoticeModalApp.tsNotice)"
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
import {TsNoticeService} from "@/views/tms/tsnoticeEntity/tsNotice/tsNoticeService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


// import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";
import uploadAttachmentService from "@/components/MFileUpload/attachmentService";
// import MyAttachment from "@/components/MFileUpload/attachment1";

export default defineComponent({
  components: {
    // MDictSelect,
    MEntitySelect,
  },
  setup() {
    // 省市区数据
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    let fileListMy = reactive([]);
    const attachment1 = ref(null);
    const store = useStore();
    let routeId = route.params.id;
    let tsNoticeListApp = inject('tsNoticeListApp', reactive({}));
    const tsNoticeModalApp = reactive({
      id: null,
      tsNotice: {},
      isEdit: false,
      display: false
    });
    tsNoticeModalApp.rules = {
      title: [
        {
          required: true,
          type: 'string',
          message: '请输入通知主题',
          trigger: 'blur'
        }
      ],
      noticeDate: [
        {
          required: false,
          type: 'string',
          message: '请输入通知时间',
          trigger: 'blur'
        }
      ],
      noticeDepartmentName: [
        {
          required: false,
          type: 'string',
          message: '请输入通知部门',
          trigger: 'blur'
        }
      ],
      noticeDepartmentId: [
        {
          required: false,
          type: 'number',
          message: '请输入通知部门',
          trigger: 'blur'
        }
      ],
      content: [
        {
          required: false,
          type: 'string',
          message: '请输入通知内容',
          trigger: 'blur'
        }
      ],
      auditStatu: [
        {
          required: false,
          type: 'string',
          message: '请输入审核状态',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      tsNoticeModalApp.tsNotice = reactive({});
      if (routeId) {//路由
        tsNoticeModalApp.id = routeId;
        tsNoticeModalApp.display = false;
        findTsNotice(tsNoticeModalApp.id);
      } else if (tsNoticeListApp.editModalForEdit) {//修改弹窗
        tsNoticeModalApp.id = tsNoticeListApp.currentId;
        tsNoticeModalApp.display = true;
      } else if (!tsNoticeListApp.editModalForEdit && tsNoticeListApp.addModalForEdit) {//新增弹窗
        tsNoticeModalApp.display = true;
      } else {
        tsNoticeModalApp.title = "新增学生";
      }
      if (tsNoticeModalApp.id) findTsNotice(tsNoticeModalApp.id);
    })

    const findTsNotice = (id) => {
      TsNoticeService.findTsNoticeForView(id).then((res) => {
        tsNoticeModalApp.tsNotice = res.data;
        //TODO:为编辑准备.
        tsNoticeModalApp.title = "编辑学生 " + tsNoticeModalApp.tsNotice.name;
      }).catch(error => {
        VXETable.modal.message({content: `查找学生出错，原因是：${error.message}`, status: 'error'});
      })
    }

    /*TODO:提交 新增&编辑*/
    const onSubmit = async (data) => {
      // debugger;
      //当为数组时用逗号连接
      if (data.eid) {
        //修改
        TsNoticeService.updateTsNotice(data).then((res) => {
          saveFileMy(data.eid)
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        TsNoticeService.saveTsNotice(data).then((res) => {
          saveFileMy(res.data.eid)
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
      tsNoticeListApp.editModalShowing = false;
      router.push(`/tms/tsnoticeEntity/tsnotice`);
      store.dispatch('user/tabRemove', route.fullPath);

    }

    //附件上传
    //获取子组件传过来的fileList
    let fileListFromParentMy = (files) => {
      // childValue就是子组件传过来的值
      fileListMy.values = files;
    }

    let cleanFileListMy = () => {
      fileListMy.value = [];
      attachment1.value.cleanFileList();
      attachment1.value.findFile(tsNoticeModalApp.tsNotice.eid, "tsNotice");
    }

    let operatorType = ref();

    //点击上传
    const saveFileMy = (entityEid) => {

      if (fileListMy.values.length !== 0) {
        let formData = new FormData();
        //表单名--对应实体表名
        let formDto = {associateFormId: entityEid, associateFormName: "tsNotice"};
        var fileUploadDto = JSON.stringify(formDto)
        formData.append("fileUploadDto", new Blob([fileUploadDto], {type: "application/json"}));
        fileListMy.values.forEach(file => {
          formData.append('files', file)
        });
        uploadAttachmentService.saveFileMy(formData).then(() => {

          fileListMy = [];
          VXETable.modal.message({content: '资源包上传成功', status: 'success'});
          //更改上传组件的状态为编辑状态
          operatorType = "edit";
          cleanFileListMy();
        }).catch((error) => {
          VXETable.modal.message({content: '资源包上传失败' + `系统错误，原因是：${error.message}`, status: 'error'});
        });

      }
    }


    return {
      cityData,
      routeId,
      tsNoticeListApp,
      tsNoticeModalApp,
      onSubmit,
      continueSubmit,
      onBack,
      fileListFromParentMy,
      saveFileMy,
      attachment1,
      operatorType,
    }

  },
})
</script>

<style scoped>

</style>
