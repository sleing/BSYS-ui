<!-- 部门信息管理编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="tsDepartmentModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="tsDepartmentModalApp.tsDepartment"
        :rules="tsDepartmentModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门级别:" name="departmentLevel">
              <m-dict-select
                v-model:value="tsDepartmentModalApp.tsDepartment.departmentLevel"
                placeholder="请选择部门级别"
                dict="部门级别"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门主管老师:" name="supervisorTeaId">
              <m-entity-select
                :default-value="tsDepartmentModalApp.tsDepartment.supervisorTeaName"
                v-model:value="tsDepartmentModalApp.tsDepartment.supervisorTeaId"
                placeholder="请选择部门主管老师"
                module="tsteacherEntity"
                entity="TsTeacherInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门主管学生:" name="supervisorStuId">
              <m-entity-select
                :default-value="tsDepartmentModalApp.tsDepartment.supervisorStuName"
                v-model:value="tsDepartmentModalApp.tsDepartment.supervisorStuId"
                placeholder="请选择部门主管学生"
                module="tsstudentEntity"
                entity="TsStudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门主要负责人:" name="leaderId">
              <m-entity-select
                :default-value="tsDepartmentModalApp.tsDepartment.leaderName"
                v-model:value="tsDepartmentModalApp.tsDepartment.leaderId"
                placeholder="请选择部门主要负责人"
                module="tsstudentEntity"
                entity="TsStudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门负责人:" name="viceLeader">
              <a-input
                v-model:value="tsDepartmentModalApp.tsDepartment.viceLeader"
                placeholder="请输入部门负责人"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门成员:" name="member">
              <a-input
                v-model:value="tsDepartmentModalApp.tsDepartment.member"
                placeholder="请输入部门成员"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="部门描述:" name="description">
              <a-input
                v-model:value="tsDepartmentModalApp.tsDepartment.description"
                placeholder="请输入部门描述"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="成立日期:" name="foundDate">
              <a-date-picker
                v-model:value="tsDepartmentModalApp.tsDepartment.foundDate"
                placeholder="请选择成立日期"
                value-format="YYYY-MM-DD H:m:s"
                class="ele-fluid"/>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="tsDepartmentModalApp.display">
                <teleport to="#tsDepartmentEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="tsDepartmentListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(tsDepartmentModalApp.tsDepartment)"
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
              <div v-if="!tsDepartmentModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(tsDepartmentModalApp.tsDepartment)"
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
import {TsDepartmentService} from "@/views/tms/tsdepartmentEntity/tsDepartment/tsDepartmentService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";

export default defineComponent({
  components: {
    MDictSelect,
    MEntitySelect,
  },
  setup() {
    // 省市区数据
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let routeId = route.params.id;
    let tsDepartmentListApp = inject('tsDepartmentListApp', reactive({}));
    const tsDepartmentModalApp = reactive({
      id: null,
      tsDepartment: {},
      isEdit: false,
      display: false
    });
    tsDepartmentModalApp.rules = {
      departmentLevel: [
        {
          required: false,
          type: 'string',
          message: '请输入部门级别',
          trigger: 'blur'
        }
      ],
      supervisorTeaName: [
        {
          required: false,
          type: 'string',
          message: '请输入部门主管老师',
          trigger: 'blur'
        }
      ],
      supervisorTeaId: [
        {
          required: false,
          type: 'number',
          message: '请输入部门主管老师',
          trigger: 'blur'
        }
      ],
      supervisorStuId: [
        {
          required: false,
          type: 'number',
          message: '请输入部门主管学生',
          trigger: 'blur'
        }
      ],
      supervisorStuName: [
        {
          required: false,
          type: 'string',
          message: '请输入部门主管学生',
          trigger: 'blur'
        }
      ],
      leaderId: [
        {
          required: false,
          type: 'number',
          message: '请输入部门主要负责人',
          trigger: 'blur'
        }
      ],
      leaderName: [
        {
          required: false,
          type: 'string',
          message: '请输入部门主要负责人',
          trigger: 'blur'
        }
      ],
      viceLeader: [
        {
          required: false,
          type: 'string',
          message: '请输入部门负责人',
          trigger: 'blur'
        }
      ],
      member: [
        {
          required: false,
          type: 'string',
          message: '请输入部门成员',
          trigger: 'blur'
        }
      ],
      description: [
        {
          required: false,
          type: 'string',
          message: '请输入部门描述',
          trigger: 'blur'
        }
      ],
      foundDate: [
        {
          required: false,
          type: 'string',
          message: '请输入成立日期',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      tsDepartmentModalApp.tsDepartment = reactive({});
      if (routeId) {//路由
        tsDepartmentModalApp.id = routeId;
        tsDepartmentModalApp.display = false;
        findTsDepartment(tsDepartmentModalApp.id);
      } else if (tsDepartmentListApp.editModalForEdit) {//修改弹窗
        tsDepartmentModalApp.id = tsDepartmentListApp.currentId;
        tsDepartmentModalApp.display = true;
      } else if (!tsDepartmentListApp.editModalForEdit && tsDepartmentListApp.addModalForEdit) {//新增弹窗
        tsDepartmentModalApp.display = true;
      } else {
        tsDepartmentModalApp.title = "新增学生";
      }
      if (tsDepartmentModalApp.id) findTsDepartment(tsDepartmentModalApp.id);
    })

    const findTsDepartment = (id) => {
      TsDepartmentService.findTsDepartmentForView(id).then((res) => {
        tsDepartmentModalApp.tsDepartment = res.data;
        //TODO:为编辑准备.
        tsDepartmentModalApp.title = "编辑学生 " + tsDepartmentModalApp.tsDepartment.name;
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
        TsDepartmentService.updateTsDepartment(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        TsDepartmentService.saveTsDepartment(data).then((res) => {
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
      router.push(`/tms/tsdepartmentEntity/tsDepartment`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      tsDepartmentListApp,
      tsDepartmentModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
