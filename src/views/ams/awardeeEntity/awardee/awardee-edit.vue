<!-- 获奖学生信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="awardeeModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="awardeeModalApp.awardee"
        :rules="awardeeModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="序号:" name="displayIndex">
              <a-input-number
                v-model:value="awardeeModalApp.awardee.displayIndex"
                placeholder="请输入序号"
                :min="0"
                :step="1"
                class="ele-fluid"
              ></a-input-number>
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="学生实体:" name="studentId">
              <m-entity-select
                :default-value="awardeeModalApp.awardee.studentName"
                v-model:value="awardeeModalApp.awardee.studentId"
                placeholder="请选择学生实体"
                module="awardeeEntity"
                entity="StudentInfo"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="获奖信息:" name="awardId">
              <m-entity-select
                :default-value="awardeeModalApp.awardee.awardName"
                v-model:value="awardeeModalApp.awardee.awardId"
                placeholder="请选择获奖信息"
                module="awardeeEntity"
                entity="Award"
                class="ele-fluid"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="awardeeModalApp.display">
                <teleport to="#awardeeEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="awardeeListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(awardeeModalApp.awardee)"
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
              <div v-if="!awardeeModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(awardeeModalApp.awardee)"
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
import {AwardeeService} from "@/views/ams/awardeeEntity/awardee/awardeeService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


import MEntitySelect from "@/components/MEntity/entitySelect";

export default defineComponent({
  components: {
    MEntitySelect,
  },
  setup() {
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let routeId = route.params.id;
    let awardeeListApp = inject('awardeeListApp', reactive({}));
    const awardeeModalApp = reactive({
      id: null,
      awardee: {},
      isEdit: false,
      display: false
    });
    awardeeModalApp.rules = {
      displayIndex: [
        {
          required: true,
          type: 'number',
          message: '请输入序号',
          trigger: 'blur'
        }
      ],
      studentId: [
        {
          required: true,
          type: 'number',
          message: '请输入学生实体',
          trigger: 'blur'
        }
      ],
      studentName: [
        {
          required: false,
          type: 'string',
          message: '请输入学生实体',
          trigger: 'blur'
        }
      ],
      awardId: [
        {
          required: true,
          type: 'number',
          message: '请输入获奖信息',
          trigger: 'blur'
        }
      ],
      awardName: [
        {
          required: false,
          type: 'string',
          message: '请输入获奖信息',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      awardeeModalApp.awardee = reactive({});
      if (routeId) {//路由
        awardeeModalApp.id = routeId;
        awardeeModalApp.display = false;
        findAwardee(awardeeModalApp.id);
      } else if (awardeeListApp.editModalForEdit) {//修改弹窗
        awardeeModalApp.id = awardeeListApp.currentId;
        awardeeModalApp.display = true;
      } else if (!awardeeListApp.editModalForEdit && awardeeListApp.addModalForEdit) {//新增弹窗
        awardeeModalApp.display = true;
      } else {
        awardeeModalApp.title = "新增学生";
      }
      if (awardeeModalApp.id) findAwardee(awardeeModalApp.id);
    })

    const findAwardee = (id) => {
      AwardeeService.findAwardeeForView(id).then((res) => {
        awardeeModalApp.awardee = res.data;
        //TODO:为编辑准备.
        awardeeModalApp.title = "编辑学生 " + awardeeModalApp.awardee.name;
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
        AwardeeService.updateAwardee(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        AwardeeService.saveAwardee(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      }
    }

    /*TODO:继续提交*/
    const continueSubmit = () => {
      VXETable.modal.message({content: 'error 提示', status: 'error'});
    }

    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/awardeeEntity/awardee`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      awardeeListApp,
      awardeeModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
