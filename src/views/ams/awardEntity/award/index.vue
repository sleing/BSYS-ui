<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <vxe-grid ref='awardGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
          <a-p style="color: #0b8be0;padding-left: 0%;padding-top: 5%;font-size: 18px;font-style: normal;">搜索获奖信息：</a-p>

          <a-form
            :model="where"
            :label-col="{md: {span: 7}, sm: {span: 6}}"
            :wrapper-col="{md: {span: 17}, sm: {span: 12}}"
            class="searchForm">
            <a-row>
              <a-col :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="竞赛名称:" name="competitionNameId">
                  <m-entity-select
                    v-model:value="where.competitionNameId"
                    placeholder="请选择比赛项目名称"
                    module="competitionEntity"
                    entity="Competition"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="审核 状态:" name="auditStatus">
                  <m-dict-select
                    v-model:value="where.auditStatus"
                    placeholder="请选择审核状态"
                    dict="审核状态"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col  :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="获奖日期:" name="awardDate"
                             :label-col="{span:7}"
                             :wrapper-col="{span:17}">
                  <a-range-picker
                    v-model:value="where.awardDate"
                    value-format="YYYY-MM-DD"
                    class="ele-fluid"
                    type="date"
                    @change="checkedTime"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="负 责 人:" name="firstAwardeeId">
                  <m-entity-select
                    v-model:value="where.firstAwardeeId"
                    placeholder="请输入负责人姓名查找"
                    module="studentEntity"
                    entity="StudentInfo"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="参赛队名:" name="workName">
                  <a-input
                    v-model:value="where.workName"
                    :maxlength="255"
                    placeholder="请输入作品名/参赛队名"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="证书编号:" name="certificateNo">
                  <a-input
                    v-model:value="where.certificateNo"
                    :maxlength="255"
                    placeholder="请输入证书编号"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="竞赛组别:" name="competitionGroup">
                  <a-input
                    v-model:value="where.competitionGroup"
                    :maxlength="255"
                    placeholder="请输入竞赛组别"
                    allow-clear
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="获奖级别:" name="awardLevel">
                  <m-dict-select
                    v-model:value="where.awardLevel"
                    placeholder="请选择获奖级别"
                    dict="获奖级别"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="获奖等级:" name="awardGrade">
                  <m-dict-select
                    v-model:value="where.awardGrade"
                    placeholder="请选择获奖等级"
                    dict="获奖等级"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="获奖类别:" name="competitionCategory">
                  <m-dict-select
                    v-model:value="where.competitionCategory"
                    placeholder="请选择类别"
                    dict="竞赛类别"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>

              <!--              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"-->
              <!--                     :xs="12">-->
              <!--                <a-form-item label="举办单位等级:" name="competitionLevel">-->
              <!--                  <m-dict-select-->
              <!--                    v-model:value="where.competitionLevel"-->
              <!--                    placeholder="请选择举办单位等级"-->
              <!--                    dict="举办单位等级"-->
              <!--                    class="ele-fluid"-->
              <!--                  />-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->

              <a-col v-if="searchExpand" :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="举办单位:" name="organizationId">
                  <m-entity-select
                    v-model:value="where.organizationId"
                    placeholder="请选择举办单位"
                    module="awardEntity"
                    entity="Unit"
                    class="ele-fluid"
                  />
                </a-form-item>
              </a-col>


              <a-col :lg="8" :md="8" :sm="12"
                     :xs="12">
                <a-form-item label="指导教师:" name="firstInstructorId">
                  <m-entity-select
                    v-model:value="where.firstInstructorId"
                    placeholder="请输入第一指导教师姓名查找"
                    module="teacherEntity"
                    entity="TeacherInfo"
                    class="ele-fluid"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <a-form-item class="ele-text-right" :wrapper-col="{span: 24}">
                  <a-space>
                    <a-button type="primary" @click="reload">查询信息</a-button>
                    <a-button type="primary" @click="reset">重置信息</a-button>
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

        <!--        &lt;!&ndash;自定义按钮&ndash;&gt;
                <template #bottom>
                  <div>
                    <br/>
                    <a-alert message="Informational Notes" type="info"
                             description="Detailed description and advices about successful copywriting."
                             show-icon/>
                    <br/>
                  </div>
                </template>-->

        状态样式设置
        <template #auditStatus="{ row }">
          <a-tag v-if="row.auditStatus==='审核通过'" color="green" title-align="center"><CheckCircleOutlined /> {{ row.auditStatus }}</a-tag>
          <a-tag v-if="row.auditStatus==='驳回'" color="red"><CloseSquareOutlined /> {{ row.auditStatus }}</a-tag>
          <a-tag v-if="row.auditStatus==='未审核'" color="orange"><ExclamationCircleOutlined /> {{ row.auditStatus }}</a-tag>
        </template>
        <template #competitionNameName="{ row }">
          <a-tag color="green"><TrophyOutlined /> {{ row.competitionNameName }}</a-tag>
        </template>
        <template #firstAwardeeName="{ row }">
          <a-tag color="orange"><UserOutlined /> {{ row.firstAwardeeName }}</a-tag>
        </template>
        <template #allStudents="{ row }">
          <a-tag color="orange"> <TeamOutlined /> {{ row.allStudents }}</a-tag>
        </template>
        <template #allInstructors="{ row }">
          <a-tag color="orange"> <TeamOutlined /> {{ row.allInstructors }}</a-tag>
        </template>
        <template #firstInstructorName="{ row }">
          <a-tag color="orange" v-if="row.firstInstructorName"> {{ row.firstInstructorName }}</a-tag>
        </template>

        <template #operate="{ row }">
          <a-space>
            <a-divider type="vertical"/>
            <a class="ele-text-warning" @click="viewEvent(row)">查看</a>
            <a-divider type="vertical" v-if="row.auditStatus==='未审核' ||row.auditStatus==='驳回'"/>
            <a @click="editEvent(row)" v-if="row.auditStatus==='未审核'||row.auditStatus==='驳回'">修改</a>
            <a-divider type="vertical" v-if="row.auditStatus==='未审核' ||row.auditStatus==='驳回'"/>
            <a-popconfirm
              title="确定要删除此记录吗？"
              @confirm="deleteEvent(row)">
              <a class="ele-text-danger" v-if="row.auditStatus==='未审核'||row.auditStatus==='驳回'">删除</a>
            </a-popconfirm>
          </a-space>
        </template>

        <!--TODO:自定义列模板-->
        <template #dddd="{  }">
          <a href="http://showdoc.cqcflq.com/">文档地址</a>
        </template>

        <template #ycs>
          <a-space>
            <a-button type="primary" @click="addEvent()" v-if="!awardListApp.isAdmin">
              <template #icon>
                <plus-outlined/>
              </template>
              <span>新增获奖信息</span>
            </a-button>
          </a-space>
          <a-space style="margin-left: 10px;">
<!--            <a-button type="primary" @click="reload">点击查询</a-button>-->
<!--            <a-button type="primary" @click="reset">重置查询</a-button>-->
            <a-button type="primary" @click="downloadMould" v-if="!awardListApp.isAdmin">资源包模板下载</a-button>
<!--            <a @click="searchExpand = !searchExpand">-->
<!--              <span v-if="searchExpand">收起 <up-outlined class="ele-text-small"/></span>-->
<!--              <span v-else>展开 <down-outlined class="ele-text-small"/></span>-->
<!--            </a>-->
          </a-space>
        </template>
      </vxe-grid>

      <!--编辑弹窗-->
      <vxe-modal v-model="awardListApp.editModalShowing" ref="awardEditModal"
                 :title="gridOptions.showEditTitle"
                 id="awardEditModal"
                 width="1000" height="600" min-width="460" min-height="320" :lock-view="false" :mask="false"
                 show-footer show-zoom resize remember storage transfer dblclickZoom
                 :destroy-on-close="true"
      >
        <template #default>
          <div id="awardEditModalContent">
          </div>
        </template>
        <template #footer>
          <div id="awardEditModalFooter">
          </div>
          <teleport to="#awardEditModalContent">
            <award-edit ref="award-edit"/>
          </teleport>
        </template>
      </vxe-modal>

      <!--查看弹窗-->
      <vxe-modal v-model="awardListApp.viewModalShowing" :title="gridOptions.showDetailsTitle"
                 id="awardViewModal"
                 width="600"
                 min-width="460"
                 min-height="320"
                 :destroy-on-close="true"
                 :lock-view="false" :mask="false"
                 footer
                 show-footer show-zoom resize remember storage transfer dblclickZoom>
        <template #default>
          <award-detail ref="award-detail"/>
        </template>
      </vxe-modal>

      <!--测试弹窗-->
      <vxe-modal v-model="awardListApp.testShow" title="温馨提示" width="350" height="230"
                 resize destroy-on-close>
        <!--      <template #default>-->
        <!--        -->
        <!--      </template>-->
        <div class="testDiv">
          <img class="testImg" src="@/assets/img/OIP-C.jpg">
          <p class="testP1">
            请确保您是负责人，
            是否继续?
          </p>
          <p class="testP2">
            【一个队伍只允许负责人新增获奖信息】
          </p>
          <p class="testP3">
            【所有人都可在我的获奖中查看审核通过的信息】
          </p>
          <a-button class="testButton" @click="continueCreate()">继续创建</a-button>
          <br>
          <a class="testA" @click="awardListApp.testShow = false">我还没想好，暂时放弃创建</a>
        </div>
      </vxe-modal>

    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, onMounted, provide} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import axios from "axios";
import XEAjax from 'xe-ajax'
import {AwardService} from "@/views/ams/awardEntity/award/awardService";
import FileSaver from "file-saver";
import AwardEdit
  from "@/views/ams/awardEntity/award/award-edit";
import AwardDetail
  from "@/views/ams/awardEntity/award/award-detail";
import {
  PlusOutlined,
  DownOutlined,
  UpOutlined,
  TeamOutlined,
  UserOutlined,
  TrophyOutlined,
  CloseSquareOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";

import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";
import setting from "@/config/setting";

export default defineComponent({
  components: {
    AwardEdit,
    AwardDetail,
    DownOutlined,
    PlusOutlined,
    UpOutlined,
    MDictSelect,
    MEntitySelect,
    TeamOutlined,
    UserOutlined,
    TrophyOutlined,
    CloseSquareOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
  },
  setup() {
    const router = useRouter();
    const awardGrid = ref({})// as VxeGridInstance
    // 搜索表单是否展开
    let searchExpand = ref(false)
    let proxyInfo = reactive({})
    const where = ref({})
    const eid = ref({})
    const startIndex = ref({})
    const time = reactive({
      startTime:"",
      endTime:"",
    })
    const awardListApp = reactive({
      editModalShowing: false,
      viewModalShowing: false,
      editModalForEdit: false,
      addModalForEdit: false,
      isAdmin: false,
      testShow: false,
      awardees: [],
      tableRefresh: function () {
        reload()
      }
    })
    const gridOptions = reactive({
      border: true,
      resizable: true,
      showHeaderOverflow: true,
      showOverflow: true,
      highlightHoverRow: true,
      keepSource: true,
      id: 'awardsGrid',
      // maxHeight: "100%",//表格高度
      height: 800,
      rowId: 'eid',
      awardDate:'awardDate',
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
        import: false,
        export: false,
        print: false,
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
            //解决时间组件清除按钮bug
            if (conditions.awardDate && conditions.awardDate.length === 0) {
              conditions.awardDate = null;
            }

            const queryParams = {}
            queryParams.currentPage = page.currentPage
            queryParams.pageSize = page.pageSize
            // queryParams.createTimeStart = time.startTime
            // queryParams.createTimeEnd =time.endTime
            startIndex.value = (queryParams.currentPage - 1) * queryParams.pageSize + 1
            // // 处理筛选条件
            queryParams.filters = conditions;
            // // 处理排序条件
            queryParams.orderBys = sorts;
            //
            const $grid = awardGrid.value
            $grid.queryParams = queryParams
            return AwardService.findAwards(queryParams).then((res)=>{
              //console.log("1111:",time.startTime);
              //console.log("2222:",time.endTime);
              //console.log("conditions:",conditions);
                return res
            }).catch(error => {
              VXETable.modal.message({content: `加载数据出错，原因是：${error.message}`, status: 'error'});
            })
          },
        }
      },

      /*TODO:数据表列*/
      columns: [
        /*多选checkbox 单选seq*/
        {type: 'seq', title: '#', width: 40, fixed: 'left'},
        {
          field: 'firstAwardeeName',
          title: '负责人姓名',
          sortable: true,
          width: 110,
          fixed: 'left',
          slots: {default: 'firstAwardeeName'},
        },
        {
          field: 'competitionNameName',
          title: '比赛项目名称',
          sortable: true,
          width: 140,
          fixed: 'left',
          slots: {default: 'competitionNameName'},
        },
        {
          field: 'allStudents',
          title: '所有获奖学生',
          sortable: true,
          width: 130,
          slots: {default: 'allStudents'},
        },
        {
          field: 'allInstructors',
          title: '指导教师',
          sortable: true,
          width: 130,
          slots: {default: 'allInstructors'},
        },
        {
          field: 'collegeName',
          title: '负责人学院',
          sortable: true,
          width: 140
        },
        {
          field: 'major',
          title: '负责人专业',
          sortable: true,
          width: 120
        },
        {
          field: 'grade',
          title: '负责人年级',
          sortable: true,
          width: 100
        },
        {
          field: 'contactTel',
          title: '负责人电话',
          sortable: true,
          width: 140
        },
        {
          field: 'workName',
          title: '作品名/参赛队名',
          sortable: true,
          width: 155
        },
        {
          field: 'certificateNo',
          title: '证书编号',
          sortable: true,
          width: 100
        },
        // {
        //   field: 'competitionGroup',
        //   title: '竞赛组别',
        //   sortable: true,
        //   width: 100
        // },
        {
          field: 'awardLevel',
          title: '获奖级别',
          sortable: true,
          width: 100
        },
        {
          field: 'awardGrade',
          title: '获奖等级',
          sortable: true,
          width: 100
        },
        {
          field: 'competitionCategory',
          title: '竞赛类别',
          sortable: true,
          width: 80
        },
        {
          field: 'organizationName',
          title: '举办单位',
          sortable: true,
          width: 100
        },
        {
          field: 'competitionLevel',
          title: '单位等级',
          sortable: true,
          width: 100
        },
        {
          field: 'awardDate',
          title: '获奖日期',
          sortable: true,
          width: 100
        },
        {
          field: 'firstInstructorName',
          title: '第一指导教师',
          sortable: true,
          width: 130,
          slots: {default: 'firstInstructorName'},
        },
        // {
        //   field: 'evidence',
        //   title: '证明文件',
        //   sortable: true,
        //   width: 100
        // },

        {
          field: 'auditStatus',
          title: '审核状态',
          sortable: true,
          width: 110,
          slots: {default: 'auditStatus'},
          fixed: 'right'
        },
        {
          field: 'reviewerName',
          title: '审核人',
          sortable: true,
          width: 90
        },
        {title: '操作', width: 180, slots: {default: 'operate'}, fixed: 'right'}
      ],
      /*TODO:导入配置*/
      importConfig: {
        remote: true,
        types: ['xlsx'],
        modes: ['insert'],
        // 自定义服务端导入
        importMethod({file}) {
          const $grid = awardGrid.value
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
          const $grid = awardGrid.value
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
          return AwardService.findAwardsForExport(body).then(data => {
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
    provide('awardListApp', awardListApp)
    provide('gridOptions', gridOptions)

    onMounted(() => {
      getUser()
    })

    /*TODO:新建事件*/
    const addEvent = () => {
      // awardListApp.editModalShowing = true
      // awardListApp.currentId = null;
      // awardListApp.addModalForEdit = true;
      // gridOptions.showEditTitle = "新增获奖信息";

      awardListApp.testShow = true;
    }

    /*TODO:新建独立页*/
    const addEvent2 = () => {
      router.push(`/ams/awardEntity/award/award-add`);
    }
    /*TODO:编辑事件*/
    const editEvent = (row) => {
      awardListApp.editModalShowing = true
      awardListApp.currentId = row.eid;
      awardListApp.awardees = [];

      awardListApp.editModalForEdit = true;
      gridOptions.showEditTitle = "修改获奖信息";
    }
    /*TODO:编辑独立页*/
    const editEvent2 = (eid) => {
      router.push(`/ams/awardEntity/award/award-edit/${eid}`);
    }

    /*TODO:编辑关闭事件*/
    const editEventClose = () => {
      //console.log(gridOptions.formData);
      VXETable.modal.message({content: '提交成功', status: 'success'})
    }

    /*TODO:查看事件*/
    const viewEvent = (row) => {
      awardListApp.currentId = row.eid;
      awardListApp.viewModalShowing = true
      gridOptions.showDetailsTitle = '查看';
    }

    /*TODO:删除事件*/
    const deleteEvent = (row) => {
      debugger
      AwardService.deleteAward(row.eid).then(() => {
        VXETable.modal.message({content: '操作成功', status: 'success'})
      }).catch(error => {
        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
      })
      setTimeout(function () {
        reload()
      }, 1000);
    }

    /*TODO:批量删除*/
    const batchDeleteEvent = () => {
      VXETable.modal.message({content: '点了批量删除', status: 'success'})
    }
    /*TODO:条件查询提交*/
    const reload = () => {
      const $grid = awardGrid.value
      // $grid.commitProxy('query')//TODO:执行代理方法
      //执行代理方法,查询时传入查询一个isQuery : true,用于查询时重置页码
      $grid.commitProxy('query', ...[true])
    }
    /*TODO:重置搜索*/
    const reset = () => {
      where.value = {}
      const $grid = awardGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }

    // /* 获取当前用户信息 */
    const getUser = () => {
      return new Promise((resolve, reject) => {
        axios.get(setting.userUrl).then((res) => {
          //获取当前用户信息
          const result = setting.parseUser ? setting.parseUser(res.data) : res.data;
          if (result.code === 0) {
            let roles = result.data.roles;
            roles.forEach((value) => {
              //console.log(value)
              if (value == "teacher" || value == "admin") {
                awardListApp.isAdmin = true;
              }
            })
          }
        }).catch((e) => {
          console.error(e);
          this.$message.error(e.message);
          return reject(new Error(e.message));
        })
      })
    }

    //模板下载
    const downloadMould = () => {
      AwardService.down("zhang99999").then((res) => {
        FileSaver.saveAs(
          new Blob([res.data], {type: "application/x-tar"}),
          "竞赛名称+市级二等+队长姓名.zip"
        )
      })
    }

    const continueCreate = () => {
      awardListApp.editModalShowing = true
      awardListApp.currentId = null;
      awardListApp.addModalForEdit = true;
      gridOptions.showEditTitle = "新增获奖信息";
      awardListApp.testShow = false;
    }

    const checkedTime=(value,dateString)=>{
      //console.log("value:",value)
      //console.log("date:",dateString)
      time.startTime=dateString[0];
      time.endTime=dateString[1];
    }


    //TODO:这里需要返回才能调用
    return {
      time,
      checkedTime,
      eid,
      awardGrid,
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
      awardListApp,
      ...toRefs(proxyInfo),
      downloadMould,
      getUser,
      continueCreate,
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

.searchForm {
  margin-left: -40px;
}


.testImg {
  width: 11%;
  height: 11%;
  margin-top: 3%;
  margin-left: 1%;
}

.testP1 {
  /*border: 1px solid black;*/
  margin-left: 15%;
  margin-top: -9%;
  font-size: 15px;
}

.testP2 {
  /*border: 1px solid black;*/
  margin-left: 15%;
  margin-top: -3%;
  font-size: 12px;
  color: red;
}

.testP3 {
  /*border: 1px solid black;*/
  margin-left: 13%;
  font-size: 12px;
  color: red;
  margin-top: 1%;
}

.testButton {
  width: 32%;
  height: 20%;
  margin-top: 0%;
  margin-left: 34%;
  margin-bottom: 1%;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #4877ed;
}

.testA {
  margin-left: 24%;
  margin-top: 3%;
}
</style>
