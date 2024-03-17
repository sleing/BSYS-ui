<!-- 职务管理编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="tsPositionModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="tsPositionModalApp.tsPosition"
        :rules="tsPositionModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="职务/职称:" name="positionDetail">
              <a-input
                v-model:value="tsPositionModalApp.tsPosition.name"
                placeholder="请输入职务（职称）"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="职务描述:" name="positionDetail">
              <a-input
                v-model:value="tsPositionModalApp.tsPosition.positionDetail"
                placeholder="请输入职务描述"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="tsPositionModalApp.display">
                <teleport to="#tsPositionEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="tsPositionListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(tsPositionModalApp.tsPosition)"
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
              <div v-if="!tsPositionModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(tsPositionModalApp.tsPosition)"
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
import {TsPositionService} from "@/views/tms/tspositionEntity/tsPosition/tsPositionService";
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
    let tsPositionListApp = inject('tsPositionListApp', reactive({}));
    const tsPositionModalApp = reactive({
      id: null,
      tsPosition: {},
      isEdit: false,
      display: false
    });
    tsPositionModalApp.rules = {
      positionDetail: [
        {
          required: false,
          type: 'string',
          message: '请输入职务描述',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      tsPositionModalApp.tsPosition = reactive({});
      if (routeId) {//路由
        tsPositionModalApp.id = routeId;
        tsPositionModalApp.display = false;
        findTsPosition(tsPositionModalApp.id);
      } else if (tsPositionListApp.editModalForEdit) {//修改弹窗
        tsPositionModalApp.id = tsPositionListApp.currentId;
        tsPositionModalApp.display = true;
      } else if (!tsPositionListApp.editModalForEdit && tsPositionListApp.addModalForEdit) {//新增弹窗
        tsPositionModalApp.display = true;
      } else {
        tsPositionModalApp.title = "新增学生";
      }
      if (tsPositionModalApp.id) findTsPosition(tsPositionModalApp.id);
    })

    const findTsPosition = (id) => {
      TsPositionService.findTsPositionForView(id).then((res) => {
        tsPositionModalApp.tsPosition = res.data;
        //TODO:为编辑准备.
        tsPositionModalApp.title = "编辑学生 " + tsPositionModalApp.tsPosition.name;
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
        TsPositionService.updateTsPosition(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        TsPositionService.saveTsPosition(data).then((res) => {
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
      router.push(`/tms/tspositionEntity/tsPosition`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      tsPositionListApp,
      tsPositionModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
