<!-- 学生处评优评先关联编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="appraisedModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="appraisedModalApp.appraised"
        :rules="appraisedModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="序号:" name="displayIndex">
              <a-input-number
                v-model:value="appraisedModalApp.appraised.displayIndex"
                placeholder="请输入序号"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="学生:" name="studentId">
              <m-entity-select
                :default-value="appraisedModalApp.appraised.studentName"
                v-model:value="appraisedModalApp.appraised.studentId"
                placeholder="请选择学生"
                module="studentEntity"
                entity="StudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="评优信息:" name="appraisingId">
              <a-input
                :default-value="appraisedModalApp.appraised.appraisingName"
                v-model:value="appraisedModalApp.appraised.appraisingName"
                placeholder="请选择评优信息"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="appraisedModalApp.display">
                <teleport to="#appraisedEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="appraisedListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(appraisedModalApp.appraised)"
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
              <div v-if="!appraisedModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(appraisedModalApp.appraised)"
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
import {defineComponent, inject, reactive, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router"
import {AppraisedService} from "@/views/ams/appraisedEntity/appraised/appraisedService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


import MEntitySelect from "@/components/MEntity/entitySelect";

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
    let routeId = route.params.id;
    let appraisedListApp = inject('appraisedListApp', reactive({}));
    const appraisedModalApp = reactive({
      id: null,
      appraised: {},
      isEdit: false,
      display: false
    });
    appraisedModalApp.rules = {
      displayIndex: [
        {
          required: true,
          type: 'number',
          message: '请输入序号',
          trigger: 'blur'
        }
      ],
      studentId: [
        {
          required: true,
          type: 'number',
          message: '请输入学生',
          trigger: 'blur'
        }
      ],
      studentName: [
        {
          required: false,
          type: 'string',
          message: '请输入学生',
          trigger: 'blur'
        }
      ],
      appraisingId: [
        {
          required: true,
          type: 'number',
          message: '请输入评优信息',
          trigger: 'blur'
        }
      ],
      appraisingName: [
        {
          required: false,
          type: 'string',
          message: '请输入评优信息',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      appraisedModalApp.appraised = reactive({});
      if (routeId) {//路由
        appraisedModalApp.id = routeId;
        appraisedModalApp.display = false;
        findAppraised(appraisedModalApp.id);
      } else if (appraisedListApp.editModalForEdit) {//修改弹窗
        appraisedModalApp.id = appraisedListApp.currentId;
        appraisedModalApp.display = true;
      } else if (!appraisedListApp.editModalForEdit && appraisedListApp.addModalForEdit) {//新增弹窗
        appraisedModalApp.display = true;
      } else {
        appraisedModalApp.title = "新增学生";
      }
      if (appraisedModalApp.id) findAppraised(appraisedModalApp.id);
    })

    const findAppraised = (id) => {
      AppraisedService.findAppraisedForView(id).then((res) => {
        appraisedModalApp.appraised = res.data;
        //TODO:为编辑准备.
        appraisedModalApp.title = "编辑学生 " + appraisedModalApp.appraised.name;
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
        AppraisedService.updateAppraised(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        AppraisedService.saveAppraised(data).then((res) => {
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
      router.push(`/ams/appraisedEntity/appraised`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      appraisedListApp,
      appraisedModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
