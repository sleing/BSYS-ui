<!-- 活动中心编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="tsActivityModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="tsActivityModalApp.tsActivity"
        :rules="tsActivityModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动类型:" name="activityType">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.activityType"
                placeholder="请输入活动类型"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动时间:" name="activityDate">
              <a-date-picker
                v-model:value="tsActivityModalApp.tsActivity.activityDate"
                placeholder="请选择活动时间"
                value-format="YYYY-MM-DD H:m:s"
                class="ele-fluid"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动主持人:" name="activityHostId">
              <m-entity-select
                :default-value="tsActivityModalApp.tsActivity.activityHostName"
                v-model:value="tsActivityModalApp.tsActivity.activityHostId"
                placeholder="请选择活动主持人"
                module="tsstudentEntity"
                entity="TsStudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动地点:" name="activityAdd">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.activityAdd"
                placeholder="请输入活动地点"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="参与人员:" name="participant">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.participant"
                placeholder="请输入参与人员"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动主题:" name="activityFile">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.activityFile"
                placeholder="请输入活动主题"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动简介:" name="activityContent">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.activityContent"
                placeholder="请输入活动简介"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动参与人数:" name="activityIndex">
              <a-input-number
                v-model:value="tsActivityModalApp.tsActivity.activityIndex"
                placeholder="请输入人数"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="活动评价:" name="activityEval">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.activityEval"
                placeholder="请输入活动评价"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

<!--          <a-col :lg="6" :md="12" :sm="24" :xs="24">-->
<!--            <a-form-item label="活动资料:" name="activityFile">-->
<!--              <a-input-->
<!--                v-model:value="tsActivityModalApp.tsActivity.activityFile"-->
<!--                placeholder="请输入活动资料"-->
<!--                :maxlength="255"-->
<!--                allow-clear-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="举办时长:" name="holdTime">
              <a-input
                v-model:value="tsActivityModalApp.tsActivity.holdTime"
                placeholder="请输入举办时长"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-form-item label="活动资料:" :label-col="{span:6}" :wrapper-col="{span:18}" style="color: red;">
            <my-attachment
              :associate-form-id="tsActivityModalApp.currentId"
              associate-form-name="tsActivity"
              v-on:fileList="fileListFromParentMy"
              :operator-type="operatorType"
              ref="attachment1"
            />
            <a-p class="theTip">仅能上传.7z,.zip,.rar，.pdf,.docx 格式的文件</a-p>
          </a-form-item>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="tsActivityModalApp.display">
                <teleport to="#tsActivityEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="tsActivityListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(tsActivityModalApp.tsActivity)"
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
              <div v-if="!tsActivityModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(tsActivityModalApp.tsActivity)"
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
import {TsActivityService} from "@/views/tms/tsactivityEntity/tsActivity/tsActivityService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


import MEntitySelect from "@/components/MEntity/entitySelect";
import uploadAttachmentService from "@/components/MFileUpload/attachmentService";

export default defineComponent({
  components: {
    MEntitySelect,
  },
  setup() {
    // 省市区数据
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let fileListMy = reactive([]);
    const attachment1 = ref(null);
    let routeId = route.params.id;
    let tsActivityListApp = inject('tsActivityListApp', reactive({}));
    const tsActivityModalApp = reactive({
      id: null,
      tsActivity: {},
      isEdit: false,
      display: false
    });
    tsActivityModalApp.rules = {
      activityIndex: [
        {
          required: true,
          type: 'number',
          message: '请输入序号',
          trigger: 'blur'
        }
      ],
      activityType: [
        {
          required: false,
          type: 'string',
          message: '请输入活动类型',
          trigger: 'blur'
        }
      ],
      activityDate: [
        {
          required: true,
          type: 'string',
          message: '请输入活动时间',
          trigger: 'blur'
        }
      ],
      activityHostName: [
        {
          required: false,
          type: 'string',
          message: '请输入活动主持人',
          trigger: 'blur'
        }
      ],
      activityHostId: [
        {
          required: false,
          type: 'number',
          message: '请输入活动主持人',
          trigger: 'blur'
        }
      ],
      activityAdd: [
        {
          required: false,
          type: 'string',
          message: '请输入活动地点',
          trigger: 'blur'
        }
      ],
      participant: [
        {
          required: false,
          type: 'string',
          message: '请输入参与人员',
          trigger: 'blur'
        }
      ],
      activityContent: [
        {
          required: false,
          type: 'string',
          message: '请输入活动内容',
          trigger: 'blur'
        }
      ],
      activityEval: [
        {
          required: false,
          type: 'string',
          message: '请输入活动评价',
          trigger: 'blur'
        }
      ],
      activityFile: [
        {
          required: false,
          type: 'string',
          message: '请输入活动资料',
          trigger: 'blur'
        }
      ],
      holdTime: [
        {
          required: false,
          type: 'string',
          message: '请输入举办时长',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      tsActivityModalApp.tsActivity = reactive({});
      if (routeId) {//路由
        tsActivityModalApp.id = routeId;
        tsActivityModalApp.display = false;
        findTsActivity(tsActivityModalApp.id);
      } else if (tsActivityListApp.editModalForEdit) {//修改弹窗
        tsActivityModalApp.id = tsActivityListApp.currentId;
        tsActivityModalApp.display = true;
      } else if (!tsActivityListApp.editModalForEdit && tsActivityListApp.addModalForEdit) {//新增弹窗
        tsActivityModalApp.display = true;
      } else {
        tsActivityModalApp.title = "新增学生";
      }
      if (tsActivityModalApp.id) findTsActivity(tsActivityModalApp.id);
    })

    const findTsActivity = (id) => {
      TsActivityService.findTsActivityForView(id).then((res) => {
        tsActivityModalApp.tsActivity = res.data;
        //TODO:为编辑准备.
        tsActivityModalApp.title = "编辑学生 " + tsActivityModalApp.tsActivity.name;
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
        TsActivityService.updateTsActivity(data).then((res) => {
          saveFileMy(data.eid)
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        TsActivityService.saveTsActivity(data).then((res) => {
          saveFileMy(data.eid)
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
      tsActivityModalApp.editModalShowing = false;
      router.push(`/tms/tsactivityEntity/tsActivity`);
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
      attachment1.value.findFile(tsActivityModalApp.tsActivity.eid, "tsActivity");
    }

    const saveFileMy = (entityEid) => {

      if (fileListMy.values.length !== 0) {
        let formData = new FormData();
        //表单名--对应实体表名
        let formDto = {associateFormId: entityEid, associateFormName: "tsActivity"};
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

    let operatorType = ref();
    return {
      cityData,
      routeId,
      tsActivityListApp,
      tsActivityModalApp,
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
