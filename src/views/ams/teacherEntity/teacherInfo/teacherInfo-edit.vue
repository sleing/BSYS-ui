<!-- 教师信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="teacherInfoModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="teacherInfoModalApp.teacherInfo"
        :rules="teacherInfoModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="姓名:" name="name">
              <a-input
                v-model:value="teacherInfoModalApp.teacherInfo.name"
                placeholder="请输入教师姓名"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="工号:" name="teacherId">
              <a-input
                v-model:value="teacherInfoModalApp.teacherInfo.teacherId"
                placeholder="请输入教师工号"
                :maxlength="255"
                allow-clear
                @blur="teacherIdIsOnly"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="学院:" name="collegeId">
              <m-entity-select
                :default-value="teacherInfoModalApp.teacherInfo.collegeName"
                v-model:value="teacherInfoModalApp.teacherInfo.collegeId"
                placeholder="请选择学院"
                module="collegeEntity"
                entity="College"
                class="ele-fluid"
                sys="ams"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="邮箱:" name="email">
              <a-input
                v-model:value="teacherInfoModalApp.teacherInfo.email"
                placeholder="请输入邮箱"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="teacherInfoModalApp.display">
                <teleport to="#teacherInfoEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="teacherInfoListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(teacherInfoModalApp.teacherInfo)"
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
              <div v-if="!teacherInfoModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(teacherInfoModalApp.teacherInfo)"
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
import {TeacherInfoService} from "@/views/ams/teacherEntity/teacherInfo/teacherInfoService";
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
    let teacherInfoListApp = inject('teacherInfoListApp', reactive({}));
    const teacherInfoModalApp = reactive({
      id: null,
      teacherInfo: {},
      isEdit: false,
      display: false
    });
    teacherInfoModalApp.rules = {
      name: [
        {
          required: true,
          type: 'string',
          message: '请输入教师姓名',
          trigger: 'blur'
        }
      ],
      teacherId: [
        {
          required: true,
          type: 'string',
          message: '请输入教师工号',
          trigger: 'blur'
        }
      ],
      collegeName: [
        {
          required: true,
          type: 'string',
          message: '请输入学院',
          trigger: 'blur'
        }
      ],
      collegeId: [
        {
          required: true,
          type: 'number',
          message: '请输入学院',
          trigger: 'blur'
        }
      ],
      email: [
        {
          required: true,
          type: 'string',
          message: '请输入邮箱',
          trigger: 'blur'
        }
      ],
    }
    const teamFlags = reactive({
      teacherIdFlag:false
    })

    //检验新增老师工号信息是否重复
    const teacherIdIsOnly = () => {
      if(teacherInfoModalApp.teacherInfo.teacherId != null) {
        let reg = /^[0-9]{3,16}$/;
        if ( !(reg.test(teacherInfoModalApp.teacherInfo.teacherId)) ) {
          teamFlags.teacherIdFlag = false;
        }else {
          TeacherInfoService.getTeacherEid(teacherInfoModalApp.teacherInfo.teacherId.trim()).then((res) => {
            if(res.data == true) {
              teamFlags.teacherIdFlag = false;
              VXETable.modal.message({content: `该教师已存在无需添加`, status: 'error'});
            }else {
              teamFlags.teacherIdFlag = true;
            }
          })
            .catch(error => {
              console.log(error);
              VXETable.modal.message({content: `加载数据出错之工号，原因是：${error.message}`, status: 'error'});
            })
        }
      }
    }

    onMounted(() => {
      //清理数据
      teacherInfoModalApp.teacherInfo = reactive({});
      if (routeId) {//路由
        teacherInfoModalApp.id = routeId;
        teacherInfoModalApp.display = false;
        findTeacherInfo(teacherInfoModalApp.id);
      } else if (teacherInfoListApp.editModalForEdit) {//修改弹窗
        teacherInfoModalApp.id = teacherInfoListApp.currentId;
        teacherInfoModalApp.display = true;
      } else if (!teacherInfoListApp.editModalForEdit && teacherInfoListApp.addModalForEdit) {//新增弹窗
        teacherInfoModalApp.display = true;
      } else {
        teacherInfoModalApp.title = "新增学生";
      }
      if (teacherInfoModalApp.id) findTeacherInfo(teacherInfoModalApp.id);
    })

    const findTeacherInfo = (id) => {
      TeacherInfoService.findTeacherInfoForView(id).then((res) => {
        teacherInfoModalApp.teacherInfo = res.data;
        //TODO:为编辑准备.
        teacherInfoModalApp.title = "编辑学生 " + teacherInfoModalApp.teacherInfo.name;
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
        let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (teamFlags.teacherIdFlag == true && data.name != undefined && data.teacherId != undefined && data.email != undefined && reg.test(data.email) && data.collegeId != undefined) {
          TeacherInfoService.updateTeacherInfo(data).then((res) => {
            console.log(res);
            VXETable.modal.message({content: '操作成功', status: 'success'});
            setTimeout(onBack, 1000);
            teacherInfoModalApp.teacherInfo = {}
            teacherInfoListApp.editModalShowing = false
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        }else {
          VXETable.modal.message({content: '请填写完整且正确的信息', status: 'error'});
        }

      } else {
        //新增
        let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (teamFlags.teacherIdFlag == true && data.name != undefined && data.teacherId != undefined && data.email != undefined && reg.test(data.email) && data.collegeId != undefined) {
          TeacherInfoService.saveTeacherInfo(data).then((res) => {
            console.log(res);
            VXETable.modal.message({content: '操作成功', status: 'success'});
            setTimeout(onBack, 1000);
            teacherInfoListApp.editModalShowing = false
            teacherInfoModalApp.teacherInfo = {}
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        }else {
          VXETable.modal.message({content: '请填写完整且正确的信息', status: 'error'});
        }

      }
    }

    /*TODO:继续提交*/
    const continueSubmit = () => {
      VXETable.modal.message({content: 'error 提示', status: 'error'});
    }

    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/teacherEntity/teacherInfo`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      teacherInfoListApp,
      teacherInfoModalApp,
      onSubmit,
      continueSubmit,
      onBack,
      teacherIdIsOnly,
      teamFlags
    }

  },
})
</script>

<style scoped>

</style>
