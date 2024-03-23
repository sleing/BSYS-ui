<template>
  <div>
    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="300"
      :column-config="{resizable: true}"
      :row-config="{isHover: true}"
      :data="tableData.files">
      <vxe-column field="attachmentRealName" title="文件名称" >
        <template #edit="{ row }">
          <vxe-input v-model="row.attachmentRealName" type="text" placeholder="暂无人"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="attachmentAddr" title="文件地址" >
        <template #edit="{ row }">
          <vxe-input v-model="row.attachmentAddr" type="text" placeholder="暂无人"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="associateSize" title="文件大小" >
        <template #edit="{ row }">
          <vxe-input v-model="row.associateSize" type="text" placeholder="暂无人"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="createDatetime" title="上传日期" >
        <template #edit="{ row }">
          <vxe-input v-model="row.createDatetime" type="text" placeholder="暂无人"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="isEffective" title="是有有效" >
        <template #edit="{ row }">
          <vxe-input v-model="row.isEffective" type="text" placeholder="暂无人"></vxe-input>
        </template>
      </vxe-column>

      <vxe-column title="操作" >
        <template #default="{ row }">
          <vxe-button @click="downloadFile(row.eid)">编辑</vxe-button>
        </template>
      </vxe-column>

    </vxe-table>
    <button type="" @click="findFiles">查看</button>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import {fileService} from "./file";
export default {
  name: "index",
  setup() {
    const tableData = reactive({
      files: [],
      fileType:''
    })

    const findFiles =async ()=>{
        fileService.findFiles().then((res)=>{
          tableData.files=res.data
          console.log(res)
        })
    }

    const downloadFile= async(eid)=>{
      console.log(eid)
    }


    onMounted(()=>{
      findFiles()
    })
    return {
      tableData,
      onMounted,
      findFiles,
      downloadFile
    }
  },
}

</script>
