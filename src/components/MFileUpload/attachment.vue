<template>
  <div v-if="operatorType!=='view'">
    <a-upload
      multiple
      :remove="handleRemove"
      :file-list="fileList"
      :before-upload="beforeUpload"
      accept=".bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp,.avif,.apng,.jpeg"
    >
      <div v-if="fileList.length < 1">
        <a-button type="primary">
          <upload-outlined></upload-outlined>
          选择文件
        </a-button>
      </div>
    </a-upload>
  </div>
  <a-row v-else-if="operatorType==='view'">
    <div v-if="fileList.length ===0&&reFileList.length===0">
      <span style="color: blue;cursor: pointer">暂无附件</span>
    </div>
  </a-row>
  <div>
    <div v-if="reFileList.length!==0&&operatorType!=='upload'" class="div1">
      <a-list
        size="small"
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="reFileList"
      >
        <template #renderItem="{ item }" >
          <a-list-item>
            <template #actions>
              <a-button type="link" @click="down(item)" class="action">下载</a-button>
              <a-button type="link" @click="preview(item)" class="action">预览</a-button>
              <a-button type="link" ghost @click="deleteFile(item)" class="action" v-if="operatorType!=='view'"
                        style="color:red">删除
              </a-button>
            </template>
            <div class="atta-name">{{ item.attachmentRealName }}</div>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script>
import {message} from "ant-design-vue";
import {UploadOutlined} from '@ant-design/icons-vue';
import FileSaver from "file-saver";
import uploadAttachmentService from './attachmentService'
import {VXETable} from "vxe-table";

export default
{
  emits: ['fileList'],
  components: {
    UploadOutlined,
  },
  name: "MAttachment",
  props: ['associateFormId', 'associateFormName', 'operatorType'],
  async created() {
    console.log(this.associateFormId)
    if (this.associateFormId != null) {
      await this.findFile(this.associateFormId, this.associateFormName)
    }

  },
  data() {
    return {
      limitMessage:true,
      fileList: [],
      //接收回传文件
      reFileList: [],
      fileType:'',
      timer:''
    };
  },
  watch: {
    //监听fileList并将选中的文件传到父组件
    fileList: function () {
      //将文件回传到父组件进行上传
      this.$emit('fileList', this.fileList);
    },
    // //监听组件的状态的变化
    'operatorType': function () {
      this.findFile(this.associateFormId, this.associateFormName)
      this.fileList = []
    },
  },
  methods: {
    //返回已上传的附件
    findFile(associateFormId, associateFormName){
      if (associateFormId != null && associateFormName != null) {
         uploadAttachmentService.findFileOfPicture(associateFormId, associateFormName).then((res) => {
          console.log(res.data)
          this.reFileList = res.data;
        }).catch((error) => {
          VXETable.modal.message({content: `加载图片文件出错，原因是：${error.message}`, status: 'error'});
        });
      }
    },
    //下载附件
    down(file) {
      uploadAttachmentService.down(file.attachmentId).then((res) => {
        FileSaver.saveAs(
          new Blob([res.data], {type: "application/octet-stream"}),
          file.attachmentRealName
        )
      })
    },
    //通过附件id对附件进行删除
    deleteFile(item) {
      this.$XModal.confirm('您确定要删除吗？').then(type => {
        if (type === 'confirm') {
          uploadAttachmentService.deleteFile(item.attachmentId).then(() => {
            this.$XModal.message({content: '删除成功'})
            this.findFile(this.associateFormId, this.associateFormName)
          })
        }
      })
    },
    //上传文件之前判断文件大小
    beforeUpload(file,fileList) {
      this.fileType = file.name.replace(/.+\./, "");
      console.log(this.fileType);
      const maxSize = file.size / 1024 / 1024 <= 30; //30M
      // alert(file.size)

      if (fileList.length > 1 || this.reFileList.length >= 1) {
        if(this.limitMessage) {
          this.fileList = this.fileList.slice(-1)
          message.error('只能上传一个文件！')
          this.limitMessage = false
          setTimeout( () => {
            this.limitMessage = true
          },1000)
        }
        return true;
      }

      if (!maxSize) {
        message.error('上传文件过大');
      } else {
        this.fileList = [...this.fileList, file];
        if(this.fileList.length > 1) {
          for(let i=1;i<this.fileList.length;i++) {
            this.fileList[i] = null;
          }
        }
      }
      return false;
    },
    //对选中的文件进行移除
    handleRemove(file) {
      var index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    //清空fileList
    cleanFileList() {
     this.fileList=[]
    },

    preview(item) {
      let strUrl = process.env.VUE_APP_FILE_URL+ item.attachmentId
        window.open(strUrl);
      }
  },

}
</script>
<style scoped>

.ant-list-item {
  background: #fff;
}

/*.atta-name{*/
/*  padding-left: 48px;*/
/*}*/

.div1{
  padding-left: 3px;
}

.ant-list-item:hover {
  background: #F5F7FA;
}

.action {
  display: none;
  padding-left: 10px;
}

.ant-list-item:hover .action {
  display: block
}

</style>
