<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <vxe-grid ref='appraisingGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
          <a-form
            :model="where"
            :label-col="{md: {span: 8}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 16}, sm: {span: 24}}">
            <a-row>


              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="申报项目名称:" name="targetNameId">
                  <m-entity-select
                    v-model:value="where.targetNameId"
                    placeholder="请选择申报项目名称"
                    module="appraisingTypeEntity"
                    entity="AppraisingType"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="申报人:" name="studentId">
                  <m-entity-select
                    v-model:value="where.studentId"
                    placeholder="请选择申报人"
                    module="studentEntity"
                    entity="StudentInfo"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="性别:" name="sex">
                  <m-dict-select
                    v-model:value="where.sex"
                    placeholder="请选择性别"
                    dict="性别"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="申报人学院:" name="collegeId">
                  <m-entity-select
                    v-model:value="where.collegeId"
                    placeholder="请选择申报人学院"
                    module="collegeEntity"
                    entity="College"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="申报人专业:" name="major">
                  <a-input
                    v-model:value="where.major"
                    :maxlength="255"
                    placeholder="请输入申报人专业"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="申报人年级:" name="grade">
                  <a-input
                    v-model:value="where.grade"
                    :maxlength="255"
                    placeholder="请输入申报人年级"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="辅导员:" name="instructor">
                  <a-input
                    v-model:value="where.instructor"
                    :maxlength="255"
                    placeholder="请输入辅导员"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="民族:" name="nation">
                  <a-input
                    v-model:value="where.nation"
                    :maxlength="255"
                    placeholder="请输入民族"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="政治面貌:" name="political">
                  <a-input
                    v-model:value="where.political"
                    :maxlength="255"
                    placeholder="请输入政治面貌"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="担任的职务:" name="job">
                  <a-input
                    v-model:value="where.job"
                    :maxlength="255"
                    placeholder="请输入担任的职务"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>


              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="有无校级以上处分:" name="schoolPunishment">
                  <m-dict-select
                    v-model:value="where.schoolPunishment"
                    placeholder="请选择有无校级以上处分"
                    dict="有无"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="有无违纪处分:" name="punishment">
                  <m-dict-select
                    v-model:value="where.punishment"
                    placeholder="请选择有无违纪处分"
                    dict="有无"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="不及格科目数(全学年):" name="failedSubjects">
                  <a-input-number
                    v-model:value="where.failedSubjects"
                    placeholder="请输入不及格科目数(全学年)"
                    :min="0"
                    :step="1"
                    class="ele-fluid">
                  </a-input-number>
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="是否曾是文明寝室成员:" name="isCivilizedDormitory">
                  <m-dict-select
                    v-model:value="where.isCivilizedDormitory"
                    placeholder="请选择是否曾是文明寝室成员"
                    dict="是否"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>


              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="学院负责人:" name="collegeOpinion">
                  <a-input
                    v-model:value="where.collegeOpinion"
                    :maxlength="255"
                    placeholder="请输入学院负责人"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="学校负责人:" name="schoolOpinion">
                  <a-input
                    v-model:value="where.schoolOpinion"
                    :maxlength="255"
                    placeholder="请输入学校负责人"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="日期:" name="date">
                  <a-date-picker
                    v-model:value="where.date"
                    placeholder="请选择日期"
                    value-format="YYYY-MM-DD H:m:s"
                    class="ele-fluid"/>
                </a-form-item>
              </a-col>


              <a-col v-if="searchExpand" :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label="审核状态:" name="auditStatus">
                  <m-dict-select
                    v-model:value="where.auditStatus"
                    placeholder="请选择审核状态"
                    dict="审核状态"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <!--              <a-col v-if="searchExpand" :lg="6" :md="12" :sm="24"-->
              <!--                     :xs="24">-->
              <!--                <a-form-item label="审核人:" name="reviewerId">-->
              <!--                  <m-entity-select-->
              <!--                    v-model:value="where.reviewerId"-->
              <!--                    placeholder="请选择审核人"-->
              <!--                    module="appraisingEntity"-->
              <!--                    entity="User"-->
              <!--                    class="ele-fluid"-->
              <!--                  />-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->


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

        状态样式设置
        <template #auditStatus="{ row }">
          <a-tag v-if="row.auditStatus==='审核通过'" color="green">{{ row.auditStatus }}</a-tag>
          <a-tag v-if="row.auditStatus==='驳回'" color="red">{{ row.auditStatus }}</a-tag>
          <a-tag v-if="row.auditStatus==='未审核'" color="blue">{{ row.auditStatus }}</a-tag>
        </template>

        <template #operate="{ row }">
          <a-space>
            <a @click="editEvent(row)">修改</a>
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
      <vxe-modal v-model="appraisingListApp.editModalShowing" ref="appraisingEditModal"
                 :title="gridOptions.showEditTitle"
                 id="appraisingEditModal"
                 width="800" height="400" min-width="460" min-height="320" :lock-view="false" :mask="false"
                 show-footer show-zoom resize remember storage transfer dblclickZoom
                 :destroy-on-close="true"
      >
        <template #default>
          <div id="appraisingEditModalContent">
          </div>
        </template>
        <template #footer>
          <div id="appraisingEditModalFooter">
          </div>
          <teleport to="#appraisingEditModalContent">
            <appraising-edit ref="appraising-edit"/>
          </teleport>
        </template>
      </vxe-modal>

      <!--查看弹窗-->
      <vxe-modal v-model="appraisingListApp.viewModalShowing" :title="gridOptions.showDetailsTitle"
                 id="appraisingViewModal"
                 width="600"
                 min-width="460"
                 min-height="320"
                 :destroy-on-close="true"
                 :lock-view="false" :mask="false"
                 footer
                 show-footer show-zoom resize remember storage transfer dblclickZoom>
        <template #default>
          <appraising-detail ref="appraising-detail"/>
        </template>
      </vxe-modal>
    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, provide} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import XEAjax from 'xe-ajax'
import {AppraisingService} from "@/views/ams/appraisingEntity/appraising/appraisingService";
import AppraisingEdit
  from "@/views/ams/appraisingEntity/appraising/appraising-edit";
import AppraisingDetail
  from "@/views/ams/appraisingEntity/appraising/appraising-detail";
import {
  PlusOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";

import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";

export default defineComponent({
  components: {
    AppraisingEdit,
    AppraisingDetail,
    DownOutlined,
    DeleteOutlined,
    PlusOutlined,
    UpOutlined,
    MDictSelect,
    MEntitySelect,
  },
  setup() {
    const router = useRouter();
    const appraisingGrid = ref({})// as VxeGridInstance
    // 搜索表单是否展开
    let searchExpand = ref(false)
    let proxyInfo = reactive({})
    const where = ref({})
    const eid = ref({})
    const startIndex = ref({})
    const appraisingListApp = reactive({
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
      id: 'appraisingsGrid',
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
            const $grid = appraisingGrid.value
            $grid.queryParams = queryParams
            return AppraisingService.findAppraisings(queryParams).catch(error => {
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
          field: 'targetNameName',
          title: '申报项目名称',
          sortable: true
        },
        {
          field: 'studentName',
          title: '申报人',
          sortable: true,
          fixed:'left'

        },
        {
          field: 'sex',
          title: '性别',
          sortable: true
        },
        {
          field: 'collegeName',
          title: '申报人学院',
          sortable: true
        },
        {
          field: 'major',
          title: '申报人专业',
          sortable: true
        },
        {
          field: 'grade',
          title: '申报人年级',
          sortable: true
        },
        {
          field: 'instructor',
          title: '辅导员',
          sortable: true
        },
        {
          field: 'nation',
          title: '民族',
          sortable: true
        },
        {
          field: 'political',
          title: '政治面貌',
          sortable: true
        },
        {
          field: 'job',
          title: '担任的职务',
          sortable: true
        },
        {
          field: 'firstAverageScore',
          title: '第一学期平均成绩排名',
          sortable: true
        },
        {
          field: 'secondAverageScore',
          title: '第一学期平均成绩排名',
          sortable: true
        },
        {
          field: 'fristScholarshipRanking',
          title: '第一学期奖学金排名',
          sortable: true
        },
        {
          field: 'secondScholarshipRanking',
          title: '第二学期奖学金排名',
          sortable: true
        },
        {
          field: 'englishScore',
          title: '英语成绩',
          sortable: true
        },
        {
          field: 'computerScore',
          title: '计算机成绩',
          sortable: true
        },
        {
          field: 'firstSportsScore',
          title: '体育成绩',
          sortable: true
        },
        {
          field: 'secondSportsScore',
          title: '体育成绩',
          sortable: true
        },
        {
          field: 'schoolPunishment',
          title: '有无校级以上处分',
          sortable: true
        },
        {
          field: 'punishment',
          title: '有无违纪处分',
          sortable: true
        },
        {
          field: 'failedSubjects',
          title: '不及格科目数(全学年)',
          sortable: true
        },
        {
          field: 'isCivilizedDormitory',
          title: '是否曾是文明寝室成员',
          sortable: true
        },
        {
          field: 'award',
          title: '获奖情况',
          sortable: true
        },
        {
          field: 'deeds',
          title: '主要突出事迹',
          sortable: true
        },
        {
          field: 'collegeOpinion',
          title: '学院负责人',
          sortable: true
        },
        {
          field: 'schoolOpinion',
          title: '学校负责人',
          sortable: true
        },
        {
          field: 'prove',
          title: '证明材料',
          sortable: true
        },
        {
          field: 'mark1',
          title: '分数1',
          sortable: true
        },
        {
          field: 'mark2',
          title: '分数2',
          sortable: true
        },
        {
          field: 'ranking',
          title: '评选排名',
          sortable: true
        },
        {
          field: 'date',
          title: '日期',
          sortable: true
        },
        {
          field: 'auditStatus',
          title: '审核状态',
          sortable: true,
          slots:{default: 'auditStatus'},
          fixed:'right'
        },
        {
          field: 'reviewerId',
          title: '审核人',
          sortable: true
        },
        {
          field: 'feedBack',
          title: '审核意见',
          sortable: true
        },
        {title: '操作', width: 180, slots: {default: 'operate'},fixed: 'right'}
      ],
      /*TODO:导入配置*/
      importConfig: {
        remote: true,
        types: ['xlsx'],
        modes: ['insert'],
        // 自定义服务端导入
        importMethod({file}) {
          const $grid = appraisingGrid.value
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
          const $grid = appraisingGrid.value
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
          return AppraisingService.findAppraisingsForExport(body).then(data => {
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
    provide('appraisingListApp', appraisingListApp)
    provide('gridOptions', gridOptions)

    /*TODO:新建事件*/
    const addEvent = () => {
      appraisingListApp.editModalShowing = true
      appraisingListApp.currentId = null;
      appraisingListApp.addModalForEdit = true;
      gridOptions.showEditTitle = "新建";
    }

    /*TODO:新建独立页*/
    const addEvent2 = () => {
      router.push(`/ams/appraisingEntity/appraising/appraising-add`);
    }
    /*TODO:编辑事件*/
    const editEvent = (row) => {
      appraisingListApp.editModalShowing = true
      appraisingListApp.currentId = row.eid;
      appraisingListApp.editModalForEdit = true;
      gridOptions.showEditTitle = "编辑";
    }
    /*TODO:编辑独立页*/
    const editEvent2 = (eid) => {
      router.push(`/ams/appraisingEntity/appraising/appraising-edit/${eid}`);
    }

    /*TODO:编辑关闭事件*/
    const editEventClose = () => {
      console.log(gridOptions.formData);
      VXETable.modal.message({content: '提交成功', status: 'success'})
    }

    /*TODO:查看事件*/
    const viewEvent = (row) => {
      appraisingListApp.currentId = row.eid;
      appraisingListApp.viewModalShowing = true
      gridOptions.showDetailsTitle = '查看';
    }

    /*TODO:删除事件*/
    const deleteEvent = (row) => {
      AppraisingService.deleteAppraising(row.eid).then(() => {
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
      const $grid = appraisingGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }
    /*TODO:重置搜索*/
    const reset = () => {
      where.value = {}
      const $grid = appraisingGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }

    //TODO:这里需要返回才能调用
    return {
      eid,
      appraisingGrid,
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
      appraisingListApp,
      ...toRefs(proxyInfo)
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
