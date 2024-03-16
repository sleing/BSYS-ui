<!-- 举办单位信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="unitModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="unitModalApp.unit"
        :rules="unitModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item label="地点:" name="name">
              <a-input
                v-model:value="unitModalApp.unit.name"
                placeholder="请输入举办单位"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="unitModalApp.display">
                <teleport to="#unitEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="unitListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(unitModalApp.unit)"
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
              <div v-if="!unitModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(unitModalApp.unit)"
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
import {UnitService} from "@/views/ams/unitEntity/unit/unitService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';
import {AwardService} from "@/views/ams/awardEntity/award/awardService";


export default defineComponent({
  components: {},
  setup() {
    // 省市区数据
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let routeId = route.params.id;
    let unitListApp = inject('unitListApp', reactive({}));
    const unitModalApp = reactive({
      id: null,
      unit: {},
      isEdit: false,
      display: false
    });
    unitModalApp.rules = {}

    onMounted(() => {
      //清理数据
      unitModalApp.unit = reactive({});
      if (routeId) {//路由
        unitModalApp.id = routeId;
        unitModalApp.display = false;
        findUnit(unitModalApp.id);
      } else if (unitListApp.editModalForEdit) {//修改弹窗
        unitModalApp.id = unitListApp.currentId;
        unitModalApp.display = true;
      } else if (!unitListApp.editModalForEdit && unitListApp.addModalForEdit) {//新增弹窗
        unitModalApp.display = true;
      } else {
        unitModalApp.title = "新增学生";
      }
      if (unitModalApp.id) findUnit(unitModalApp.id);
    })

    const findUnit = (id) => {
      UnitService.findUnitForView(id).then((res) => {
        unitModalApp.unit = res.data;
        //TODO:为编辑准备.
        unitModalApp.title = "编辑学生 " + unitModalApp.unit.name;
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
        if(data.name === undefined || data.name === ' ') {
          VXETable.modal.message({content: `请填写举办单位名称！`, status: 'error'});
        }else {
          UnitService.updateUnit(data).then((res) => {
            console.log(res);
            VXETable.modal.message({content: '操作成功', status: 'success'});
            setTimeout(onBack, 1000);
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        }
      } else {
        //新增
        if(data.name === undefined || data.name === ' ') {
          VXETable.modal.message({content: `请填写举办单位名称！`, status: 'error'});
        }else {
          AwardService.getUnitName(data.name).then((res) => {
            if (res.data) {
              VXETable.modal.message({content: `该举办单位已存在`, status: 'error'});
            } else {
              UnitService.saveUnit(data).then((res) => {
                console.log(res);
                VXETable.modal.message({content: '操作成功', status: 'success'});
                setTimeout(onBack, 1000);
              }).catch(error => {
                VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
              })
            }
          }).catch(error => {
            VXETable.modal.message({content: `举办单位检验出错，原因是：${error.message}`, status: 'error'});
          })
        }
      }
    }

    /*TODO:继续提交*/
    const continueSubmit = () => {
      VXETable.modal.message({content: 'error 提示', status: 'error'});
    }

    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/unitEntity/unit`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      unitListApp,
      unitModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
