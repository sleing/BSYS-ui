<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <vxe-grid ref='teacherInfoGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
          <a-form
            :model="where"
            :label-col="{md: {span: 7}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
            <a-row>

              <a-col :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="姓名:" name="name">
                  <a-input
                    v-model:value="where.name"
                    :maxlength="255"
                    placeholder="请输入教师姓名"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="工号:" name="teacherId">
                  <a-input
                    v-model:value="where.teacherId"
                    :maxlength="255"
                    placeholder="请输入教师工号"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="学院:" name="collegeId">
                  <m-entity-select
                    v-model:value="where.collegeId"
                    placeholder="请选择学院"
                    module="collegeEntity"
                    entity="College"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="邮箱:" name="email">
                  <a-input
                    v-model:value="where.email"
                    :maxlength="255"
                    placeholder="请输入邮箱"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="24" :md="12" :sm="24" :xs="24">
                <a-form-item class="ele-text-right" :wrapper-col="{span: 24}">
                  <a-space>
                    <a-button type="primary" @click="reload">查询</a-button>
                    <a-button @click="reset">重置</a-button>
                    <a @click="searchExpand = !searchExpand">
                      <span v-if="searchExpand">收起 <up-outlined class="ele-text-small"/></span>
                      <span v-else>展开 <down-outlined class="ele-text-small"/></span>
                    </a>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </template>
        <!--自定义按钮-->
        <template #bottom>
          <div>
            <br/>
<!--            <a-alert message="Informational Notes" type="info"-->
<!--                     description="Detailed description and advices about successful copywriting."-->
<!--                     show-icon/>-->
            <br/>
          </div>

        </template>

        <template #operate="{ row }">
          <a-space>
            <a @click="editEvent(row)">修改</a>
            <a-divider type="vertical"/>
<!--            <a class="ele-text-success" @click="editEvent2(row.eid)">修改独立页</a>-->
<!--            <a-divider type="vertical"/>-->
            <a class="ele-text-warning" @click="viewEvent(row)">查看</a>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="确定要删除此记录吗？"
              @confirm="deleteEvent(row)">
              <a class="ele-text-danger">删除</a>
            </a-popconfirm>
          </a-space>
        </template>


        <!--TODO:自定义列模板-->
        <template #dddd="{  }">
          <a href="http://showdoc.cqcflq.com/">文档地址</a>
        </template>

        <template #ycs>
          <a-space>
            <a-button type="primary" @click="addEvent()">
              <template #icon>
                <plus-outlined/>
              </template>
              <span>新建教师</span>
            </a-button>
<!--            <a-button type="danger" @click="batchDeleteEvent()">
              <template #icon>
                <delete-outlined/>
              </template>
              <span>批量删除</span>
            </a-button>-->
            <a-upload
              name="file"
              :multiple='false'
              :limit="1"
              :on-exceed="handleExceed"
              :headers="headers"
              :action="uploadUrl"
              @change="uploadExcel"
              :beforeUpload="beforeUpload"
            >
              <vxe-button status="primary" icon="vxe-icon--upload" class="import">教师信息导入</vxe-button>
            </a-upload>

            <a-upload
              name="file"
              :multiple='false'
              :limit="1"
              :on-exceed="handleExceed"
              :headers="headers"
              :action="uploadUrl_stu"
              @change="uploadExcel"
              :beforeUpload="beforeUpload"
            >
              <vxe-button  status="primary" icon="vxe-icon--upload" class="import">学生信息导入</vxe-button>
            </a-upload>

<!--            <m-attachment-->
<!--              :associate-form-id=" teacherInfoListApp.currentId"-->
<!--              associate-form-name="teacherInfo"-->
<!--              v-on:fileList="fileListFromParent"-->
<!--              :operator-type="operatorType"-->
<!--              ref="attachment"-->
<!--            />-->

          </a-space>
        </template>
      </vxe-grid>

      <!--编辑弹窗-->
      <vxe-modal v-model="teacherInfoListApp.editModalShowing" ref="teacherInfoEditModal"
                 :title="gridOptions.showEditTitle"
                 id="teacherInfoEditModal"
                 width="800" height="400" min-width="460" min-height="320" :lock-view="false" :mask="false"
                 show-footer show-zoom resize remember storage transfer dblclickZoom
                 :destroy-on-close="true"
      >
        <template #default>
          <div id="teacherInfoEditModalContent">
          </div>
        </template>
        <template #footer>
          <div id="teacherInfoEditModalFooter">
          </div>
          <teleport to="#teacherInfoEditModalContent">
            <teacherInfo-edit ref="teacherInfo-edit"/>
          </teleport>
        </template>
      </vxe-modal>

      <!--查看弹窗-->
      <vxe-modal v-model="teacherInfoListApp.viewModalShowing" :title="gridOptions.showDetailsTitle"
                 id="teacherInfoViewModal"
                 width="600"
                 min-width="460"
                 min-height="320"
                 :destroy-on-close="true"
                 :lock-view="false" :mask="false"
                 footer
                 show-footer show-zoom resize remember storage transfer dblclickZoom>
        <template #default>
          <teacherInfo-detail ref="teacherInfo-detail"/>
        </template>
      </vxe-modal>
    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, provide} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import XEAjax from 'xe-ajax'

import {TeacherInfoService} from "@/views/ams/teacherEntity/teacherInfo/teacherInfoService";
import TeacherInfoEdit
  from "@/views/ams/teacherEntity/teacherInfo/teacherInfo-edit";
import TeacherInfoDetail
  from "@/views/ams/teacherEntity/teacherInfo/teacherInfo-detail";
import {
  PlusOutlined,
  /*DeleteOutlined,*/
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import setting from "@/config/setting";
import MEntitySelect from "@/components/MEntity/entitySelect";
import uploadAttachmentService from "@/components/MFileUpload/attachmentService.js";

export default defineComponent({
  components: {
    TeacherInfoEdit,
    TeacherInfoDetail,
    DownOutlined,
    /*DeleteOutlined,*/
    PlusOutlined,
    UpOutlined,
    MEntitySelect,
  },
  setup() {
    const router = useRouter();
    const teacherInfoGrid = ref({})// as VxeGridInstance
    // 搜索表单是否展开
    let searchExpand = ref(false)
    let proxyInfo = reactive({})

    const uploadUrl = ref("http://localhost:8081/api/ams/teacherEntity/TeacherInfo/uploadTeacherInfos?token=" + setting.takeToken())

    const uploadUrl_stu = ref("http://localhost:8081/api/ams/studentEntity/StudentInfo/uploadStudentInfos?token=" + setting.takeToken())


    const where = ref({})
    const eid = ref({})
    const startIndex = ref({})
    const teacherInfoListApp = reactive({
      editModalShowing: false,
      viewModalShowing: false,
      editModalForEdit: false,
      addModalForEdit: false
    })
    const gridOptions = reactive({
      border: true,
      resizable: true,
      showHeaderOverflow: true,
      showOverflow: true,
      highlightHoverRow: true,
      keepSource: true,
      id: 'teacherInfosGrid',
      // maxHeight: "100%",//表格高度
      height: 800,
      rowId: 'eid',
      selectRow: null,
      showEdit: false,
      showDetails: false,
      showEditTitle: '新建教师',
      showDetailsTitle: '查看',
      formData: {},//自定义的
      detailData: [],
      startIndex: startIndex,
      printConfig: {
        columns: [
          {field: 'name'},
          {field: 'email'},
          {field: 'nickname'},
          {field: 'age'},
          {field: 'amount'}
        ]
      },
      /*TODO:排序配置 */
      sortConfig: {
        trigger: 'cell',
        remote: true,
        multiple: true,//多字段排序，默认单排序
        showIcon: true,
        // iconAsc: "fa fa-arrow-up fa-1x",
        // iconDesc: "fa fa-arrow-down fa-1x",
      },
      customConfig: {
        storage: true
      },
      /*TODO:过滤器配置*/
      filterConfig: {
        remote: true
      },
      /*TODO:分页配置*/
      pagerConfig: {
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50]
      },
      /*TODO:工具栏配置*/
      toolbarConfig: {
        slots: {buttons: 'ycs'},
        refresh: true,
        import: true,
        export: true,
        print: true,
        zoom: true,
        custom: true
      },
      /*TODO:请求代理配置*/
      proxyConfig: {
        seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
        sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
        filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
        form: false, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
        // 对应响应结果 { result: [], page: { total: 100 } }
        props: {
          result: 'data.datas', // 配置响应结果列表字段
          total: 'data.totalCount', // 配置响应结果总页数字段
          message: 'data.msg'
        },
        /*TODO:请求*/
        ajax: {
          /*TODO:分页条件查询*/
          query: ({page, sorts, filters}) => {  // 接收 Promise

            const conditions = {...where.value}

            // 处理筛选条件
            filters.forEach(({property, values}) => {
              conditions[property] = values.join('$|$')
            })
            const queryParams = {}
            queryParams.currentPage = page.currentPage
            queryParams.pageSize = page.pageSize
            startIndex.value = (queryParams.currentPage - 1) * queryParams.pageSize + 1
            // // 处理筛选条件
            queryParams.filters = conditions;
            // // 处理排序条件
            queryParams.orderBys = sorts;
            //
            const $grid = teacherInfoGrid.value
            $grid.queryParams = queryParams
            return TeacherInfoService.findTeacherInfos(queryParams).catch(error => {
              VXETable.modal.message({content: `加载数据出错，原因是：${error.message}`, status: 'error'});

            })
          },
        }
      },

      /*TODO:数据表列*/
      columns: [
        /*多选checkbox 单选seq*/
        {type: 'seq', title: '#', width: 40},
        {type: 'checkbox', field: 'eid', title: 'ID', width: 100, sortable: true},
        {
          field: 'name',
          title: '教师姓名',
          sortable: true
        },
        {
          field: 'teacherId',
          title: '教师工号',
          sortable: true
        },
        {
          field: 'collegeName',
          title: '学院',
          sortable: true
        },
        {
          field: 'email',
          title: '邮箱',
          sortable: true
        },
        {title: '操作', width: 250, slots: {default: 'operate'}}
      ],
      /*TODO:导入配置*/
      importConfig: {
        remote: true,
        types: ['xlsx'],
        modes: ['insert'],
        // 自定义服务端导入
        importMethod({file}) {
          const $grid = teacherInfoGrid.value
          const formBody = new FormData()
          formBody.append('file', file)
          return XEAjax.post('http://localhost:8081/api/ams/teacherEntity/TeacherInfo/uploadTeacherInfos', formBody).then(data => {
            VXETable.modal.message({content: `成功导入 ${data.result.insertRows} 条记录！`, status: 'success'})
            // 导入完成，刷新表格
            $grid.commitProxy('query')
          }).catch(() => {
            VXETable.modal.message({content: '导入失败，请检查数据是否正确！', status: 'error'})
          })
        }
      },

      /*TODO:复选框配置*/
      checkboxConfig: {
        labelField: 'eid',
        reserve: false,
        highlight: false,
        range: true
      },
      /*TODO:编辑验证*/
      editRules: {
        name: [
          {required: true, message: 'app.body.valid.rName'},
          {min: 3, max: 50, message: '名称长度在 3 到 50 个字符'}
        ],
        email: [
          {required: true, message: '邮件必须填写'}
        ],
        role: [
          {required: true, message: '角色必须填写'}
        ]
      },
      editConfig: {
        trigger: 'click',
        mode: 'row',
        showStatus: true
      }
    })//as VxeGridProps
    provide('teacherInfoListApp', teacherInfoListApp)
    provide('gridOptions', gridOptions)

    /*TODO:新建事件*/
    const addEvent = () => {
      teacherInfoListApp.editModalShowing = true
      teacherInfoListApp.currentId = null;
      teacherInfoListApp.addModalForEdit = true;
      gridOptions.showEditTitle = "新建教师";
    }

    /*TODO:新建独立页*/
    const addEvent2 = () => {
      router.push(`/ams/teacherEntity/teacherInfo/teacherInfo-add`);
    }
    /*TODO:编辑事件*/
    const editEvent = (row) => {
      teacherInfoListApp.editModalShowing = true
      teacherInfoListApp.currentId = row.eid;
      teacherInfoListApp.editModalForEdit = true;
      gridOptions.showEditTitle = "编辑";
    }
    /*TODO:编辑独立页*/
    const editEvent2 = (eid) => {
      router.push(`/ams/teacherEntity/teacherInfo/teacherInfo-edit/${eid}`);
    }

    /*TODO:编辑关闭事件*/
    const editEventClose = () => {
      console.log(gridOptions.formData);
      VXETable.modal.message({content: '提交成功', status: 'success'})
    }

    /*TODO:查看事件*/
    const viewEvent = (row) => {
      teacherInfoListApp.currentId = row.eid;
      teacherInfoListApp.viewModalShowing = true
      gridOptions.showDetailsTitle = '查看';
    }

    /*TODO:删除事件*/
    const deleteEvent = (row) => {
      TeacherInfoService.deleteTeacherInfo(row.eid).then(() => {
        VXETable.modal.message({content: '操作成功', status: 'success'})
      }).catch(error => {
        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
      })
    }

    /*TODO:批量删除*/
    const batchDeleteEvent = () => {
      VXETable.modal.message({content: '点了批量删除', status: 'success'})
    }
    /*TODO:条件查询提交*/
    const reload = () => {
      const $grid = teacherInfoGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }
    /*TODO:重置搜索*/
    const reset = () => {
      where.value = {}
      const $grid = teacherInfoGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }


    // 上传文件个数超过定义的数量
    const handleExceed = () => {
      VXETable.modal.message({content: `当前限制选择 1 个文件，请删除后继续上传`, status: 'error'});
    }

    // 上传文件之前的钩子,文件上传前调用的方法，即调取接口传数据前，对数据的处理
    const beforeUpload =(file)=> {
      const isText = file.type === 'application/vnd.ms-excel';
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isText && !isTextComputer) {
        VXETable.modal.message({content: `请上传excel格式文件！`, status: 'error'});
      }
      return (isText || isTextComputer);
    }

    // 提交批量上传教师信息的excel表格
    const uploadExcel = (item)=> {
      const file = item;

      if (file.status === 'done') {
        VXETable.modal.message({content: `${file.name} 上传成功`, status: 'success'});
      } else if (file.status === 'error') {
        VXETable.modal.message({content: `${file.name} 上传失败`, status: 'error'});
      }
    }

    //附件上传
    let fileList = reactive([]);
    const attachment = ref(null);

    //附件上传
    //获取子组件传过来的fileList
    let fileListFromParent = (files) => {
      // childValue就是子组件传过来的值
      fileList.values = files;
    }

    let operatorType = ref();
    //点击上传
    let saveFile = (entityEid) => {
      if (fileList.values.length !== 0) {
        let formData = new FormData();
        //表单名--对应实体表名
        let formDto = {associateFormId: entityEid, associateFormName: "award"};
        var fileUploadDto = JSON.stringify(formDto)
        formData.append("fileUploadDto", new Blob([fileUploadDto], {type: "application/json"}));
        fileList.values.forEach(file => {
          formData.append('files', file)
        });
        uploadAttachmentService.saveFile(formData).then(() => {
          fileList = [];
          VXETable.modal.message({content: '上传成功', status: 'success'});
          //更改上传组件的状态为编辑状态
          operatorType = "edit";
          cleanFileList();
        }).catch((error) => {
          VXETable.modal.message({content: '上传失败' + `系统错误，原因是：${error.message}`, status: 'error'});
        });
      }
      // else {
      //   VXETable.modal.message({content: '请选择文件', status: 'warning'});
      // }
    }

    //清空子父组件fileList并刷新子组件reFileList
    let cleanFileList = () => {
      fileList.value = [];
      attachment.value.cleanFileList();
      attachment.value.findFile(teacherInfoListApp.currentId, "award");
    }

    //TODO:这里需要返回才能调用
    return {
      eid,
      teacherInfoGrid,
      // editModal,
      gridOptions,
      searchExpand,
      addEvent,
      editEvent,
      viewEvent,
      editEventClose,
      deleteEvent,
      batchDeleteEvent,
      editEvent2,
      addEvent2,
      where,
      reload,
      reset,
      teacherInfoListApp,
      ...toRefs(proxyInfo),
      handleExceed,
      beforeUpload,
      uploadExcel,
      headers: {
        authorization: 'authorization-text',
      },
      uploadUrl,
      fileListFromParent,
      operatorType,
      saveFile,
      uploadUrl_stu
    }
  }
})
</script>

<style scoped>
.my-grid66 .alert-message {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}

.my-grid66 .alert-message-icon {
  width: 30px;
  text-align: center;
  color: #409eff;
  margin-right: 8px;
}

.my-grid66 .alert-message-content {
  flex-grow: 1;
  padding-right: 20px;
}

.my-grid66 .page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.my-grid66 .select-count {
  display: inline-block;
  vertical-align: middle;
}

.my-grid66 .my-input {
  width: 100%;
}

.my-grid66 .first-col {
  position: relative;
  height: 20px;
}

.my-grid66 .first-col:before {
  content: "";
  position: absolute;
  left: -15px;
  top: 10px;
  width: 110px;
  height: 1px;
  transform: rotate(28deg);
  background-color: #e8eaec;
}

.my-grid66 .first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}

.my-grid66 .first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}


/*.import{*/
/*  position: absolute;*/
/*  top:10px;*/
/*  opacity: 1;*/
/*  float: top;*/
/*}*/

</style>
