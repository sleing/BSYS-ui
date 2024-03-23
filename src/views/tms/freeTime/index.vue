<template>
  <vxe-table
    border
    show-overflow
    :data="tableData1.freeTimes"
    :column-config="{resizable: true}"
    :edit-config="{trigger: 'click', mode: 'cell'}">
    <!--    <vxe-column type="string" width="60"></vxe-column>-->
    <!--    <vxe-column field="blank" title="" :edit-render="{autofocus: '.vxe-input&#45;&#45;inner', placeholder: '请点击输入...'}">-->
    <!--      <template #edit="{ row }">-->
    <!--        <vxe-input v-model="row.time" type="text"></vxe-input>-->
    <!--      </template>-->
    <!--    </vxe-column>-->
    <vxe-column field="freetime" title="" :edit-render="{placeholder: '暂无人'}">
      <template #edit="{ row }">
        <vxe-input v-model="row.freetime" type="text" placeholder="暂无人"></vxe-input>
      </template>
    </vxe-column>

    <vxe-column field="monday" title="星期一" :edit-render="{placeholder: '暂无人'} ">
      <template #edit="{ row }">
        <vxe-input v-model="row.monday" type="text" placeholder="暂无人"></vxe-input>
      </template>
    </vxe-column>

    <vxe-column field="tuesday" title="星期二" :edit-render="{placeholder: '暂无人'}">
      <template #edit="{ row }">
        <vxe-input v-model="row.tuesday" type="text" placeholder="暂无人"></vxe-input>
      </template>
    </vxe-column>

    <vxe-column field="wednesday" title="星期三" :edit-render="{placeholder: '暂无人'}">
      <template #edit="{ row }">
        <vxe-input v-model="row.wednesday" type="text" placeholder="暂无人"></vxe-input>
      </template>
    </vxe-column>

    <vxe-column field="thursday" title="星期四" :edit-render="{placeholder: '暂无人'}">
      <template #edit="{ row }">
        <vxe-input v-model="row.thursday" type="text" placeholder="暂无人"></vxe-input>
      </template>
    </vxe-column>

    <vxe-column field="friday" title="星期五" :edit-render="{placeholder: '请输入'}">
      <template #edit="{ row }">
        <vxe-input v-model="row.friday" type="text" placeholder="请输入"></vxe-input>
      </template>
    </vxe-column>
  </vxe-table>
  <button @click="saveAllFreeTimes" type="button">保存</button>
</template>
<script>
import {TsFreeTimeService} from "@/views/tms/tsfreeTimeEntity/tsFreeTime/tsFreeTimeService";
import {onMounted, reactive} from 'vue'
// import {VXETable} from "vxe-table";
export default {
  name: "index",
  setup() {
    const tableData1 = reactive({
      freeTimes: []
    })
    const findFreeTime = () => {
      TsFreeTimeService.findAllFreeTimes().then((res) => {
        tableData1.freeTimes = res.data
        console.log(tableData1.freeTimes)
      })
    }

    const saveAllFreeTimes = async () => {
        TsFreeTimeService.saveAllFreeTimes(tableData1.freeTimes).then(() => {
          console.log(tableData1.freeTimes)
        })
    }
    setTimeout(saveAllFreeTimes,100);

    onMounted(() => {
      findFreeTime()
    })
    return {
      tableData1,
      findFreeTime,
      saveAllFreeTimes,
    }
  },
}
</script>

<style scoped>
.input {
  width: 25%
}
</style>
