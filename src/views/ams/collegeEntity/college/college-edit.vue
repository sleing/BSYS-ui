<!-- 学院信息编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="collegeModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="collegeModalApp.college"
        :rules="collegeModalApp.rules"
        :label-col="{md: {span: 10}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 24}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="学院:" name="name">
              <a-input
                v-model:value="collegeModalApp.college.name"
                placeholder="请输入学院"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="collegeModalApp.display">
                <teleport to="#collegeEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="collegeListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(collegeModalApp.college)"
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
              <div v-if="!collegeModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(collegeModalApp.college)"
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
import {CollegeService} from "@/views/ams/collegeEntity/college/collegeService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
import regions from 'ele-admin-pro/packages/regions.js';


export default defineComponent({
  components: {},
  setup() {
    // 省市区数据
    const cityData = regions
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let routeId = route.params.id;
    let collegeListApp = inject('collegeListApp', reactive({}));
    const collegeModalApp = reactive({
      id: null,
      college: {},
      isEdit: false,
      display: false
    });
    collegeModalApp.rules = {}

    onMounted(() => {
      //清理数据
      collegeModalApp.college = reactive({});
      if (routeId) {//路由
        collegeModalApp.id = routeId;
        collegeModalApp.display = false;
        findCollege(collegeModalApp.id);
      } else if (collegeListApp.editModalForEdit) {//修改弹窗
        collegeModalApp.id = collegeListApp.currentId;
        collegeModalApp.display = true;
      } else if (!collegeListApp.editModalForEdit && collegeListApp.addModalForEdit) {//新增弹窗
        collegeModalApp.display = true;
      } else {
        collegeModalApp.title = "新增学生";
      }
      if (collegeModalApp.id) findCollege(collegeModalApp.id);
    })

    const findCollege = (id) => {
      CollegeService.findCollegeForView(id).then((res) => {
        collegeModalApp.college = res.data;
        //TODO:为编辑准备.
        collegeModalApp.title = "编辑学生 " + collegeModalApp.college.name;
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
        CollegeService.updateCollege(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        CollegeService.saveCollege(data).then((res) => {
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
      router.push(`/ams/collegeEntity/college`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      collegeListApp,
      collegeModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
