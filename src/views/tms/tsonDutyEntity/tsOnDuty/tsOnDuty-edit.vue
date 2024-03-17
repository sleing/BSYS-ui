<!-- 值班管理编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="tsOnDutyModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="tsOnDutyModalApp.tsOnDuty"
        :rules="tsOnDutyModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="值班时间:" name="onDutyTime">
              <a-date-picker
                v-model:value="tsOnDutyModalApp.tsOnDuty.onDutyTime"
                placeholder="请选择值班时间"
                value-format="YYYY-MM-DD H:m:s"
                class="ele-fluid"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="值班地点:" name="onDutyAddressId">
              <m-entity-select
                :default-value="tsOnDutyModalApp.tsOnDuty.onDutyAddressName"
                v-model:value="tsOnDutyModalApp.tsOnDuty.onDutyAddressId"
                placeholder="请选择值班地点"
                module="tsworklaceEntity"
                entity="TsWorkPlace"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="值班人员:" name="onDutyStuId">
              <m-entity-select
                :default-value="tsOnDutyModalApp.tsOnDuty.onDutyStuName"
                v-model:value="tsOnDutyModalApp.tsOnDuty.onDutyStuId"
                placeholder="请选择值班人员"
                module="tsstudentEntity"
                entity="TsStudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="tsOnDutyModalApp.display">
                <teleport to="#tsOnDutyEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="tsOnDutyListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(tsOnDutyModalApp.tsOnDuty)"
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
              <div v-if="!tsOnDutyModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(tsOnDutyModalApp.tsOnDuty)"
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
import {TsOnDutyService} from "@/views/tms/tsonDutyEntity/tsOnDuty/tsOnDutyService";
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
    let tsOnDutyListApp = inject('tsOnDutyListApp', reactive({}));
    const tsOnDutyModalApp = reactive({
      id: null,
      tsOnDuty: {},
      isEdit: false,
      display: false
    });
    tsOnDutyModalApp.rules = {
      onDutyTime: [
        {
          required: true,
          type: 'string',
          message: '请输入值班时间',
          trigger: 'blur'
        }
      ],
      onDutyAddressId: [
        {
          required: false,
          type: 'number',
          message: '请输入值班地点',
          trigger: 'blur'
        }
      ],
      onDutyAddressName: [
        {
          required: false,
          type: 'string',
          message: '请输入值班地点',
          trigger: 'blur'
        }
      ],
      onDutyStuName: [
        {
          required: false,
          type: 'string',
          message: '请输入值班人员',
          trigger: 'blur'
        }
      ],
      onDutyStuId: [
        {
          required: false,
          type: 'number',
          message: '请输入值班人员',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      tsOnDutyModalApp.tsOnDuty = reactive({});
      if (routeId) {//路由
        tsOnDutyModalApp.id = routeId;
        tsOnDutyModalApp.display = false;
        findTsOnDuty(tsOnDutyModalApp.id);
      } else if (tsOnDutyListApp.editModalForEdit) {//修改弹窗
        tsOnDutyModalApp.id = tsOnDutyListApp.currentId;
        tsOnDutyModalApp.display = true;
      } else if (!tsOnDutyListApp.editModalForEdit && tsOnDutyListApp.addModalForEdit) {//新增弹窗
        tsOnDutyModalApp.display = true;
      } else {
        tsOnDutyModalApp.title = "新增学生";
      }
      if (tsOnDutyModalApp.id) findTsOnDuty(tsOnDutyModalApp.id);
    })

    const findTsOnDuty = (id) => {
      TsOnDutyService.findTsOnDutyForView(id).then((res) => {
        tsOnDutyModalApp.tsOnDuty = res.data;
        //TODO:为编辑准备.
        tsOnDutyModalApp.title = "编辑学生 " + tsOnDutyModalApp.tsOnDuty.name;
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
        TsOnDutyService.updateTsOnDuty(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        TsOnDutyService.saveTsOnDuty(data).then((res) => {
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
      router.push(`/tms/tsonDutyEntity/tsOnDuty`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      tsOnDutyListApp,
      tsOnDutyModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
