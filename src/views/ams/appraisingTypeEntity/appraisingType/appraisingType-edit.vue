<!-- 学生处评优评先类别信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="appraisingTypeModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="appraisingTypeModalApp.appraisingType"
        :rules="appraisingTypeModalApp.rules"
        :label-col="{md: {span: 4}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 20}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="名称:" name="name">
              <a-input
                v-model:value="appraisingTypeModalApp.appraisingType.name"
                placeholder="请输入评优评先项目名称"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="介绍:" name="introduction">
              <a-textarea
                v-model:value="appraisingTypeModalApp.appraisingType.introduction"
                placeholder="请输入对于该项目的介绍，要求等"
                :maxlength="455"
                allow-clear
                autosize="true"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="appraisingTypeModalApp.display">
                <teleport to="#appraisingTypeEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="appraisingTypeListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(appraisingTypeModalApp.appraisingType)"
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
              <div v-if="!appraisingTypeModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(appraisingTypeModalApp.appraisingType)"
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
import {AppraisingTypeService} from "@/views/ams/appraisingTypeEntity/appraisingType/appraisingTypeService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


export default defineComponent({
  components: {},
  setup() {
    // 省市区数据
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let routeId = route.params.id;
    let appraisingTypeListApp = inject('appraisingTypeListApp', reactive({}));
    const appraisingTypeModalApp = reactive({
      id: null,
      appraisingType: {},
      isEdit: false,
      display: false
    });
    appraisingTypeModalApp.rules = {
      introduction: [
        {
          required: false,
          type: 'string',
          message: '请输入介绍',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      appraisingTypeModalApp.appraisingType = reactive({});
      if (routeId) {//路由
        appraisingTypeModalApp.id = routeId;
        appraisingTypeModalApp.display = false;
        findAppraisingType(appraisingTypeModalApp.id);
      } else if (appraisingTypeListApp.editModalForEdit) {//修改弹窗
        appraisingTypeModalApp.id = appraisingTypeListApp.currentId;
        appraisingTypeModalApp.display = true;
      } else if (!appraisingTypeListApp.editModalForEdit && appraisingTypeListApp.addModalForEdit) {//新增弹窗
        appraisingTypeModalApp.display = true;
      } else {
        appraisingTypeModalApp.title = "新增学生";
      }
      if (appraisingTypeModalApp.id) findAppraisingType(appraisingTypeModalApp.id);
    })

    const findAppraisingType = (id) => {
      AppraisingTypeService.findAppraisingTypeForView(id).then((res) => {
        appraisingTypeModalApp.appraisingType = res.data;
        //TODO:为编辑准备.
        appraisingTypeModalApp.title = "编辑学生 " + appraisingTypeModalApp.appraisingType.name;
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
        AppraisingTypeService.updateAppraisingType(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        AppraisingTypeService.saveAppraisingType(data).then((res) => {
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
      router.push(`/ams/appraisingTypeEntity/appraisingType`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      appraisingTypeListApp,
      appraisingTypeModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
