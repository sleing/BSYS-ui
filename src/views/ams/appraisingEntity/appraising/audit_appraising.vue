<template>
  <div class="ele-body">
    <a-space size="middle">
      <a-button
        class="returnBtn"
        type="primary"
        @click="onBack()">返回
      </a-button>
    </a-space>
    <a-space class="header">
      <a-span>评优评先信息审核页面</a-span>
    </a-space>

    <a-card :bordered="false">
      <vxe-grid ref='appraisingGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
          <a-form
            :label-col="{md: {span: 8}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 16}, sm: {span: 24}}">
            <a-row class="header">

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label=" 当前学院：">
                  {{ demo2.collegeName }}
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label=" 审核人：">
                  {{ demo2.teacherName }}
                </a-form-item>
              </a-col>

              <a-col :lg="8" :md="12" :sm="24"
                     :xs="24">
                <a-form-item label=" 审核人角色：">
                  教师
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
            <!--            <br/>-->
            本页末尾处
          </div>

        </template>

        状态样式设置
        <template #auditStatus="{ row }">
          <a-tag v-if="row.auditStatus==='审核通过'" color="green">{{ row.auditStatus }}</a-tag>
          <a-tag v-if="row.auditStatus==='驳回'" color="red">{{ row.auditStatus }}</a-tag>
          <a-tag v-if="row.auditStatus==='未审核'" color="orange">{{ row.auditStatus }}</a-tag>
        </template>

        <template #operate="{ row }">
          <a-space>
            <a class="ele-text-warning" @click="toExamine(row)">审核</a>
            <a-divider type="vertical"/>
            <a class="ele-text-warning" @click="preview(row)">材料预览</a>
            <a-divider type="vertical"/>
            <!--            <a class="ele-text-success" @click="fileDownload(row)">下载</a>-->
            <a-divider type="vertical"/>

          </a-space>
        </template>


        <!--TODO:自定义列模板-->
        <!--        <template #dddd="{  }">-->
        <!--          <a href="http://showdoc.cqcflq.com/"></a>-->
        <!--        </template>-->

        <template #ycs>
          <!--          <a-space>-->
          <!--            <a-span>评优评先信息审核页面</a-span>-->
          <!--          </a-space>-->
        </template>
      </vxe-grid>

      <!--编辑弹窗-->
      <vxe-modal id="appraisingEditModal" ref="appraisingEditModal"
                 v-model="appraisingListApp.editModalShowing"
                 :destroy-on-close="true"
                 :lock-view="false" :mask="false" :title="gridOptions.showEditTitle" dblclickZoom height="400"
                 min-height="320"
                 min-width="460" remember resize show-footer show-zoom storage transfer
                 width="800"
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
      <vxe-modal id="appraisingViewModal" v-model="appraisingListApp.viewModalShowing"
                 :destroy-on-close="true"
                 :lock-view="false"
                 :mask="false"
                 :title="gridOptions.showDetailsTitle"
                 dblclickZoom
                 footer min-height="320"
                 min-width="460"
                 remember resize show-footer show-zoom storage transfer width="600">
        <template #default>
          <appraising-detail ref="appraising-detail"/>
        </template>
      </vxe-modal>

      <!--      备注弹窗-->
      <vxe-modal v-model="remark.showRemark" :title="remark.selectRow ? '备注' : '备注'" destroy-on-close min-height="300"
                 min-width="600" resize width="800">
        <template #default>
          <vxe-textarea v-model="remark.remarkContent" cols="40" placeholder="请填写备注信息" rows="3"></vxe-textarea>
          <vxe-button icon="fa fa-check" status="success" @click="confuseEvent(remark.rowId)">确认</vxe-button>
        </template>
      </vxe-modal>

      <!--      审核弹窗-->
      <vxe-modal v-model="demo1.showEdit" :loading="demo1.submitLoading" :title="demo1.selectRow ? '审核&审核' : '审核'"
                 destroy-on-close
                 min-height="300" min-width="600" resize width="800">
        <template #default>
          <vxe-form :data="demo1.forData" :rules="demo1.formRules" title-align="right" title-width="100"
                    @submit="submitEvent">
            <vxe-form-item :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}" :title-width="200" title="审核界面"
                           title-align="left"></vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="studentName" title="参评人：">
              <template #default="{ data }">
                {{ data.studentName }}
              </template>
            </vxe-form-item>

            <vxe-form-item :item-render="{}" :span="12" field="collegeName" title="参评人学院：">
              <template #default="{ data }">
                {{ data.collegeName }}
              </template>
            </vxe-form-item>

            <vxe-form-item :item-render="{}" :span="12" field="role" title="参评人专业：">
              <template #default="{ data }">
                {{ data.major }}
              </template>
            </vxe-form-item>

            <vxe-form-item :item-render="{}" :span="12" field="grade" title="参评人年级：">
              <template #default="{ data }">
                {{ data.grade }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="instructor" title="辅导员：">
              <template #default="{ data }">
                {{ data.instructor }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="firstAverageScore" title="第一学期平均成绩排名：">
              <template #default="{ data }">
                {{ data.firstAverageScore }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="firstAverageScore" title="第二学期平均成绩排名：">
              <template #default="{ data }">
                {{ data.secondAverageScore }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="firstAverageScore" title="第一学期奖学金排名：">
              <template #default="{ data }">
                {{ data.fristScholarshipRanking }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="firstAverageScore" title="第二学期奖学金排名：">
              <template #default="{ data }">
                {{ data.secondScholarshipRanking }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="firstAverageScore" title="有无违纪处分：">
              <template #default="{ data }">
                {{ data.punishment }}
              </template>
            </vxe-form-item>
            <vxe-form-item :item-render="{}" :span="12" field="firstAverageScore" title="不及格科目数(全学年)">
              <template #default="{ data }">
                {{ data.failedSubjects }}
              </template>
            </vxe-form-item>


            <br><br>
            <vxe-form-item :item-render="{}" :span="12" field="nickname" title="证明材料：">
              <br><br>
              <div class="img" @click="look(demo1.forData.prove)">
                <img :src="demo1.forData.prove" style="width: 100px;height: 100px">
              </div>
            </vxe-form-item>
            <vxe-form-item :span="24" align="center" title-align="left">
              <template #default="{data}">
                <hr size="2" width="100%">
<!--                <a-popconfirm
                  title="确定要驳回此记录吗？"
                  @confirm="remarkEvent(data)">
                  <a class="ele-text-danger" style="margin-right: 20px;font-size: 20px;">驳回</a>
                </a-popconfirm>-->
                <a @click="remarkEvent(data)" class="ele-text-danger" style="margin-right: 10%;font-size: 20px;">驳回</a>

                <a-popconfirm
                  title="确定要通过此记录吗？"
                  @confirm="modifyEvent(data)">
                  <a class="ele-text-success" style="margin-left: 20px;font-size: 20px;">通过</a>
                </a-popconfirm>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>

    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, provide, onMounted} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import {AppraisingService} from "@/views/ams/appraisingEntity/appraising/appraisingService";
import AppraisingEdit
  from "@/views/ams/appraisingEntity/appraising/appraising-edit";
import AppraisingDetail
  from "@/views/ams/appraisingEntity/appraising/appraising-detail";

import {AwardService} from "@/views/ams/awardEntity/award/awardService";
import axios from "axios";
import setting from "@/config/setting";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
// import {toRaw} from '@vue/reactivity'

export default defineComponent({
  components: {
    AppraisingEdit,
    AppraisingDetail,

  },
  setup() {
    const route = useRoute();
    const store = useStore(); //页面跳转的路由

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

    //备注弹窗
    const remark = reactive({
      showRemark: false,
      remarkContent: '',
      rowId: '',
    })


    const remarkEvent = (row) => {
      remark.rowId = row.eid
      appraisingListApp.currentId = row.eid;
      remark.showRemark = true
    }

    //窗户口的开关闭
    const demo1 = reactive({
      showEdit: false,
      forData: '',
    })

    //信息提示
    const demo2 = reactive({
      collegeName: '',
      collegeId: '',
      teacherName: '',
      teacherId: '',
      userId: ''
    })

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

    const gridOptions = reactive({
      border: true,
      resizable: true,
      showHeaderOverflow: true,
      showOverflow: true,
      highlightHoverRow: true,
      keepSource: true,
      id: 'appraisingsGrid',
      //maxHeight: '100%',//表格高度
      height: '700px',
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
            return AppraisingService.MyfindAppraisings(queryParams).catch(error => {
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
          sortable: true
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
          slots:{default: 'auditStatus'}
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
        {title: '操作', width: 180, slots: {default: 'operate'}}
      ],

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

    const toExamine = (row) => {
      debugger
      demo1.forData = row;
      demo1.showEdit = true;
    }

    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/appraisingEntity/appraising`);
      store.dispatch('user/tabRemove', route.fullPath);
    }

    /* 获取当前用户信息 */
    const getUser = () => {
      debugger
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

    onMounted(() => {
      getUser();
    })


    /*TODO:审核事件*/
    const modifyEvent = (row) => {
      //var id = toRaw(row);
      //var id = row.eid;
      debugger
      AppraisingService.updateReviewer(demo2.userId, row.eid).then(() => {
        // VXETable.modal.message({content: '操作成功', status: 'success'})
      }).catch(error => {
        VXETable.modal.message({content: `审核人添加，原因是：${error.message}`, status: 'error'});
      })

      AppraisingService.myUpdate(row.eid).then(() => {
        VXETable.modal.message({content: '审核操作成功', status: 'success'})
      }).catch(error => {
        VXETable.modal.message({content: `审核错误，原因是：${error.message}`, status: 'error'});
      })


      setTimeout(function () {
        demo1.showEdit = false
      }, 1500);
    }

    /*TODO:驳回事件*/
    const confuseEvent = (row) => {
      AppraisingService.auditForCon(row, remark.remarkContent).then(() => {
        VXETable.modal.message({content: '操作成功', status: 'success'})
      }).catch(error => {
        VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
      })
      remark.showRemark = false
      demo1.showEdit = false
    }

    const look = (url) => {
      window.open(url)
    }

    const preview = (row) => {
      debugger
      window.open(row.prove, '_blank')

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
      ...toRefs(proxyInfo),
      demo1,
      demo2,
      findTeacherInfo,
      toExamine,
      getUser,
      remark,
      confuseEvent,
      remarkEvent,
      modifyEvent,
      look,
      onBack,
      preview
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

.header {
  font-style: initial;
  font-size: 20px;
  font-weight: bold;
}
</style>

