<template>
  <div>
    <vxe-button @click="mutiDown()">批量下载</vxe-button>
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
          <a-button type="link"  @click="downloadFile(row.attachmentId,row.attachmentRealName)">下载</a-button>
          <a-button type="link" @click="preview(row.attachmentId)" class="action">预览</a-button>
        </template>
      </vxe-column>

    </vxe-table>
    <button type="" @click="findFiles">查看</button>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import {fileService} from "./file";
import FileSaver from "file-saver";
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

    const downloadFile= async(eid,fileName)=>{
      fileService.down(eid).then((res)=>{
        console.log(res)
        FileSaver.saveAs(
          new Blob([res.data], {type: "application/octet-stream"}),
          fileName
        )
      })
      console.log(eid)
    }

    const preview=(item) =>{
      let strUrl = process.env.VUE_APP_FILE_URL+ item
      window.open(strUrl);
    }

    const mutiDown=()=>{
      var current = new Date();//实例化Date对象
      var y = current.getFullYear();//获取年份
      var m = current.getMonth() + 1;//获取月份，默认显示0-11，所以+1
      m = m < 10 ? ('0'+m) : m;
      var d = current.getDate();//获取日期
      var h = current.getHours();//获取时
      var mm = current.getMinutes();//获取分
      var s = current.getSeconds();//获取秒
      s = s < 10 ? ('0'+s) : s;
      var now = y + m + d + h + mm + s;
      fileService.mutiDownload().then((res)=>{
        console.log(res)
        FileSaver.saveAs(
          new Blob([res.data], {type: "application/octet-stream"}),
            now+".zip"
        )
      })
    }


    onMounted(()=>{
      findFiles()
    })
    return {
      tableData,
      onMounted,
      findFiles,
      downloadFile,
      preview,
      mutiDown
    }
  },
}

</script>
