<!-- 学生信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="studentInfoModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="studentInfoModalApp.studentInfo"
        :rules="studentInfoModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="姓名:" name="name">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.name"
                placeholder="请输入姓名"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="学号:" name="studentId">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.studentId"
                placeholder="请输入学号"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="学院:" name="collegeId">
              <m-entity-select
                :default-value="studentInfoModalApp.studentInfo.collegeName"
                v-model:value="studentInfoModalApp.studentInfo.collegeId"
                placeholder="请选择学院"
                module="collegeEntity"
                entity="College"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="专业:" name="major">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.major"
                placeholder="请输入专业"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="年级:" name="grade">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.grade"
                placeholder="请输入年级"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="班级:" name="classGrade">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.classGrade"
                placeholder="请输入班级"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="电话:" name="contactTel">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.contactTel"
                placeholder="请输入联系电话"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="邮箱:" name="email">
              <a-input
                v-model:value="studentInfoModalApp.studentInfo.email"
                placeholder="请输入联系邮箱"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="学生类型:" name="remark">
              <a-select
                placeholder="请选择学生类型"
                v-model:value="studentInfoModalApp.studentInfo.remark">
                <a-select-option :value="1">本科生</a-select-option>
                <a-select-option :value="2">研究生</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>



          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="studentInfoModalApp.display">
                <teleport to="#studentInfoEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="studentInfoListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(studentInfoModalApp.studentInfo)"
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
              <div v-if="!studentInfoModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(studentInfoModalApp.studentInfo)"
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
import {StudentInfoService} from "@/views/ams/studentEntity/studentInfo/studentInfoService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


import MEntitySelect from "@/components/MEntity/entitySelect";

const {isAdminRole} = require("@/config/app");

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
    let studentInfoListApp = inject('studentInfoListApp', reactive({}));
    const studentInfoModalApp = reactive({
      id: null,
      studentInfo: {},
      isEdit: false,
      display: false
    });
    studentInfoModalApp.rules = {
      name: [
        {
          required: true,
          type: 'string',
          message: '请输入学生姓名',
          trigger: 'blur'
        }
      ],
      studentId: [
        {
          required: true,
          type: 'string',
          message: '请输入学号',
          trigger: 'blur'
        }
      ],
      collegeName: [
        {
          required: false,
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
      major: [
        {
          required: false,
          type: 'string',
          message: '请输入专业',
          trigger: 'blur'
        }
      ],
      grade: [
        {
          required: false,
          type: 'string',
          message: '请输入年级',
          trigger: 'blur'
        }
      ],
      classGrade: [
        {
          required: false,
          type: 'string',
          message: '请输入班级',
          trigger: 'blur'
        }
      ],
      contactTel: [
        {
          required: false,
          type: 'string',
          message: '请输入联系电话',
          trigger: 'blur'
        }
      ],
      email: [
        {
          required: true,
          type: 'string',
          message: '请输入联系邮箱',
          trigger: 'blur'
        }
      ],
      remark: [
        {
          required: true,
          message: '请选择学生类型',
        }
      ],
    }

    onMounted(() => {
      //清理数据
      studentInfoModalApp.studentInfo = reactive({});
      if (routeId) {//路由
        studentInfoModalApp.id = routeId;
        studentInfoModalApp.display = false;
        findStudentInfo(studentInfoModalApp.id);
      } else if (studentInfoListApp.editModalForEdit) {//修改弹窗
        //alert("adit");
        studentInfoModalApp.id = studentInfoListApp.currentId;

        studentInfoModalApp.display = true;
      } else if (!studentInfoListApp.editModalForEdit && studentInfoListApp.addModalForEdit) {//新增弹窗
        studentInfoModalApp.display = true;
      } else {
        studentInfoModalApp.title = "新增学生";
      }
      if (studentInfoModalApp.id) findStudentInfo(studentInfoModalApp.id);
    })

    const findStudentInfo = (id) => {
      StudentInfoService.findStudentInfoForView(id).then((res) => {
        studentInfoModalApp.studentInfo = res.data;
        //TODO:为编辑准备.
        studentInfoModalApp.title = "编辑学生 " + studentInfoModalApp.studentInfo.name;
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
        StudentInfoService.getStudentEid(data.studentId).then((ress)=>{
          if (ress.data != -1) {
            StudentInfoService.saveStudentInfo(data).then((res) => {
              console.log(res);
              VXETable.modal.message({content: '操作成功', status: 'success'});
              setTimeout(onBack, 1500);
            }).catch(error => {
              //VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
              VXETable.modal.message({content: `${error.message}-----信息可能出现重复的情况`, status: 'error'});
            })
          }else {
            VXETable.modal.message({content: `学号重复`, status: 'error'});
          }
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })

      } else {
        //新增
        StudentInfoService.updateStudentInfo(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 1500);
        }).catch(error => {
          VXETable.modal.message({content: `${error.message}-----信息可能出现重复的情况`, status: 'error'});
        })
      }
    }

    /*TODO:继续提交*/
    const continueSubmit = () => {
      VXETable.modal.message({content: 'error 提示', status: 'error'});
    }

    /*TODO:返回列表*/
    const onBack = () => {
      //判断是否是管理员
      if (isAdminRole) {
        router.push('/ams/studentEntity/studentMege');
      } else {
        router.push('/ams/studentEntity/studentInfo');
      }
      studentInfoListApp.editModalShowing = false;
      studentInfoListApp.tableRefresh();
      store.dispatch('user/tabRemove', route.fullPath);
    }
    return {
      cityData,
      routeId,
      studentInfoListApp,
      studentInfoModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
