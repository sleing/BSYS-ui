<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <vxe-grid ref='tsNoticeGrid' v-bind="gridOptions" class="my-grid66">
        <!--搜索表单 -->
        <template #form>
          <a-form
            :model="where"
            :label-col="{md: {span: 4}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 20}, sm: {span: 24}}">
            <a-row>
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
            <a @click="auditEvent(row)">审核</a>
<!--            <a-divider type="vertical"/>-->
<!--            <a class="ele-text-success" @click="editEvent2(row.eid)">修改独立页</a>-->
<!--            <a-divider type="vertical"/>-->
<!--            <a class="ele-text-warning" @click="viewEvent(row)">查看</a>-->
<!--            <a-divider type="vertical"/>-->
<!--            <a-popconfirm-->
<!--              title="确定要删除此记录吗？"-->
<!--              @confirm="deleteEvent(row)">-->
<!--              <a class="ele-text-danger">删除</a>-->
<!--            </a-popconfirm>-->
          </a-space>
        </template>


        <!--TODO:自定义列模板-->
        <template #dddd="{  }">
          <a href="http://showdoc.cqcflq.com/">文档地址</a>
        </template>
      </vxe-grid>

      <!--编辑弹窗-->
      <vxe-modal v-model="tsNoticeListApp.editModalShowing" ref="tsNoticeEditModal"
                 :title="gridOptions.showEditTitle"
                 id="tsNoticeEditModal"
                 width="800" height="400" min-width="460" min-height="320" :lock-view="false" :mask="false"
                 show-footer show-zoom resize remember storage transfer dblclickZoom
                 :destroy-on-close="true"
      >
        <template #default>
          <div id="tsNoticeEditModalContent">
          </div>
        </template>
        <template #footer>
          <div id="tsNoticeEditModalFooter">
          </div>
          <teleport to="#tsNoticeEditModalContent">
            <tsNotice-edit ref="tsNotice-edit"/>
          </teleport>
        </template>
      </vxe-modal>

      <!--查看弹窗-->
      <vxe-modal v-model="tsNoticeListApp.viewModalShowing" :title="gridOptions.showDetailsTitle"
                 id="tsNoticeViewModal"
                 width="600"
                 min-width="460"
                 min-height="320"
                 :destroy-on-close="true"
                 :lock-view="false" :mask="false"
                 footer
                 show-footer show-zoom resize remember storage transfer dblclickZoom>
        <template #default>
          <tsNotice-detail ref="tsNotice-detail"/>
        </template>
      </vxe-modal>

      <!--审核弹窗-->
      <div>
        <vxe-modal v-model="auditDemo.auditWindow"  width="100%" min-width="600"
                   height="100%" min-height="350"  resize destroy-on-close>
          <template #default>

            <div class="infoShow">
              <vxe-form :data="auditDemo.details"  title-align="right" title-width="170"
                        @submit="submitEvent">
                <vxe-form-item title="审核信息" title-align="left" :title-width="200" :span="24"
                               :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
                <vxe-form-item field="title" :span="12" :item-render="{}">
                  <template #default="{ data }">
                    <span class="test2">通知主题：</span>
                    {{ data.title }}
                  </template>
                </vxe-form-item>

                <vxe-form-item field="title" :span="12" :item-render="{}">
                  <template #default="{ data }">
                    <span class="test2">通知时间：</span>
                    {{ data.noticeDate }}
                  </template>
                </vxe-form-item>

                <vxe-form-item field="title" :span="12" :item-render="{}">
                  <template #default="{ data }">
                    <span class="test2">通知部门：</span>
                    {{ data.noticeDepartmentName }}
                  </template>
                </vxe-form-item>

                <vxe-form-item field="title" :span="12" :item-render="{}">
                  <template #default="{ data }">
                    <span class="test2">通知内容：</span>
                    <TinymceEditor
                      :disabled="true"
                      v-model:value="data.content"
                    />
                  </template>
                </vxe-form-item>

                <vxe-form-item field="title" :span="12" :item-render="{}">
                  <template #default="{ data }">
                    <span class="test2">通知概要：</span>
                    {{ data.name }}
                  </template>
                </vxe-form-item>

                <vxe-form-item field="title" :span="12" :item-render="{}">
                  <template #default="{ data }">
                    <span class="test2">审核意见：</span>
                    <TinymceEditor
                      :disabled="false"
                      v-model:value="data.remark"
                    />
                  </template>
                </vxe-form-item>



                <br>
                <vxe-form-item align="center" title-align="center" :span="24" class="option">
                  <template #default="{data}">
                    <hr width="100%" size="2">
<!--                    <a @click="rejectEvent(data)" class="ele-text-danger"-->
<!--                       style="margin-right: 10%;font-size: 20px;">驳回</a>-->
                    <a-popconfirm
                      title="确定要驳回此记录吗？"
                      @confirm="rejectEvent(data)">
                      <a class="ele-text-success" style="margin-left: 10%;font-size: 20px; color: red">驳回</a>
                    </a-popconfirm>

                    <a-popconfirm
                      title="确定要通过此记录吗？"
                      @confirm="receiveEvent(data)">
                      <a class="ele-text-success" style="margin-left: 10%;font-size: 20px;">通过</a>
                    </a-popconfirm>

                  </template>
                </vxe-form-item>
              </vxe-form>
            </div>

          </template>
        </vxe-modal>
      </div>

    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, provide} from 'vue'//, Ref
import {VXETable} from 'vxe-table'//, VxeGridInstance, VxeGridProps
import XEAjax from 'xe-ajax'
import {TsNoticeService} from "@/views/tms/tsnoticeEntity/tsNotice/tsNoticeService";
import TsNoticeEdit
  from "@/views/tms/tsnoticeEntity/tsNotice/tsNotice-edit";
import TsNoticeDetail
  from "@/views/tms/tsnoticeEntity/tsNotice/tsNotice-detail";
import {AuditService} from "@/views/tms/audit/auditService";
import {
  // PlusOutlined,
  // DeleteOutlined,
  // DownOutlined,
  // UpOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";

// import MDictSelect from "@/components/MDict/dictSelect";
// import MEntitySelect from "@/components/MEntity/entitySelect";

export default defineComponent({
  components: {
    TsNoticeEdit,
    TsNoticeDetail,
    // DownOutlined,
    // DeleteOutlined,
    // PlusOutlined,
    // UpOutlined,
    //MDictSelect,
    // MEntitySelect,
  },
  setup() {
    const router = useRouter();
    const tsNoticeGrid = ref({})// as VxeGridInstance
    // 搜索表单是否展开
    let searchExpand = ref(false)
    let proxyInfo = reactive({})
    const where = ref({})
    const auditDemo=reactive({
      auditWindow:false,
      details:[]
    })
    const eid = ref({})
    const startIndex = ref({})
    const tsNoticeListApp = reactive({
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
      id: 'tsNoticesGrid',
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
            const $grid = tsNoticeGrid.value
            $grid.queryParams = queryParams
            return AuditService.findTsNoticesWithoutAudition(queryParams).catch(error => {
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
          field: 'title',
          title: '通知主题',
          sortable: true
        },
        {
          field: 'noticeDate',
          title: '通知时间',
          sortable: true
        },
        {
          field: 'noticeDepartmentName',
          title: '通知部门',
          sortable: true
        },
        {
          field: 'content',
          title: '通知内容',
          sortable: true
        },
        {
          field: 'name',
          title: '通知概要',
          sortable: true
        },
        {
          field: 'auditStatu',
          title: '审核状态',
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
          const $grid = tsNoticeGrid.value
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
          const $grid = tsNoticeGrid.value
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
          return TsNoticeService.findTsNoticesForExport(body).then(data => {
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
    provide('tsNoticeListApp', tsNoticeListApp)
    provide('gridOptions', gridOptions)

    /*TODO:新建事件*/
    const addEvent = () => {
      tsNoticeListApp.editModalShowing = true
      tsNoticeListApp.currentId = null;
      tsNoticeListApp.addModalForEdit = true;
      gridOptions.showEditTitle = "新建";
    }

    /*TODO:新建独立页*/
    const addEvent2 = () => {
      router.push(`/tms/tsnoticeEntity/tsNotice/tsNotice-add`);
    }
    /*TODO:编辑事件*/
    const editEvent = (row) => {
      tsNoticeListApp.editModalShowing = true
      tsNoticeListApp.currentId = row.eid;
      tsNoticeListApp.editModalForEdit = true;
      gridOptions.showEditTitle = "编辑";
    }
    /*TODO:编辑独立页*/
    const editEvent2 = (eid) => {
      router.push(`/tms/tsnoticeEntity/tsNotice/tsNotice-edit/${eid}`);
    }

    /*TODO:编辑关闭事件*/
    const editEventClose = () => {
      console.log(gridOptions.formData);
      VXETable.modal.message({content: '提交成功', status: 'success'})
    }

    /*TODO:查看事件*/
    const viewEvent = (row) => {
      tsNoticeListApp.currentId = row.eid;
      tsNoticeListApp.viewModalShowing = true
      gridOptions.showDetailsTitle = '查看';
    }

    /*TODO:删除事件*/
    const deleteEvent = (row) => {
      TsNoticeService.deleteTsNotice(row.eid).then(() => {
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
      const $grid = tsNoticeGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }
    /*TODO:重置搜索*/
    const reset = () => {
      where.value = {}
      const $grid = tsNoticeGrid.value
      $grid.commitProxy('query')//TODO:执行代理方法
    }

    /**
     * 审核事务处理
     */
    const auditEvent=(row)=>{
      console.log(row)
      auditDemo.auditWindow=true
      auditDemo.details=row
    }

    /**
     * 审核通过
     * @param row
     */
    const receiveEvent=(row)=>{
      AuditService.receiveEvent(row.eid,row.remark).then((res)=>{
        console.log(res)
        if (res.status==200){
          VXETable.modal.message({content: `操作成功！`, status: 'success'});
        }
      }).catch((error)=>{
        VXETable.modal.message({content: `加载数据出错之工号，原因是：${error.message}`, status: 'error'});
      })
      auditDemo.auditWindow=false
    }

    /**
     * 审核驳回
     * @param row
     */
    const rejectEvent=(row)=>{
      AuditService.rejectEvent(row.eid,row.remark).then((res)=>{
        console.log(res)
        if (res.status==200){
          VXETable.modal.message({content: `操作成功！`, status: 'success'});
        }
      }).catch((error)=>{
        VXETable.modal.message({content: `加载数据出错之工号，原因是：${error.message}`, status: 'error'});
      })
      auditDemo.auditWindow=false
    }

    //TODO:这里需要返回才能调用
    return {
      eid,
      tsNoticeGrid,
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
      tsNoticeListApp,
      ...toRefs(proxyInfo),
      auditEvent,
      auditDemo,
      receiveEvent,
      rejectEvent
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
