<!-- 办公地点管理编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :title="tsWorkPlaceModalApp.title" :bordered="false">
      <a-form
        ref="form2"
        :model="tsWorkPlaceModalApp.tsWorkPlace"
        :rules="tsWorkPlaceModalApp.rules"
        :label-col="{md: {span: 7}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
        <a-row :gutter="16">

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="办公地点名称:" name="name">
              <a-input
                v-model:value="tsWorkPlaceModalApp.tsWorkPlace.name"
                placeholder="请输入办公地点名称"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="办公地点位置:" name="address">
              <a-input
                v-model:value="tsWorkPlaceModalApp.tsWorkPlace.address"
                placeholder="请输入办公地点位置"
                :maxlength="255"
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
              <!--class="ele-pull-right"-->
              <div v-if="tsWorkPlaceModalApp.display">
                <teleport to="#tsWorkPlaceEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="tsWorkPlaceListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        type="primary"
                        @click="onSubmit(tsWorkPlaceModalApp.tsWorkPlace)"
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
              <div v-if="!tsWorkPlaceModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(tsWorkPlaceModalApp.tsWorkPlace)"
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
import {TsWorkPlaceService} from "@/views/tms/tsworklaceEntity/tsWorkPlace/tsWorkPlaceService";
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
    let tsWorkPlaceListApp = inject('tsWorkPlaceListApp', reactive({}));
    const tsWorkPlaceModalApp = reactive({
      id: null,
      tsWorkPlace: {},
      isEdit: false,
      display: false
    });
    tsWorkPlaceModalApp.rules = {
      address: [
        {
          required: false,
          type: 'string',
          message: '请输入办公地点',
          trigger: 'blur'
        }
      ],
    }

    onMounted(() => {
      //清理数据
      tsWorkPlaceModalApp.tsWorkPlace = reactive({});
      if (routeId) {//路由
        tsWorkPlaceModalApp.id = routeId;
        tsWorkPlaceModalApp.display = false;
        findTsWorkPlace(tsWorkPlaceModalApp.id);
      } else if (tsWorkPlaceListApp.editModalForEdit) {//修改弹窗
        tsWorkPlaceModalApp.id = tsWorkPlaceListApp.currentId;
        tsWorkPlaceModalApp.display = true;
      } else if (!tsWorkPlaceListApp.editModalForEdit && tsWorkPlaceListApp.addModalForEdit) {//新增弹窗
        tsWorkPlaceModalApp.display = true;
      } else {
        tsWorkPlaceModalApp.title = "新增学生";
      }
      if (tsWorkPlaceModalApp.id) findTsWorkPlace(tsWorkPlaceModalApp.id);
    })

    const findTsWorkPlace = (id) => {
      TsWorkPlaceService.findTsWorkPlaceForView(id).then((res) => {
        tsWorkPlaceModalApp.tsWorkPlace = res.data;
        //TODO:为编辑准备.
        tsWorkPlaceModalApp.title = "编辑学生 " + tsWorkPlaceModalApp.tsWorkPlace.name;
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
        TsWorkPlaceService.updateTsWorkPlace(data).then((res) => {
          console.log(res);
          VXETable.modal.message({content: '操作成功', status: 'success'});
          setTimeout(onBack, 3000);
        }).catch(error => {
          VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
        })
      } else {
        //新增
        TsWorkPlaceService.saveTsWorkPlace(data).then((res) => {
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
      router.push(`/tms/tsworklaceEntity/tsWorkPlace`);
      store.dispatch('user/tabRemove', route.fullPath);

    }
    return {
      cityData,
      routeId,
      tsWorkPlaceListApp,
      tsWorkPlaceModalApp,
      onSubmit,
      continueSubmit,
      onBack,
    }

  },
})
</script>

<style scoped>

</style>
