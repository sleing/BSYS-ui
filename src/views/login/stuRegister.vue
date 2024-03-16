<!-- 学生信息编辑弹窗 -->
<template>
  <div class="bigbody">
    <div class="ele-body">
      <a-card :bordered="false" class="card">
        <div class="content">
          <a-form
            ref="form"
            :model="form"
            :rules="rules"
            :label-col="{md: {span: 6}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 18}, sm: {span: 24}}"
            class="form">

            <a-row :gutter="1">
              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="学号:" name="studentId">
                  <a-input
                    placeholder="请输入学号"
                    v-model:value="form.studentId"
                    :maxlength="250"
                    @blur="studentIdBlur"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="姓名:" name="name">
                  <a-input
                    placeholder="请输入姓名"
                    v-model:value="form.name"
                    :maxlength="250"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="学院:" name="collegeId">
                  <m-entity-select
                    v-model:value="form.collegeId"
                    placeholder="请选择学院"
                    module="collegeEntity"
                    entity="College"
                    sys="ams"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="专业:" name="major">
                  <a-input
                    v-model:value="form.major"
                    placeholder="请输入专业全称"
                    :maxlength="255"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="年级:" name="grade">
                  <a-input
                    v-model:value="form.grade"
                    placeholder="请输入年级如2020级"
                    :maxlength="255"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="班级:" name="classGrade">
                  <a-input
                    v-model:value="form.classGrade"
                    placeholder="请输入班级"
                    :maxlength="255"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="联系电话:" name="contactTel">
                  <a-input
                    v-model:value="form.contactTel"
                    placeholder="请输入联系电话"
                    :maxlength="255"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="用户类型:" name="studentType">
                  <a-select
                    placeholder="请选择用户类型"
                    v-model:value="form.studentType">
                    <a-select-option :value="1">本科生</a-select-option>
                    <a-select-option :value="2">研究生</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>


              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="注册密码:" name="password">
                  <a-input-password
                    v-model:value="form.password"
                    placeholder="请输入5-20位密码，必须包括数字和字母"
                    :maxlength="255"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="确认密码:" name="password2">
                  <a-input-password
                    v-model:value="form.password2"
                    placeholder="请再次输入注册密码"
                    :maxlength="255"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="邮箱:" name="email">
                  <a-input
                    v-model:value="form.email"
                    placeholder="请输入注册邮箱"
                    :maxlength="255"
                    @blur="emailBlur"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="验证码:" name="code">
                  <a-input
                    v-model:value="form.code"
                    placeholder="请输入邮箱验证码"
                    :maxlength="255"
                    @blur="checkCode"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item >
                  <a-button
                    style="margin-left: 77px;"
                    type="primary"
                    @click="sendCheckCode"
                  >
                    <span>{{ demo.SendCode_text }}</span>
                  </a-button>
                </a-form-item>
              </a-col>


              <a-col :md="24" :sm="24" :xs="24">
                <a-form-item :wrapper-col="{md: {offset: 6}}" style="margin-bottom: -20px">
                  <div class="buttons">
                    <a-space size="middle" class="btn">
                      <a-button @click="toReset" type="primary" size="large" class="clearbt">
                        重置信息
                      </a-button>

                      <a-button
                        type="primary"
                        @click="onSubmit()"
                        :loading="loading"
                        size="large"
                        class="submitbt">提交信息
                      </a-button>
                    </a-space>
                  </div>

                </a-form-item>
              </a-col>

            </a-row>

          </a-form>
        </div>
      </a-card>
    </div>
    <div class="login-copyright">Copyright © CQNU 计算机与信息科学学院-ICDIO实验室-DDD-Nu项目组</div>
  </div>

</template>

<script>

import {VXETable} from "vxe-table";
import {UserService} from "@/views/login/UserService";
import {StudentInfoService} from "@/views/ams/studentEntity/studentInfo/studentInfoService";

export default {
  data() {
    //学号输入规则
    let studentIdRule = (rule, value) => {
      if (!value) {
        return Promise.reject('请输入学号');
      }
      let reg = /^[0-9]{13}$/;
      if ( !(reg.test(value) ) ) {
        return Promise.reject('学号格式有误');
      }
      return Promise.resolve();
    };

    //姓名输入规则
    let nameRule = (rule, value) => {
      if (!value) {
        return Promise.reject('请输入姓名');
      }
      let reg = /^[\u4E00-\u9FA5]{2,100}$/;
      if ( !(reg.test(value) ) ) {
        return Promise.reject('姓名格式有误');
      }
      return Promise.resolve();
    };

    //学院输入规则
    let collegeIdRule = (rule, value) => {
      if (!value) {
        return Promise.reject('请选择学院');
      }
      return Promise.resolve();
    };

    //专业输入规则
    let majorRule = (rule, value) => {
      if (!value) {
        return Promise.reject('请输入专业全称');
      }
      return Promise.resolve();
    };

    //年级输入规则
    let gradeRule = (rule, value) => {
      if (!value) {
        return Promise.reject('请输入年级');
      }
      return Promise.resolve();
    };

    // //班级输入规则
    // let classGradeRule = (rule, value) => {
    //   if (!value) {
    //     return Promise.reject('请输入班级');
    //   }
    //   return Promise.resolve();
    // };

    //电话输入规则
    let contactTelRule = (rule, value) => {
      let reg = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
      if(value.length != 0) {
        if ( !(reg.test(value) ) ) {
          return Promise.reject('电话格式有误');
        }
      }
      return Promise.resolve();
    };

    //密码输入规则
    let passwordRule = async (rule, value) => {
      if (!value) {
        return Promise.reject('请输入注册密码');
      }
      let reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{5,20}$/;
      if ( !(reg.test(value) && value.length >= 5 && value.length <= 20) ) {
        return Promise.reject('5-20位密码，必须包括数字和字母');
      }
      return Promise.resolve();
    };

    //确认密码输入规则
    let password2Rule = async (rule, value) => {
      if (!value) {
        return Promise.reject('请再次输入密码');
      }
      let reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{5,20}$/;
      if ( !(reg.test(value) && value.length >= 5 && value.length <= 20) ) {
        return Promise.reject('5-20位密码，必须包括数字和字母');
      }

      if (value === this.form.password) {
        return Promise.resolve();
      }
      return Promise.reject('两次输入密码不一致');
    };

    //邮箱输入规则
    let emailRule = async (rule, value) => {
      if (!value) {
        this.ruleFlag.emailRuleFlag = false;
        return Promise.reject('请输入邮箱');
      }
      let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if ( !(reg.test(value)) ) {
        this.ruleFlag.emailRuleFlag = false;
        return Promise.reject('邮箱格式有误');
      }
      return Promise.resolve();
    };

    //验证码输入规则
    let codeRule = async (rule, value) => {
      if (!value) {
        return Promise.reject('请输入邮箱验证码');
      }
    };

    return {
      //规则标识flag
      ruleFlag:{
        studentIdRuleFlag:false,
        emailRuleFlag:false,
        codeFlag:false,
      },

      // 表单数据
      form: {
        studentId:'',
        name:'',
        collegeId:'',
        major:'',
        grade:'',
        classGrade:'',
        contactTel:'',
        studentType:'',
        password:'',
        password2:'',
        email: '',
        code: ''
      },

      //其他数据
      demo: {
        SendCode_text: '获取验证码',
        timer: null,
        time_count: 60,
        roleId: 10,
        userId: '',
        deleted: 0,
        email_verified: 0,
        state: 0
      },

      // 表单验证规则
      rules: {
        studentId: [
          {required: true, validator: studentIdRule, trigger: 'blur'}
        ],
        name: [
          {required: true, validator: nameRule, trigger: 'blur'}
        ],
        collegeId: [
          {required: true, validator: collegeIdRule, trigger: 'blur'}
        ],
        major: [
          {required: true, validator: majorRule, trigger: 'blur'}
        ],
        grade: [
          {required: true, validator: gradeRule, trigger: 'blur'}
        ],
        classGrade: [
          {required: false, trigger: 'blur'}
        ],
        contactTel: [
          {required: false, validator: contactTelRule, trigger: 'blur'}
        ],
        password: [
          {required: true, validator: passwordRule, trigger: 'blur'}
        ],
        password2: [
          {required: true, validator: password2Rule, trigger: 'blur'}
        ],
        email: [
          {required: true, validator: emailRule, trigger: 'blur'}
        ],
        code: [
          {required: true, validator: codeRule, trigger: 'blur'}
        ],
        studentType: [
          {required: true}
        ]
      }
    }
  },
  methods: {
    /*学号唯一性验证*/
    studentIdBlur() {
      UserService.getUserEidById(this.form.studentId).then((res) => {
        if (res.data != -1) {
          this.ruleFlag.studentIdRuleFlag = true;
        } else {
          this.ruleFlag.studentIdRuleFlag = false;
          VXETable.modal.message({content: `该学号已注册`, status: 'error'});
        }
      })
       .catch(error => {
         console.log(error);
         VXETable.modal.message({content: `加载数据出错之学号，原因是：${error.message}`, status: 'error'});
       })
    },

    /*邮箱唯一性验证*/
    emailBlur() {
      this.hjl
      UserService.getUserEidByEmail(this.form.email).then((res) => {
        if (res.data == -1) {
          this.ruleFlag.emailRuleFlag = true;
        } else {
          this.ruleFlag.emailRuleFlag = false;
          VXETable.modal.message({content: `该邮箱已注册`, status: 'error'});
        }
      })
        .catch(error => {
          console.log(error);
          VXETable.modal.message({content: `加载数据出错之邮箱，原因是：${error.message}`, status: 'error'});
        })
    },

    /*验证验证码*/
    checkCode() {
      if(this.form.code.length != 0 ) {
        StudentInfoService.checkCode(this.form.code,this.form.email).then((res) => {
          if (res.data) {
            this.ruleFlag.codeFlag = true;
            this.demo.timer = true;
          } else {
            this.ruleFlag.codeFlag = false;
            VXETable.modal.message({content: `验证码有误`, status: 'error'});
          }
        }).catch(error => {
          VXETable.modal.message({content: `验证码出错，原因是：${error.message}`, status: 'error'});
        })
      }

    },

    /*发送验证码*/
    sendCheckCode() {
      if (!this.demo.timer) {
        this.demo.timer = setInterval(() => {
          if (this.demo.time_count > 0) {
            this.demo.time_count--;
            this.demo.SendCode_text = '重新发送' + this.demo.time_count + 's'
          } else {
            this.demo.SendCode_text = '获取验证码'
            clearInterval(this.demo.timer)
            this.demo.timer = null
            this.demo.time_count = 60
          }
        }, 1000);
      }
      //发送验证码
      if (this.demo.time_count === 60) {
        StudentInfoService.sendCheckCode(this.form.email).then(() => {
          //console.log(res.data);
          //TODO:为编辑准备.
        }).catch(error => {
          VXETable.modal.message({content: `发送验证码出错，原因是：${error.message}`, status: 'error'});
        })
      }
    },

    /*重置所填信息*/
    toReset() {
      location.reload();
    },

    /*提交信息*/
    onSubmit() {
      if(this.ruleFlag.studentIdRuleFlag==true && this.ruleFlag.emailRuleFlag==true && this.ruleFlag.codeFlag==true
          &&this.form.studentType.length!=0) {
        this.$refs.form.validate().then(() => {

          //检验学生表是否有重复的
          StudentInfoService.getStudentEid(this.form.studentId).then((respp) => {
            if (respp.data != -1) {
              //存入学生表
              StudentInfoService.saveStudentInfoMy(this.form.studentId, this.form.name, this.form.major,
                this.form.collegeId, this.form.grade, this.form.classGrade, this.form.contactTel,
                this.form.email,this.form.studentType).then((resp) => {
                console.log(resp);
                //存入user表
                UserService.userRegister(this.demo.deleted, this.form.email, this.demo.email_verified, this.form.studentId, this.form.password, this.demo.state, this.form.studentId).then((re) => {
                  console.log(re);
                  UserService.getUserEid(this.form.studentId).then((res) => {

                    //存入user_role表
                    UserService.insertBatchSingle(res.data, this.demo.roleId).then((ree) => {
                      console.log(ree);
                      VXETable.modal.message({content: '注册成功！', status: 'success'});

                      setTimeout(() => {
                        this.$router.push('/login');
                      }, 1500);

                    })
                      .catch(error => {
                        VXETable.modal.message({content: `加载数据出错之存入用户角色表1，原因是：${error.message}`, status: 'error'});
                      })

                  })
                    .catch(error => {
                      VXETable.modal.message({content: `加载数据出错点击后学号重复，原因是：${error.message}`, status: 'error'});
                    })
                })
                  .catch(error => {
                    VXETable.modal.message({content: `加载数据出错之存入用户表，原因是：${error.message}`, status: 'error'});
                  })
              })
                .catch(error => {
                  VXETable.modal.message({content: `加载数据出错之存入学生表，原因是：${error.message}`, status: 'error'});
                })
            } else {
              //修改学生表
              StudentInfoService.updateStudentInfoMy(this.form.studentId, this.form.name, this.form.major,
                this.form.collegeId, this.form.grade, this.form.classGrade, this.form.contactTel,
                this.form.email,this.form.studentType).then((ress) => {
                console.log(ress);

                //存入user表
                UserService.userRegister(this.demo.deleted, this.form.email, this.demo.email_verified, this.form.studentId, this.form.password, this.demo.state, this.form.studentId).then((re) => {
                  console.log(re);

                  UserService.getUserEid(this.form.studentId).then((resss) => {

                    //存入user_role表
                    UserService.insertBatchSingle(resss.data, this.demo.roleId).then((ree) => {
                      console.log(ree);
                      VXETable.modal.message({content: '注册成功！', status: 'success'});

                      setTimeout(function () {
                        this.$router.push('/login');
                      }, 1500);

                    })
                      .catch(error => {
                        VXETable.modal.message({content: `加载数据出错之存入用户角色表2，原因是：${error.message}`, status: 'error'});
                      })

                  })
                    .catch(error => {
                      VXETable.modal.message({content: `加载数据出错点击后学号重复，原因是：${error.message}`, status: 'error'});
                    })
                })
                  .catch(error => {
                    VXETable.modal.message({content: `加载数据出错之存入用户表，原因是：${error.message}`, status: 'error'});
                  })
              })
                .catch(error => {
                  VXETable.modal.message({content: `加载数据出错之修改学生表，原因是：${error.message}`, status: 'error'});
                })
            }

          })
            .catch(error => {
              VXETable.modal.message({content: `加载数据出错，原因是：${error.message}`, status: 'error'});
            })

        }).catch(() => {
          //VXETable.modal.message({content: `填写内容不全，请检查`, status: 'error'});
        });
      }
      else {
        VXETable.modal.message({content: `填写内容有误，请检查`, status: 'error'});
      }


    }

  }
}


</script>

<style scoped>
/*背景*/
.bigbody{
  background-image: url("~@/assets/CQNUImgs/rebg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.ele-body {
  padding-top: 60px;
  margin: auto;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
}
.card {
  width: 700px;
  height: 580px;
  margin: auto;
  padding: 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
}
.content {
  margin-top: -10px;
}

.form {
  margin-top: 25px;
  margin-left: -20px;
}

.buttons {
  margin-top: 10px;
  margin-left: 0px;
}
.btn {
  margin-top: -40px;
  margin-left: 20px;
  width: 80px; /* 宽度 */
  height: 40px; /* 高度 */
}
.submitbt {
  width: 110px;
  border-radius: 8px;
  position: absolute;
  margin-left: 170px;
  margin-top: -35px;
}
.clearbt {
  width: 110px;
  border-radius: 8px;
  position: absolute;
  margin-left: 30px;
  margin-top: -35px;
}

/* 底部版权 */
.login-copyright {
  color: #666972;
  text-align: center;

}

</style>
