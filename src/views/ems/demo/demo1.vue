<template>
  <div id="event-handling" class="demo">

    <h2 style="text-align: center;color: lightgreen;background-color: white">{{ message }}</h2>
    <!--    <table style="border-style: solid">-->
    <!--      <tr v-for="student in students" v-bind:key="student.studentName" style="border-style: solid">-->
    <!--        <td>{{ student.eid }}</td>-->
    <!--        <td>{{ student.studentName }}</td>-->
    <!--      </tr>-->
    <!--    </table>-->
    <a-card>
      <a-space>
        <vxe-button @click="showStudents()" class="btn1" icon="vxe-icon--eye">
          <span>查看所有学生</span>
        </vxe-button>
        <vxe-button @click="addStudent()" class="btn1" icon="fa fa-plus">
          <span>新增学生</span>
        </vxe-button>
        <vxe-button @click="insertEvent()" class="btn1" icon="fa fa-plus">
          <span>临时新增</span>
        </vxe-button>
        <vxe-button @click="importDataEvent()" class="btn1" icon="vxe-icon--upload">
          <span>导入数据</span>
        </vxe-button>
        <vxe-button @click="exportDataEvent()" class="btn1" icon="vxe-icon--download">
          <span>导出数据</span>
        </vxe-button>
      </a-space>
      <br>
      <br>
      <a-space>
        <!--        <input v-model="queryName" placeholder="请输入学生姓名"/>-->
        <vxe-input v-model="queryName" placeholder="请输入学生姓名" prefix-icon="fa fa-user" suffix-icon="fa fa-search"
                   clearable>
        </vxe-input>
        <vxe-button @click="findStudentsByName()" type="submit" status="primary" class="btn1" icon="vxe-icon--search">
          <span>查询</span>
        </vxe-button>
        <vxe-button @click="printEvent1()" type="submit" status="primary" icon="vxe-icon--print">
          <span>打印表格</span>
        </vxe-button>
      </a-space>
    </a-card>
    <vxe-toolbar size="medium" print>
      <template #buttons>
        <vxe-button @click="allAlign = 'left'" status="primary">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'" status="primary">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'" status="primary">居右</vxe-button>
      </template>
      <template #tools >
        <vxe-button type="text" icon="vxe-icon--question" class="tool-btn" @click="questEvent"></vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      stripe
      resizable
      highlight-hover-row
      highlight-current-row
      show-overflow
      keep-source
      ref="xTable"
      height="500"

      :menu-config="{}"
      :tooltip-config="{}"
      :edit-config="{trigger: 'click', mode: 'row', showUpdateStatus: true, showInsertStatus: true}"
      :edit-rules="validRules"
      :data="students"
      :align="allAlign"
      :merge-cells="mergeCells"
      @header-cell-click="headerCellClickEvent"
      @header-cell-dblclick="headerCellDblclickEvent"
      @header-cell-menu="headerCellContextMenuEvent"
      @cell-click="cellClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent"
      @cell-menu="cellContextMenuEvent"
      @scroll="scrollEvent">
      <vxe-column type="seq" title="序号" width="40"></vxe-column>
      <vxe-column field="eid" type="checkbox" v-model="queryID" title="ID" width="60" sortable="true"></vxe-column>
      <vxe-column field="studentName" title="学生姓名" width="100" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.studentName" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="studentIdNum" title="身份证号" width="100" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.studentIdNum" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="studentAge" title="年龄" width="80" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.studentAge" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="dateOfStartStudy" title="入学时间" width="80" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.dateOfStartStudy" type="date"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="score" title="分数" width="70" :edit-render="{}" sortable="custom">
        <template #edit="{ row }">
          <vxe-input v-model="row.score" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="dateOfJoin" title="入职日期" width="80" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.dateOfJoin" type="date"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="gender" title="性别" width="80" :edit-render="{}">
        <template #default="{ row }">
          <span>{{ formatSex(row.gender) }}</span>
        </template>
        <template #edit="{ row }">
          <!--          <vxe-select v-model="row.gender" type="text" transfer>-->
          <!--            <vxe-option value="1" label="男"></vxe-option>-->
          <!--            <vxe-option value="2" label="女"></vxe-option>-->
          <!--          </vxe-select>-->
          <vxe-select v-model="row.gender" type="text" :options="sexList" transfer></vxe-select>
        </template>
      </vxe-column>
      <!--      <vxe-column title="操作" width="250" slots="{default: 'operate'}"></vxe-column>-->
      <vxe-column title="操作" width="300">
        <template #default="{row}">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="vxe-icon--eye" @click="viewEvent(row)"></vxe-button>
          <vxe-button status="warning" content="消去" @click="removeRowEvent(row)"></vxe-button>
          <vxe-button status="danger" content="删除" @click="deleteStudent(row)"></vxe-button>
          <vxe-button status="primary" content="保存" @click="deleteStudent(row)"></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <!--    编辑弹窗-->
    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300"
               resize destroy-on-close show-zoom>
      <template #default>
        <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent()">
          <vxe-form-item title="现在是学生表" title-align="left" :title-width="200" :span="24"
                         :title-prefix="{icon: 'fa fa-address-card-o'}">
          </vxe-form-item>
          <vxe-form-item field="studentName" title="学生姓名" width="100" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.studentName" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="studentIdNum" title="身份证号" width="100" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.studentIdNum" placeholder="请输入身份证号"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="studentAge" title="年龄" width="80" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.studentAge" placeholder="请输入年龄"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="dateOfStartStudy" title="入学时间" width="120" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.dateOfStartStudy" type="date"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="score" title="分数" width="70" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.score" type="text"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="dateOfJoin" title="入职日期" width="120" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.dateOfJoin" type="date"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="gender" title="性别" width="80" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.gender" transfer>
                <vxe-option v-for="item in sexList" :key="item.value" :value="item.value"
                            :label="item.label"></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button type="submit">提交</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>

<!--    查看弹窗-->
    <vxe-modal v-model="showDetails" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
      <template #default>
        <vxe-table
          border="inner"
          auto-resize
          show-overflow
          highlight-hover-row
          height="auto"
          :show-header="false"
          :sync-resize="showDetails"
          :data="detailData">
          <vxe-column field="label" width="40%"></vxe-column>
          <vxe-column field="value"></vxe-column>
        </vxe-table>
      </template>
    </vxe-modal>
    <!--    <a-table :datasrc="students">-->
    <!--      <template #operation="{}">-->
    <!--      </template>-->
    <!--    </a-table>-->

  </div>
</template>

<script>
//首先要导入这个StudentsService
import {StudentService} from "@/views/ems/student/student/studentService";
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
//import XEAjax from 'xe-ajax'
const printStyle = `
        .title {
          text-align: center;
        }
        .my-list-row {
          display: inline-block;
          width: 100%;
        }
        .my-list-col {
          float: left;
          width: 33.33%;
          height: 28px;
          line-height: 28px;
        }
        .my-top,
        .my-bottom {
          font-size: 12px;
        }
        .my-top {
          margin-bottom: 5px;
        }
        .my-bottom {
          margin-top: 30px;
          text-align: right;
        }
        `
const topHtml = `
        <h1 class="title">学生信息管理表</h1>
        `
export default {
  name: "demo1",
  // mounted() {
  //   this.showStudents()
  // },
  data() {
    return {
      allAlign: null,
      message: 'welcome to my first vue program',
      students: [],
      formData: null,
      showDetails: false,
      student_info: {
        studentName: '',
        studentIdNum: '',
        studentAge: '',
        dateOfStartStudy: '',
        score: '',
        dateOfJoin: '',
        gender: '',
      },
      queryName: '',
      queryID: '',
      //loading: true,
      studentWithIdName: '',
      selectRow: null,
      showEdit: false,
      sexList: [
        {label: '', value: ''},
        {label: '女', value: '0'},
        {label: '男', value: '1'}
      ],
      validRules: {
        name: [
          {required: true, message: '名称必须填写'}
        ],
      },
      formRules: {
        studentName: [
          {required: true, message: '请输入名称'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
        ],
        studentIdNum: [
          {required: true, message: '请输入身份证号'}
        ],
      },
    }
  },
  created() {
    this.showStudents()
    this.$nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = this.$refs.xTable
      $table.connect(this.$refs.xToolbar)
    })
    //this.loadList()
  },
  methods: {
    //   reverseMessage() {
    //     this.message = this.message
    //       .split('')
    //       .reverse()
    //       .join('')
    //   },

    async loadList() {
      //this.loading = true
      const queryParams = {}
      queryParams.currentPage = 1
      queryParams.pageSize = 100
      try {
        const res = await fetch('http://localhost:8081/api/ems/student/Student/findStudents?queryParams', {method: "POST"}).then(response => response.json())
        this.students = res.data.datas
      } catch (e) {
        this.students = []
      }
      //this.loading = false
    },
    formatSex(value) {
      if (value === '男') {
        return '男'
      }
      if (value === '女') {
        return '女'
      }
      if (value === '1') {
        return '男'
      }
      if (value === '0') {
        return '女'
      }
      return ''
    },
    showStudents() {
      const queryParams = {}
      queryParams.currentPage = 1
      queryParams.pageSize = 100
      debugger
      StudentService.findStudents(queryParams)
        .then((res) => {
          this.students = res.data.datas
          debugger
        })
        .catch(error => {
          VXETable.modal.message({content: `加载数据出错，原因是：${error.message}`, status: 'error'});

        })
    },
    addStudent() {
      this.formData = {
        studentName: '',
        studentIdNum: '',
        studentAge: '',
        dateOfStartStudy: '',
        score: '',
        dateOfJoin: '',
        gender: '',
      }
      this.showEdit = true
    },
    findStudentsByName() {
      //debugger
      StudentService.findStudentsByName(this.queryName)
        .then((res) => {
          if (this.queryName == "") VXETable.modal.message({content: `你还没有输入姓名`})
          this.students = res.data
        })
        .catch(error => {
          VXETable.modal.message({content: `信息查找失败，原因是：${error.message}`, status: 'error'});
        })
    },
    async deleteStudent(row) {
      const type = await this.$XModal.confirm(`您确定要删除${row.studentName}的信息吗?`)
      if (type !== 'confirm') {
        return
      }
      //this.loading = true
      //debugger
      StudentService.deleteStudent(row.eid)
        .then(() => {
          this.showStudents()
          VXETable.modal.message({content: `删除${row.studentName}成功`})
        })
        .catch(error => {
          this.showStudents()
          VXETable.modal.message({content: `信息删除失败，原因是：${error.message}`, status: 'error'});
        })
      //this.loading = false
    },
    async removeRowEvent(row) {
      const $table = this.$refs.xTable
      await $table.remove(row)
    },
    async insertEvent() {
      const $table = this.$refs.xTable
      const newRecord = {}
      const {row: newRow} = await $table.insert(newRecord)
      await $table.setActiveRow(newRow)
    },
    editEvent(row) {
      this.formData = {
        eid: row.eid,
        studentName: row.studentName,
        studentIdNum: row.studentIdNum,
        studentAge: row.studentAge,
        dateOfStartStudy: row.dateOfStartStudy,
        score: row.score,
        dateOfJoin: row.dateOfJoin,
        gender: row.gender,
      }
      this.selectRow = row
      this.showEdit = true
    },
    submitEvent() {
      debugger
      this.showEdit = false
      if (this.selectRow) {
        StudentService.myUpdateStudent(this.formData)
          .then(() => {
            this.showStudents()
            VXETable.modal.message({content: `${this.formData.studentName}的信息修改成功`})
          })
          .catch(error => {
            VXETable.modal.message({content: `信息修改失败，原因是：${error.message}`, status: 'error'});
          })

      } else {
        StudentService.saveStudent(this.formData)
          .then(() => {
            this.showStudents()
            VXETable.modal.message({content: `${this.formData.studentName}的信息增加成功`})
          })
          .catch(error => {
            VXETable.modal.message({content: `信息增加失败，原因是：${error.message}`, status: 'error'});
          })
      }
      this.$XModal.message({content: '保存成功', status: 'success'})
      Object.assign(this.selectRow, this.formData)

    },
    printEvent1() {
      this.$refs.xTable.print({
        sheetName: '打印表格',
        style: printStyle,
        columns: [
          {type: 'seq'},
          {field: 'eid'},
          {field: 'studentName'},
          {field: 'studentAge'},
          {field: 'dateOfStartStudy'},
          {field: 'score'},
          {field: 'dateOfJoin'},
          {field: 'gender'},
        ],
        beforePrintMethod: ({content}) => {
          // 拦截打印之前，返回自定义的 html 内容
          return topHtml+content
        }
      })
    },
    questEvent(){
      this.$XModal.alert({ content: '这里是奥特曼打哈儿茂茂' })
    },
    viewEvent(row){
      //this.$XModal.alert({ content: '这里是奥特曼打哈儿茂茂' })
      this.detailData = ['eid', 'studentName', 'studentIdNum', 'studentAge', 'dateOfStartStudy', 'score', 'dateOfJoin', 'gender'].map(field => {
        return { label: field, value: row[field] }
      })
      this.showDetails = true
    },
    importDataEvent () {
      this.$refs.xTable.importData()
    },
    exportDataEvent () {
      this.$refs.xTable.openExport({
        // 默认勾选源
        original: true
      })
    },
  }
}

</script>

<style scoped>

.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.my-grid66_01 .alert-message {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}

.error {

  border-color: red;

}

.btn1 {
  background-color: lightblue;
}
</style>
