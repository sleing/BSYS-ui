<template>
  <div class="ele-body">
    <div class="headSculpture">
      <img class="headSculpture-img" src="@/assets/R-C.jpg">
      <a-p class="nickname">
        {{ demo.studentName }}
      </a-p>
      <a-button class="changeInfo" @click="modification">修改个人信息</a-button>

      <vxe-modal v-model="studentInfoListApp.editModalShowing" ref="studentInfoEditModal"
                 :title="studentInfoListApp.showEditTitle"
                 id="studentInfoEditModal"
                 width="800" height="400" min-width="460" min-height="320" :lock-view="false" :mask="false"
                 show-footer show-zoom resize remember storage transfer dblclickZoom
                 :destroy-on-close="true"
      >
        <template #default>
          <div id="studentInfoEditModalContent">
          </div>
        </template>
        <template #footer>
          <div id="studentInfoEditModalFooter">
          </div>
          <teleport to="#studentInfoEditModalContent">
            <studentInfo-edit ref="studentInfo-edit"/>
          </teleport>
        </template>
      </vxe-modal>

    </div>
    <a-card :bordered="false" class="card1">
      <a-p style="font-weight: 600;font-size: 18px">我的信息</a-p>
      <br><br>
      <a-form
        :model="demo"
        :label-col="{md: {span: 3}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}"
        style="font-weight: 500"
      >
        <a-row :gutter="16">
          <a-col :lg="24" :md="8" :sm="24" :xs="24">
            <a-form-item label="姓名:" name="studentName">
              <a-input
                v-model:value="demo.studentName"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="8" :sm="24" :xs="24">
            <a-form-item label="学号:" name="studentId">
              <a-input
                v-model:value="demo.studentId"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>

          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="学院:" name="collegeId">
              <a-input
                v-model:value="demo.collegeName"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="专业:" name="major">
              <a-input
                v-model:value="demo.major"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="年级:" name="grade">
              <a-input
                v-model:value="demo.grade"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="班级:" name="classGrade">
              <a-input
                v-model:value="demo.classGrade"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="电话:" name="contactTel">
              <a-input
                v-model:value="demo.contactTel"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="邮箱:" name="email">
              <a-input
                v-model:value="demo.email"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24" :xs="24">
            <a-form-item label="类型:" name="remark">
              <a-input
                v-model:value="demo.remark"
                class="ele-fluid"
                readOnly
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card title="个人能力分析" :bordered="false" class="card2">
      <div id="chartPie" style="width:100%; height:400px;"></div>
    </a-card>

    <!--修改弹窗-->
    <vxe-modal v-model="demo1.showEdit" title="修改个人信息" width="800"
               min-width="600"
               min-height="300" resize destroy-on-close>
      <template #default>
        <!--        <vxe-table-->
        <!--          show-overflow-->
        <!--          height="300"-->
        <!--          :sync-resize="demo1.value"-->
        <!--          :data="demo">-->
        <!--        </vxe-table>-->
        <a-form
          :model="demo"
          :label-col="{md: {span: 3}, sm: {span: 24}}"
          :wrapper-col="{md: {span: 17}, sm: {span: 24}}"
          style="font-weight: 500"
        >
          <a-row :gutter="16">
            <a-col :lg="12" :md="8" :sm="24" :xs="24">
              <a-form-item label="姓名:" name="studentName">
                <a-input
                  v-model:value="demo.studentName"
                  class="ele-fluid"
                  readOnly
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="8" :sm="24" :xs="24">
              <a-form-item label="学号:" name="studentId">
                <a-input
                  v-model:value="demo.studentId"
                  class="ele-fluid"
                  readOnly
                />
              </a-form-item>
            </a-col>

            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="学院:" name="collegeId">
                <m-entity-select
                  :default-value="demo.collegeName"
                  v-model:value="demo.collegeId"
                  :allowClear="false"
                  placeholder="请选择学院"
                  module="collegeEntity"
                  entity="College"
                  sys="ams"
                  class="ele-fluid1"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="专业:" name="major">
                <a-input
                  v-model:value="demo.major"
                  class="ele-fluid1"
                  @blur="blurMajor"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="年级:" name="grade">
                <a-input
                  v-model:value="demo.grade"
                  class="ele-fluid1"
                  @blur="blurGrade"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="班级:" name="classGrade">
                <a-input
                  v-model:value="demo.classGrade"
                  class="ele-fluid1"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="电话:" name="contactTel">
                <a-input
                  v-model:value="demo.contactTel"
                  class="ele-fluid1"
                  @blur="blurContactTel"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="邮箱:" name="email">
                <a-input
                  v-model:value="demo.email"
                  class="ele-fluid"
                  readOnly
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-form-item label="类型:" name="remark">
                <a-select
                  placeholder="请选择学生类型"
                  v-model:value="demo.remark">
                  <a-select-option :value="1">本科生</a-select-option>
                  <a-select-option :value="2">研究生</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24"></a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-button class="back" @click="demo1.showEdit=false" type="primary" style="margin-left: 290px;">取消
              </a-button>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24">
              <a-button class="save" @click="editEvent()" type="primary">保存</a-button>
            </a-col>
          </a-row>
        </a-form>
        <!--        <a-button class="back" @click="demo1.showEdit=false" type="primary">取消</a-button>-->
        <!--        <a-button class="save" @click="editEvent()" type="primary">保存</a-button>-->
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import {defineComponent, reactive, onMounted, ref} from 'vue'//, Ref
import {} from '@ant-design/icons-vue';
import axios from "axios";
import setting from "@/config/setting";
import {AwardService} from "@/views/ams/awardEntity/award/awardService";
import {StudentInfoService} from "@/views/ams/studentEntity/studentInfo/studentInfoService";
import {VXETable} from "vxe-table";
import echarts from 'echarts';
import {message} from 'ant-design-vue';

export default defineComponent({
  components: {
    // EleChart,
  },
  setup() {
    //const router = useRouter();
    const demo = reactive({
      studentName: '',
      studentId: '',
      collegeName: '',
      collegeId: '',
      major: '',
      grade: '',
      classGrade: '',
      contactTel: '',
      email: '',
      remark:'',
    })

    const demo1 = reactive({
      value: false,
      showEdit: false,
      selectRow: true,
      forData: '',
      chartPie: null,
      // 浏览器分布环形图数据
      ability: [0, 0, 0, 0, 0]
    })

    const studentInfoListApp = reactive({
      editModalShowing: false,
      viewModalShowing: false,
      editModalForEdit: false,
      addModalForEdit: false,
      showEditTitle: '新建',
      tableRefresh: function () {
        reload()
      }
    })

    //检验标志
    const flags = reactive({
      collegeFlag: false,
      majorFlag: false,
      gradeFlag: false,
      classGradeFlag: false,
      contactTelFlag: false,
    })

    const uploadUrl = ref("http://localhost:8081/api/file/upload?token=" + setting.takeToken());

    // /* 获取当前用户信息 */
    const getUser = () => {
      return new Promise((resolve, reject) => {
        axios.get(setting.userUrl).then((res) => {
          //获取当前用户信息
          const result = setting.parseUser ? setting.parseUser(res.data) : res.data;
          //const result = res.data.nickname;
          if (result.code === 0) {
            const username = result.data.nickname;
            findStudentInfo(username);
            // findStudentAwardInfo(username);
          } else if (result.msg) {
            this.$message.error(result.msg);
            return reject(new Error(result.msg));
          }
        }).catch((e) => {
          console.error(e);
          this.$message.error(e.message);
          return reject(new Error(e.message));
        })
      })
    }

    const modification = () => {
      demo1.showEdit = true;

      checkout();
    }

    const checkout = () => {
      let majorValue = demo.major;
      let gradeValue = demo.grade;
      let contactTelValue = demo.contactTel;
      let collegeNameValue = demo.collegeName;
      let collegeIdValue = demo.collegeId;

      if ((collegeNameValue.length != 0) && (collegeIdValue.len != 0)) {
        flags.collegeFlag = true
      } else {
        flags.collegeFlag = false
      }

      if (majorValue.length != 0) {
        flags.majorFlag = true;
      } else
        flags.majorFlag = false;

      if (gradeValue.length != 0) {
        flags.gradeFlag = true;
      } else
        flags.gradeFlag = false;

      let reg = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;

      if (contactTelValue.length != 0 && reg.test(contactTelValue) == true) {
        flags.contactTelFlag = true;
      } else
        flags.contactTelFlag = false;
    }

    //联动选择框（学生信息）
    const findStudentInfo = (studentInfoId) => {
      AwardService.findStudentInfoById(studentInfoId).then((res) => {
        res.data = res.data[0];
        demo.studentName = res.data.name;
        demo.studentId = res.data.studentId;
        demo.collegeName = res.data.collegeName;
        demo.collegeId = res.data.collegeId
        AwardService.findCollegeForView(res.data.collegeId).then((res1) => {
          demo.collegeName = res1.data.name;
        })
        demo.major = res.data.major;
        demo.grade = res.data.grade;
        demo.classGrade = res.data.classGrade;
        demo.contactTel = res.data.contactTel;
        demo.email = res.data.email;
        demo.remark = res.data.remark;
      })
    }

    /*TODO:编辑事件*/
    const editEvent = () => {
      // alert(demo.remark)
      if (demo.remark!=undefined&&flags.collegeFlag && flags.majorFlag && flags.gradeFlag && flags.contactTelFlag) {
        StudentInfoService.updateStudentInfoMy(demo.studentId, demo.studentName, demo.major,
          demo.collegeId, demo.grade, demo.classGrade, demo.contactTel,
          demo.email,demo.remark).then((res) => {
          message.info('修改成功');
          console.log(res);
          demo1.showEdit = false;
          location.reload();
        })
          .catch(error => {
            VXETable.modal.message({content: `加载数据出错之修改学生表，原因是：${error.message}`, status: 'error'});
          })
      } else {
        message.warn("修改信息有误，请检查");
      }
    }

    const drawPieChart = () => {
      demo1.chartPie = echarts.init(document.getElementById('chartPie'));
      demo1.chartPie.setOption({
        title: {
          text: '能力分析',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['创新能力', '组织能力', '学习能力', '表达能力', '编程能力'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            color: ['#3e87ff', 'red', '#191970', 'green', 'blue'],
            center: ['50%', '60%'],
            data: [
              {value: demo1.ability[0], name: '创新能力'},
              {value: demo1.ability[1], name: '组织能力'},
              {value: demo1.ability[2], name: '学习能力'},
              {value: demo1.ability[3], name: '表达能力'},
              {value: demo1.ability[4], name: '编程能力'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }

    /*TODO:条件查询提交*/
    const reload = () => {
      const $grid = demo
      // $grid.commitProxy('query')//TODO:执行代理方法
      //执行代理方法,查询时传入查询一个isQuery : true,用于查询时重置页码
      $grid.commitProxy('query', ...[true])
    }

    //（ok）失去焦点 检验年级 ：不能为空
    const blurGrade = () => {
      let gradeLi = document.getElementById("gradeLi");
      let value = demo.grade;
      if (value.length != 0) {
        flags.gradeFlag = true;
        gradeLi.innerHTML = "√";
        gradeLi.style.color = "green";
      } else {
        flags.gradeFlag = false;
        gradeLi.innerHTML = "年级未输入";
        gradeLi.style.color = "red";
      }
    }

    //（ok）失去焦点 检测电话 ：不能为空且符合电话格式
    const blurContactTel = () => {
      let contactTelLi = document.getElementById("contactTelLi");
      let reg = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
      let value = demo.contactTel;
      if (reg.test(value) && value.length == 11) {
        flags.contactTelFlag = true;
        contactTelLi.innerHTML = "√";
        contactTelLi.style.color = "green";
      } else {
        flags.contactTelFlag = false;
        contactTelLi.innerHTML = "请输入11位电话";
        contactTelLi.style.color = "red";
      }
    }

    //（ok）失去焦点 检验专业 ：不能为空
    const blurMajor = () => {
      let majorLi = document.getElementById("majorLi");
      let value = demo.major;
      if (value.length != 0) {
        flags.majorFlag = true;
        majorLi.innerHTML = "√";
        majorLi.style.color = "green";
      } else {
        flags.majorFlag = false;
        majorLi.innerHTML = "专业未输入";
        majorLi.style.color = "red";
      }
    }

    //（ok）失去焦点 检验班级 ：不能为空
    // const blurClassGrade = () => {
    //   let classGradeLi = document.getElementById("classGradeLi");
    //   let value = demo.classGrade;
    //   if (value.length != 0) {
    //     flags.classGradeFlag = true;
    //     classGradeLi.innerHTML = "√";
    //     classGradeLi.style.color = "green";
    //   } else {
    //     flags.classGradeFlag = false;
    //     classGradeLi.innerHTML = "班级未输入";
    //     classGradeLi.style.color = "red";
    //   }
    // }

    onMounted(() => {
      getUser();
      drawPieChart();
    })

    //TODO:这里需要返回才能调用
    return {
      demo,
      demo1,
      uploadUrl,
      studentInfoListApp,
      modification,
      editEvent,
      drawPieChart,
      reload,
      blurGrade,
      blurContactTel,
      blurMajor,
      // blurClassGrade
      // findStudentAwardInfo
    }
  }
})
</script>

<style scoped>
.headSculpture {
  height: 170px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  background: linear-gradient(to top, white 50%, #b5b5b5 50%);
}

.headSculpture-img {
  width: 150px;
  height: 150px;
  margin: 10px 10px;
  border-radius: 10px;
}

.nickname {
  margin-left: 20px;
  padding-top: 60px;
  margin-top: 60px;
  font-size: 20px;
  font-weight: 600;
  /*color: white;*/
}

.changeInfo {
  text-align: center;
  color: #1c92ff;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  /*border: 1px solid #001529;*/
  background: #e6f7ff;
  /*color: white;*/
}

.changeInfo:hover {
  color: #1890ff;
  box-shadow: 0 0 5px #1890ff inset, 0 0 3px #1890ff;
}

.card1 {
  width: 50%;
  float: left;
}

.card2 {
  width: 48%;
  height: 675px;
  float: right;
}

@keyframes anis {
  100% {
    height: 40px;
    transform: translateY(-100px)
  }
}

@keyframes star {
  0%,
  100% {
    margin-left: -3px;
    margin-top: -2px;
  }
  20% {
    margin-left: 271px;
    margin-top: -2px;
  }
  50% {
    margin-left: 271px;
    margin-top: 197px;
  }
  80% {
    margin-left: -3px;
    margin-top: 197px;
  }
}

.rules {
  color: green;
  font-size: 10px;
  margin-top: -10px;
  margin-bottom: -25px;
}


.ele-fluid {
  border: none;
}

</style>
