<template>
  <div class="ele-body">
    <a-space size="middle">
      <!--      <a-button-->
      <!--        class="returnBtn"-->
      <!--        type="primary"-->
      <!--        @click="onBack()">返回-->
      <!--      </a-button>-->
    </a-space>
    <a-space class="header">
    </a-space>

    <a-card :bordered="false">
      <div class="audit">
        <a-p>材&nbsp;料</a-p>
        <a-span> ———— 学生获奖信息材料导出页面</a-span>
      </div>
      <div id="myDiv" onclick="cancel(this)"
           style="position: absolute; display: none; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.2); z-index: 998">
        <div id="popupDiv"
             style="position: absolute; width: 80%; height: 80%; background-color: white; position: absolute; left: 50%; top: 50%; margin-left: -40%; margin-top: -20%;">
          <iframe id="myFrame" frameborder="0"
                  style="position: absolute; width: 100%; height: 100%; border-radius: 3px;"></iframe>
        </div>
      </div>
      <a-span>注：如果表格中数据有 空白 则表示为空</a-span>

      <vxe-grid ref='awardGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
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
                <a-form-item label="获奖日期:" name="awardDate"
                             :label-col="{span:7}"
                             :wrapper-col="{span:17}">
                  <a-range-picker
                    v-model:value="where.awardDate"
                    value-format="YYYY-MM-DD"
                    class="ele-fluid"/>
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

              <a-col :lg="8" :md="8" :sm="12"
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
        <!--自定义按钮-->

        <template #ycs>
          <a-space>
            <a-button type="primary" @click="exportAllAttachment()">
              <template #icon>
                <plus-outlined/>
              </template>
              <span>导出所有附件</span>
            </a-button>
          </a-space>
        </template>

        <template #bottom>
          <div>
            <br/>
            <a-row class="tip1">

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label=" 当前学院：">
                  {{ demo2.collegeName }}
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label=" 管 理 员：">
                  {{ demo2.teacherName }}
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label=" 角色：">
                  审 核 员
                </a-form-item>
              </a-col>
            </a-row>
            <!--            <a-alert message="Informational Notes" type="info"-->
            <!--                     description="Detailed description and advices about successful copywriting."-->
            <!--                     show-icon/>-->
            <!--            <br/>-->
          </div>
        </template>

        状态样式设置
        <template #competitionNameName="{ row }">
          <a-tag color="red">{{ row.competitionNameName }}</a-tag>
        </template>
        <template #firstAwardeeName="{ row }">
          <a-tag color="orange">{{ row.firstAwardeeName }}</a-tag>
        </template>
        <template #awardLevel="{ row }">
          <a-tag color="green">{{ row.awardLevel }}</a-tag>
        </template>
        <template #awardGrade="{ row }">
          <a-tag color="green">{{ row.awardGrade }}</a-tag>
        </template>
        <template #firstAwardeeId="{ row }">
          <a-tag color="green">{{ row.firstAwardeeId }}</a-tag>
        </template>
        <template #allStudents="{ row }">
          <a-tag color="orange">{{ row.allStudents }}</a-tag>
        </template>

        <template #operate="{  }">
          <a-space>
            <a-divider type="vertical"/>
<!--            <a class="ele-text-warning" @click="toExamine(row)">审核</a>-->
            <a-divider type="vertical"/>
            <!--            <a class="ele-text-warning" @click="preview(row)">材料预览</a>-->
            <!--            <a-divider type="vertical"/>-->
            <!--            <a class="ele-text-success" @click="fileDownload(row)">下载</a>-->
            <!--            <a-divider type="vertical"/>-->
          </a-space>
        </template>

        <!--TODO:自定义列模板-->
        <!--        <template #dddd="{  }">-->
        <!--          <a href="http://showdoc.cqcflq.com/">文档地址</a>-->
        <!--        </template>-->

      </vxe-grid>

      <!--编辑弹窗-->
      <vxe-modal v-model="awardListApp.editModalShowing" ref="awardEditModal"
                 :title="gridOptions.showEditTitle"
                 id="awardEditModal"
                 width="800" height="400" min-width="460" min-height="320" :lock-view="false" :mask="false"
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

    </a-card>


  </div>

</template>

<script>
import {defineComponent, reactive, ref, toRefs, provide, onMounted} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import {AwardService} from "@/views/ams/awardEntity/award/awardService";
import AwardEdit from "@/views/ams/awardEntity/award/award-edit";
import AwardDetail from "@/views/ams/awardEntity/award/award-detail";
import {
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";

import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";
import {useStore} from "vuex";
import axios from "axios";
import setting from "@/config/setting";
// import MAttachment from "@/components/MFileUpload/attachment";
// import {toRaw} from '@vue/reactivity'
// import uploadAttachmentService from "@/components/MFileUpload/attachmentService";

export default defineComponent({
  components: {
    AwardEdit,
    AwardDetail,
    // MAttachment,
    DownOutlined,
    // DeleteOutlined,
    // PlusOutlined,
    UpOutlined,
    MDictSelect,
    MEntitySelect,
  },
  setup() {

    const route = useRoute();
    const store = useStore();
    const url = ref({});
    const router = useRouter();
    const awardGrid = ref({})// as VxeGridInstance
    // 搜索表单是否展开
    let searchExpand = ref(false)
    let proxyInfo = reactive({})
    const where = ref({})
    const eid = ref({})
    const startIndex = ref({})

    const demo1 = reactive({
      showEdit: false,
      forData: '',
      attachment: [],
      imgSrc: '',
      defaultImg: 'this.src="' + require('@/assets/暂无图片.jpg') + '"',
    })

    //信息提示
    const demo2 = reactive({
      collegeName: '',
      collegeId: '',
      teacherName: '',
      teacherId: '',
      userId: ''
    })
    const awardListApp = reactive({
      editModalShowing: false,
      viewModalShowing: false,
      editModalForEdit: false,
      addModalForEdit: false,
      awardId: '',
    })

    onMounted(() => {
      getUser();
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
        // import: true,
        // export: true,
        // print: true,
        // zoom: true,
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
            //解决时间组件清除按钮bug
            if (conditions.awardDate && conditions.awardDate.length === 0) {
              conditions.awardDate = null;
            }
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
            startIndex.value = (queryParams.currentPage - 1) * queryParams.pageSize + 1
            // // 处理筛选条件
            queryParams.filters = conditions;
            // // 处理排序条件
            queryParams.orderBys = sorts;
            //
            const $grid = awardGrid.value
            $grid.queryParams = queryParams
            return AwardService.MyfindAwards(queryParams).catch(error => {
              VXETable.modal.message({content: `加载数据出错，原因是：${error.message}`, status: 'error'});
            })
          },
        }
      },

      /*TODO:数据表列*/
      columns: [
        /*多选checkbox 单选seq*/
        {type: 'seq', title: '#', width: 40, fixed: 'left',},
        // {type: 'checkbox', field: 'eid', title: 'ID', width: 70, sortable: true},
        {
          field: 'competitionNameName',
          title: '竞赛名称',
          fixed: 'left',
          sortable: true,
          width: 180,
          slots: {default: 'competitionNameName'},
        },
        {
          field: 'firstAwardeeName',
          title: '负责人姓名',
          width: 90,
          sortable: true,
          fixed: 'left',
          slots: {default: 'firstAwardeeName'},
        },
        {
          field: 'firstAwardeeId',
          title: '负责人学号',
          slots: {default: 'firstAwardeeId'},
          sortable: true,
          width: 120,
        },
        {
          field: 'collegeName',
          title: '负责人学院',
          sortable: true,
          width: 130,
        },
        {
          field: 'major',
          title: '负责人专业',
          sortable: true,
          width: 130,
        },
        {
          field: 'grade',
          title: '负责人年级',
          sortable: true,
          width: 80,
        },
        {
          field: 'contactTel',
          title: '负责人联系电话',
          sortable: true,
          width: 130,
        },
        {
          field: 'workName',
          title: '作品名、参赛队名',
          sortable: true,
          width: 130,
        },
        // {
        //   field: 'certificateNo',
        //   title: '证书编号',
        // },
        // {
        //   field: 'competitionGroup',
        //   title: '竞赛组别',
        // },
        {
          field: 'awardLevel',
          title: '获奖级别',
          sortable: true,
          width: 100,
          slots: {default: 'awardLevel'},
        },
        {
          field: 'awardGrade',
          title: '获奖等级',
          sortable: true,
          width: 100,
          slots: {default: 'awardGrade'},
        },
        // {
        //   field: 'competitionCategory',
        //   title: '类别',
        // },
        // {
        //   field: 'competitionLevel',
        //   title: '举办单位等级',
        // },
        // {
        //   field: 'organizationName',
        //   title: '举办单位',
        // },
        {
          field: 'awardDate',
          title: '获奖日期',
          sortable: true,
          width: 110,
        },

        // {
        //   field: 'evidence',
        //   title: '证明文件',
        // },
        {
          field: 'allStudents',
          title: '所有获奖学生',
          slots: {default: 'allStudents'},
          sortable: true,
          width: 130,
          fixed: "right"
        },
        {
          field: 'firstInstructorName',
          title: '第一指导教师',
          fixed: "right",
          sortable: true,
          width: 120,
        },
        // {
        //   field: 'auditStatus',
        //   title: '审核状态',
        // },
        // {
        //   field: 'reviewerId',
        //   title: '审核人',
        // },
        {title: '操作', width: 100, slots: {default: 'operate'}, fixed: 'right'}
      ],
      /*TODO:导入配置*/

      /*TODO:导出配置*/

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

    //备注弹窗
    const remark = reactive({
      showRemark: false,
      remarkContent: '',
      remarkSelect: [],
      selectedContent: '',
      rowId: '',
    })
    const remarkEvent = (row) => {
      remark.rowId = row.eid
      awardListApp.currentId = row.eid;
      remark.showRemark = true
    }
    /*TODO:新建事件*/
    const addEvent = () => {
      awardListApp.editModalShowing = true
      awardListApp.currentId = null;
      awardListApp.addModalForEdit = true;
      gridOptions.showEditTitle = "新建";
    }

    /*TODO:新建独立页*/
    const addEvent2 = () => {
      router.push(`/ams/awardEntity/award/award-add`);
    }

    /*TODO:编辑关闭事件*/
    const editEventClose = () => {
      console.log(gridOptions.formData);
      VXETable.modal.message({content: '提交成功', status: 'success'})
    }

    /*TODO:查看事件*/
    const viewEvent = (row) => {
      awardListApp.currentId = row.eid;
      awardListApp.viewModalShowing = true
      gridOptions.showDetailsTitle = '查看';
    }


    /*TODO:批量删除*/

    /*TODO:条件查询提交*/
    const reload = () => {
      const $grid = awardGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }

    //返回事件

    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/awardEntity/award`);
      store.dispatch('user/tabRemove', route.fullPath);
    }
    /*TODO:重置搜索*/
    const reset = () => {
      where.value = {}
      const $grid = awardGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }
    const preview = (row) => {
      AwardService.fileUrl(row.eid).then((res) => {
        url.value = res.data
        window.open(res.data, '_blank')
      })
    }

    //联动选择框（教师信息）
    const findTeacherInfo = (teacherInfoId) => {
      AwardService.findTeacherInfoById(teacherInfoId).then((res) => {
        res.data = res.data[0];
        demo2.teacherName = res.data.name;
        demo2.teacherId = res.data.teacherId;
        demo2.collegeName = res.data.collegeName;
        demo2.collegeId = res.data.collegeId;
        AwardService.findCollegeForView(demo2.collegeId).then((res1) => {
          demo2.collegeName = res1.data.name;
        })
      })
    }

    /* 获取当前用户信息 */
    const getUser = () => {
      return new Promise((resolve, reject) => {
        axios.get(setting.userUrl).then((res) => {
          //获取当前用户信息
          const result = setting.parseUser ? setting.parseUser(res.data) : res.data;
          //const result = res.data.nickname;
          if (result.code === 0) {
            const username = result.data.nickname;
            demo2.userId = username;
            findTeacherInfo(username);

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

    //导出所有附件
    const exportAllAttachment = () =>{
      //获取所有

    }

    //TODO:这里需要返回才能调用
    return {
      url,
      preview,
      eid,
      awardGrid,
      // editModal,
      gridOptions,
      searchExpand,
      addEvent,
      viewEvent,
      editEventClose,
      addEvent2,
      where,
      reload,
      reset,
      awardListApp,
      ...toRefs(proxyInfo),
      remark,
      remarkEvent,
      onBack,
      demo1,
      getUser,
      demo2,
      exportAllAttachment,
    }
  }
})
</script>

<style scoped>
.currentCollege {
  float: right;
  font-weight: 500;
  font-size: 18px;
  margin-top: 5px;
}

.returnBtn {
  margin-top: 5px;
  margin-left: 20px;
  margin-bottom: 20px;
}

.imgShow {
  width: 100%;
  float: left;
  height: 99%;
}

.imgShow img {
  width: 96%;
  height: 80%;
  /*padding-right: 10%;*/
}

.infoShow {
  width: 50%;
  float: right;
}

.six {
  float: left;
  width: 47%;
  border-right: slategrey 1px solid;
}

.audit {
  font-size: 22px;
  font-weight: 600;
  margin-top: -5px;
  margin-bottom: 15px;
  color: #0a84e2;
}

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

.tip1 {
  /*background-color: #88caea;*/
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
}

.test1 {
  color: #e03e2d;
  font-weight: bold;
  margin-left: 50px;
}

.test2 {
  margin-left: 50px;

}

.attachment {

}
</style>
