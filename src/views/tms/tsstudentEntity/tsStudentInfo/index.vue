<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <vxe-grid ref='tsStudentInfoGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
          <a-form
            :model="where"
            :label-col="{md: {span: 4}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 20}, sm: {span: 24}}">
            <a-row>


              <a-col :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="学号:" name="studentId">
                  <a-input
                    v-model:value="where.studentId"
                    :maxlength="255"
                    placeholder="请输入学号"
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
                    module="tsCollegeEntity"
                    entity="TsCollege"
                    class="ele-fluid"
                    sys="tms"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="专业:" name="major">
                  <a-input
                    v-model:value="where.major"
                    :maxlength="255"
                    placeholder="请输入专业"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="年级:" name="grade">
                  <a-input
                    v-model:value="where.grade"
                    :maxlength="255"
                    placeholder="请输入年级"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="班级:" name="classGrade">
                  <a-input
                    v-model:value="where.classGrade"
                    :maxlength="255"
                    placeholder="请输入班级"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="联系电话:" name="contactTel">
                  <a-input
                    v-model:value="where.contactTel"
                    :maxlength="255"
                    placeholder="请输入联系电话"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="联系邮箱:" name="email">
                  <a-input
                    v-model:value="where.email"
                    :maxlength="255"
                    placeholder="请输入联系邮箱"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="6" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="政治面貌:" name="politics">
                  <m-dict-select
                    v-model:value="where.politics"
                    placeholder="请选择政治面貌"
                    dict="政治面貌"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="6" :md="12" :sm="24" :xs="24">
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
            <a-alert message="Informational Notes" type="info"
                     description="Detailed description and advices about successful copywriting."
                     show-icon/>
            <br/>
          </div>

        </template>

        <template #operate="{ row }">
          <a-space>
            <a @click="editEvent(row)">修改</a>
            <a-divider type="vertical"/>
            <a class="ele-text-success" @click="editEvent2(row.eid)">修改独立页</a>
            <a-divider type="vertical"/>
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
              <span>新建弹窗</span>
            </a-button>
            <a-button type="primary" @click="improtExcel()">
              <template #icon>
                <plus-outlined/>
              </template>
              <span>批量导入</span>
            </a-button>
            <a-button type="primary" @click="addEvent2()">
              <template #icon>
                <plus-outlined/>
              </template>
              <span>新建独立页</span>
            </a-button>
            <a-button type="danger" @click="batchDeleteEvent()">
              <template #icon>
                <delete-outlined/>
              </template>
              <span>批量删除</span>
            </a-button>
            <a-button @click="gridOptions.sortConfig.multiple=!gridOptions.sortConfig.multiple">
              <template #icon>
                <upload-outlined/>
              </template>
              <span>{{ gridOptions.sortConfig.multiple === false ? '单' : '多' }}字段排序</span>
            </a-button>
          </a-space>
        </template>
      </vxe-grid>

      <!--编辑弹窗-->
      <vxe-modal v-model="tsStudentInfoListApp.editModalShowing" ref="tsStudentInfoEditModal"
                 :title="gridOptions.showEditTitle"
                 id="tsStudentInfoEditModal"
                 width="800" height="400" min-width="460" min-height="320" :lock-view="false" :mask="false"
                 show-footer show-zoom resize remember storage transfer dblclickZoom
                 :destroy-on-close="true"
      >
        <template #default>
          <div id="tsStudentInfoEditModalContent">
          </div>
        </template>
        <template #footer>
          <div id="tsStudentInfoEditModalFooter">
          </div>
          <teleport to="#tsStudentInfoEditModalContent">
            <tsStudentInfo-edit ref="tsStudentInfo-edit"/>
          </teleport>
        </template>
      </vxe-modal>

      <!--      导入弹窗-->
      <vxe-modal v-model="excelDemo.displayDemo" id="myModal6" width="100%" height="100%" transfer
                 @close="importCancel()">
        <template #title>
          <span style="color: red;">excel内容解析预览</span>
        </template>

        <template #default>
          <vxe-grid ref="xGrid1" v-bind="gridOptions1">
            <template #toolbar>
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button status="primary" icon="fa fa-download" @click="impotEvent">选择文件</vxe-button>
                </template>
              </vxe-toolbar>
            </template>
          </vxe-grid>
          <div style="width: 100%;height: 95%;">
            <vxe-table
              highlight-hover-row
              border
              ref="xTable"
              height="82%"
              :column-config="{
                isCurrent:true,
              }"
              :export-config="{}"
              :data="excelDemo.data">
              <vxe-table-column type="seq" width="50"></vxe-table-column>
              <vxe-table-column field="姓名" title="姓名" sortable></vxe-table-column>
              <vxe-table-column field="学号" title="学号" sortable></vxe-table-column>
              <vxe-table-column field="政治面貌" title="政治面貌" sortable></vxe-table-column>
              <vxe-table-column field="学院" title="学院" sortable></vxe-table-column>
              <vxe-table-column field="专业" title="专业" sortable></vxe-table-column>
              <vxe-table-column field="年级" title="年级" sortable></vxe-table-column>
              <vxe-table-column field="班级" title="班级" sortable></vxe-table-column>
              <vxe-table-column field="邮箱" title="邮箱" sortable></vxe-table-column>
              <vxe-table-column field="联系电话" title="联系电话" sortable></vxe-table-column>
              <template #empty>
               <span style="color: red;">
                 <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">
                <p>没有更多数据了！</p>
                </span>
              </template>
            </vxe-table>
            <div style="margin-top: 1%">
              <vxe-button status="warning" content="取消" style="margin-left: 85%;margin-top: 1%;margin-bottom: 1%"
                          @click="importCancel()"></vxe-button>
              <a-button type="primary" @click="importToDataSource()"
                        style="margin-left: 2%;margin-top: 1%;margin-bottom: 1%"><span>导入数据库</span></a-button>
            </div>
          </div>
        </template>


      </vxe-modal>

      <!--查看弹窗-->
      <vxe-modal v-model="tsStudentInfoListApp.viewModalShowing" :title="gridOptions.showDetailsTitle"
                 id="tsStudentInfoViewModal"
                 width="600"
                 min-width="460"
                 min-height="320"
                 :destroy-on-close="true"
                 :lock-view="false" :mask="false"
                 footer
                 show-footer show-zoom resize remember storage transfer dblclickZoom>
        <template #default>
          <tsStudentInfo-detail ref="tsStudentInfo-detail"/>
        </template>
      </vxe-modal>
    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, provide} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import XEAjax from 'xe-ajax'
import {TsStudentInfoService} from "@/views/tms/tsstudentEntity/tsStudentInfo/tsStudentInfoService";
import TsStudentInfoEdit
  from "@/views/tms/tsstudentEntity/tsStudentInfo/tsStudentInfo-edit";
import TsStudentInfoDetail
  from "@/views/tms/tsstudentEntity/tsStudentInfo/tsStudentInfo-detail";
import {
  PlusOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";

import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";
import XLSX from 'xlsx'

export default defineComponent({
  components: {
    TsStudentInfoEdit,
    TsStudentInfoDetail,
    DownOutlined,
    DeleteOutlined,
    PlusOutlined,
    UpOutlined,
    MDictSelect,
    MEntitySelect,
  },
  setup() {
    const router = useRouter();
    const tsStudentInfoGrid = ref({})// as VxeGridInstance
    // 搜索表单是否展开
    let searchExpand = ref(false)
    let proxyInfo = reactive({})
    const where = ref({})
    const eid = ref({})
    const xGrid1 = ref({})
    const excelDemo = reactive({
      displayDemo: false,
      data: [],
      properties: [],
    })
    const gridOptions1 = reactive({
      border: false,
      height: 0,
      emptyText: "学生信息预览"
    })
    const startIndex = ref({})
    const tsStudentInfoListApp = reactive({
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
      id: 'tsStudentInfosGrid',
      // maxHeight: "100%",//表格高度
      height: 800,
      rowId: 'eid',
      selectRow: null,
      showEdit: false,
      showDetails: false,
      showEditTitle: '新建',
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
            const $grid = tsStudentInfoGrid.value
            $grid.queryParams = queryParams
            return TsStudentInfoService.findTsStudentInfos(queryParams).catch(error => {
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
          field: 'studentId',
          title: '学号',
          sortable: true
        },
        {
          field: 'name',
          title: '姓名',
          sortable: true
        },
        {
          field: 'collegeName',
          title: '学院',
          sortable: true
        },
        {
          field: 'major',
          title: '专业',
          sortable: true
        },
        {
          field: 'grade',
          title: '年级',
          sortable: true
        },
        {
          field: 'classGrade',
          title: '班级',
          sortable: true
        },
        {
          field: 'contactTel',
          title: '联系电话',
          sortable: true
        },
        {
          field: 'email',
          title: '联系邮箱',
          sortable: true
        },
        {
          field: 'politics',
          title: '政治面貌',
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
          const $grid = tsStudentInfoGrid.value
          const formBody = new FormData()
          formBody.append('file', file)
          return XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/import', formBody).then(data => {
            VXETable.modal.message({content: `成功导入 ${data.result.insertRows} 条记录！`, status: 'success'})
            // 导入完成，刷新表格
            $grid.commitProxy('query')
          }).catch(() => {
            VXETable.modal.message({content: '导入失败，请检查数据是否正确！', status: 'error'})
          })
        }
      },
      /*TODO:导出配置*/
      exportConfig: {
        remote: true,
        types: ['xlsx', 'csv', 'html', 'txt', 'pdf'],
        modes: ['current', 'selected', 'all'],
        // 自定义服务端导出
        exportMethod({options}) {
          const $grid = tsStudentInfoGrid.value
          const proxyInfo = $grid.getProxyInfo()
          const queryParams = $grid.queryParams;
          // 传给服务端的参数
          const body = {
            ...queryParams,
            filename: options.filename,
            sheetName: options.sheetName,
            isHeader: options.isHeader,
            original1: options.original,
            mode: options.mode,
            pager: proxyInfo ? proxyInfo.pager : null,
            ids: options.mode === 'selected' ? options.data.map((item) => item.id) : [],
            fields: '%7B%22field%22:%22nickname%22,%22title%22:%22Nickname%22%7D&fields[]=%7B%22field%22:%22sex%22ge%22,%22title%22:%22Age%22%7D&fimount%22,%22title%22:%22Amount%22%7D&fields[]=%7B%22field'
          }

          // 开始服务端导出
          return TsStudentInfoService.findTsStudentInfosForExport(body).then(data => {
            VXETable.modal.message({content: `成功${data}`, status: 'error'});
            // if (data.id) {
            // VXETable.modal.message({ content: '导出成功，开始下载', status: 'success' })
            // // 读取路径，请求文件
            // fetch(`https://api.xuliangzhan.com:10443/demo/api/pub/export/download/\${data.id}`).then(response => {
            //   response.blob().then(blob => {
            //     // 开始下载
            //     VXETable.saveFile({ filename: '导出数据', type: 'xlsx', content: blob })
            //   })
            // })
            // }
          }).catch(error => {
            VXETable.modal.message({content: `导出失败，原因是：${error.message}`, status: 'error'});

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
    provide('tsStudentInfoListApp', tsStudentInfoListApp)
    provide('gridOptions', gridOptions)

    /*TODO:新建事件*/
    const addEvent = () => {
      tsStudentInfoListApp.editModalShowing = true
      tsStudentInfoListApp.currentId = null;
      tsStudentInfoListApp.addModalForEdit = true;
      gridOptions.showEditTitle = "新建";
    }

    /*TODO:新建独立页*/
    const addEvent2 = () => {
      router.push(`/tms/tsstudentEntity/tsStudentInfo/tsStudentInfo-add`);
    }
    /*TODO:编辑事件*/
    const editEvent = (row) => {
      tsStudentInfoListApp.editModalShowing = true
      tsStudentInfoListApp.currentId = row.eid;
      tsStudentInfoListApp.editModalForEdit = true;
      gridOptions.showEditTitle = "编辑";
    }
    /*TODO:编辑独立页*/
    const editEvent2 = (eid) => {
      router.push(`/tms/tsstudentEntity/tsStudentInfo/tsStudentInfo-edit/${eid}`);
    }

    /*TODO:编辑关闭事件*/
    const editEventClose = () => {
      console.log(gridOptions.formData);
      VXETable.modal.message({content: '提交成功', status: 'success'})
    }

    /*TODO:查看事件*/
    const viewEvent = (row) => {
      tsStudentInfoListApp.currentId = row.eid;
      tsStudentInfoListApp.viewModalShowing = true
      gridOptions.showDetailsTitle = '查看';
    }

    /*TODO:删除事件*/
    const deleteEvent = (row) => {
      TsStudentInfoService.deleteTsStudentInfo(row.eid).then(() => {
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
      const $grid = tsStudentInfoGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }
    /*TODO:重置搜索*/
    const reset = () => {
      where.value = {}
      const $grid = tsStudentInfoGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }

    const improtExcel = () => {
      excelDemo.displayDemo = true
    }

    const importCancel = () => {
      excelDemo.displayDemo = false
    }

    const impotEvent = async () => {
      const $grid = xGrid1.value
      const {files} = await $grid.readFile({
        types: ['xls', 'xlsx']
      })
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const data = event.target ? event.target.result : ''
        const workbook = XLSX.read(data, {type: 'binary'})
        const csvData = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)
        // let temp={}
        let result = []
        let index = 0
        let propertiesList = ["序号", "姓名", "学号", "政治面貌", "学院", "专业", "年级", "班级", "邮箱", "联系电话"]
        let flag = true;
        //map去重
        csvData.map((item) => {
          result.push(item)
          console.log(result)
          // if (!temp[item["name"], !item["studentId"], !item["politics"],!item["college"], !item["major"], !item["grade"], !item["class"], !item["email"], !item["contactTel"]]){
          //   result.push(item)
          //   temp[item["name"],item["studentId"],item["politics"],item["college"], item["major"], item["garde"], item["class"], item["email"], item["contactTel"]]=true
          // }
        })
        //得到表格表头
        csvData.forEach((value) => {
          if (index == 1) {
            return
          }
          excelDemo.properties = Object.keys(value)
          index++;
        })
        //判断导入excel格式
        excelDemo.properties.forEach((value => {
          if (propertiesList.indexOf(value) == -1) {
            flag = false
          }
        }))
        if (flag && excelDemo.properties.length == propertiesList.length) {
          excelDemo.data = result
          VXETable.modal.message({content: '数据解析成功！', status: 'success'})
        } else {
          VXETable.modal.message({content: '导入excel格式不正确！', status: 'error'})
        }
      }
      fileReader.readAsBinaryString(files[0])
    }

    const importToDataSource = () => {
      var jsonStr = JSON.stringify(excelDemo.data)
      if (excelDemo.data.length == 0) {
        VXETable.modal.message({content: '无数据，禁止操作', status: 'error'})
      } else {
        TsStudentInfoService.mutiImport(JSON.parse(jsonStr)).then((res) => {
          console.log(res)
          VXETable.modal.message({content: '操作成功', status: 'success'})
        })
      }
      excelDemo.data = []
      excelDemo.displayDemo = false
    }

    //TODO:这里需要返回才能调用
    return {
      eid,
      tsStudentInfoGrid,
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
      tsStudentInfoListApp,
      ...toRefs(proxyInfo),
      improtExcel,
      excelDemo,
      impotEvent,
      xGrid1,
      gridOptions1,
      importCancel,
      importToDataSource
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
</style>
