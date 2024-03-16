<template>
  <div :class="['login-wrapper', ['', 'login-form-right', 'login-form-left'][direction]]">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      layout="vertical"
      class="login-form ele-bg-white">
      <h4>忘记密码</h4>
      <a-form-item name="email">
        <a-input
          placeholder="请输入绑定邮箱"
          v-model:value="form.email"
          allow-clear
          size="large"
          @blur="blurEmail">
          <template #prefix>
            <MailOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          placeholder="请输入新的登录密码"
          v-model:value="form.password"
          size="large">
          <template #prefix>
            <lock-outlined/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="password2">
        <a-input-password
          placeholder="请再次输入登录密码"
          v-model:value="form.password2"
          size="large">
          <template #prefix>
            <key-outlined/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="code">
        <div class="login-input-group">
          <a-input
            placeholder="请输入验证码"
            v-model:value="form.code"
            allow-clear
            size="large">
            <template #prefix>
              <safety-certificate-outlined/>
            </template>
          </a-input>
          <a-button
            class="login-captcha"
            :disabled="!!countdownTimer"
            :loading="codeLoading"
            @click="sendCheckCode">
            <span v-if="!countdownTimer">发送验证码</span>
            <span v-else>已发送 {{ countdownTime }} s</span>
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <router-link
          to="/login"
          class="ele-pull-right"
          style="line-height: 22px;">返回登录
        </router-link>
      </a-form-item>
      <a-form-item>
        <a-button
          block
          size="large"
          type="primary"
          :loading="loading"
          @click="doSubmit()">修改密码
        </a-button>
      </a-form-item>
    </a-form>
    <div class="login-copyright">copyright © 2021 重庆师范大学 ICDIO项目组 all rights reserved.</div>
  </div>
  <!-- 编辑弹窗 -->
  <!--  <a-modal-->
  <!--    :width="340"-->
  <!--    :footer="null"-->
  <!--    title="发送验证码"-->
  <!--    v-model:visible="showImgCode">-->
  <!--    <div-->
  <!--      class="login-input-group"-->
  <!--      style="margin-bottom: 16px;">-->
  <!--      <a-input-->
  <!--        v-model:value="imgCode"-->
  <!--        placeholder="请输入图形验证码"-->
  <!--        allow-clear-->
  <!--        size="large"/>-->
  <!--      <a-button class="login-captcha">-->
  <!--        <img-->
  <!--          alt=""-->
  <!--          :src="captcha"-->
  <!--          @click="changeImgCode"/>-->
  <!--      </a-button>-->
  <!--    </div>-->
  <!--    <a-button-->
  <!--      block-->
  <!--      size="large"-->
  <!--      type="primary"-->
  <!--      :loading="codeLoading"-->
  <!--      @click="sendCheckCode">立即发送-->
  <!--    </a-button>-->
  <!--  </a-modal>-->
  <!-- 实际项目去掉这段 -->
  <div style="position: absolute;right: 30px;top: 20px;">
    <a-radio-group v-model:value="direction" size="small">
      <a-radio-button :value="2">居左</a-radio-button>
      <a-radio-button :value="0">居中</a-radio-button>
      <a-radio-button :value="1">居右</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
import {
  LockOutlined,
  KeyOutlined,
  SafetyCertificateOutlined, MailOutlined
} from '@ant-design/icons-vue';
import {UserService} from "@/views/login/UserService";
import {VXETable} from "vxe-table";
import {StudentInfoService} from "@/views/ams/studentEntity/studentInfo/studentInfoService";
import {message} from "ant-design-vue";

export default {
  name: 'Forget',
  components: {
    MailOutlined,
    LockOutlined,
    KeyOutlined,
    SafetyCertificateOutlined
  },
  data() {

    let PswRule = async (rule, value) => {
      if (!value) {
        return Promise.reject('请输入新密码');
      }
      let reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{5,20}$/;
      if ( !(reg.test(value) && value.length >= 5 && value.length <= 20) ) {
        return Promise.reject('密码至少包含数字跟字母，长度5-20');
      }
      return Promise.resolve();
    };

    let rePswRule = async (rule, value) => {
      if (!value) {
        return Promise.reject('请再次输入新密码');
      }
      let reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{5,20}$/;
      if ( !(reg.test(value) && value.length >= 5 && value.length <= 20) ) {
        return Promise.reject('密码至少包含数字跟字母，长度5-20');
      }
      if (value === this.form.password) {
        return Promise.resolve();
      }
      return Promise.reject('两次输入密码不一致');
    };
    return {
      // 登录框方向, 0居中, 1居右, 2居左
      direction: 0,
      // 加载状态
      loading: false,
      // 表单数据
      form: {
        email: '',
        password: '',
        password2: '',
        code: ''
      },
      // 表单验证规则
      rules: {
        email: [
          {required: true, message: '请输入绑定邮箱', type: 'string', trigger: 'blur'}
        ],
        password: [
          {required: true, validator: PswRule, trigger: 'blur'}
        ],
        password2: [
          {required: true, validator: rePswRule, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', type: 'string', trigger: 'blur'}
        ]
      },
      // 用于刷新验证码
      v: new Date().getTime(),
      // 是否显示图形验证码弹窗
      // showImgCode: false,
      // 图形验证码
      imgCode: '',
      // 发送验证码按钮loading
      codeLoading: false,
      // 验证码倒计时时间
      countdownTime: 30,
      // 验证码倒计时定时器
      countdownTimer: null,
      sendAgain: true,
      flag: false,
      emailFlag:false
    };
  },
  computed: {
    // 图形验证码地址
    captcha() {
      return 'https://eleadmin.com/assets/captcha?v=' + this.v;
    }
  },
  methods: {
    blurEmail() {
      let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let value = this.form.email;
      if (reg.test(value)) {
        this.emailFlag = true;
        //验证邮箱在user表的唯一性
        UserService.getUserEidByEmail(this.form.email).then((res) => {
          if (res.data != -1) {
            this.emailFlag = true;
          } else {
            this.emailFlag = false;
            VXETable.modal.message({content: `该邮箱还未注册`, status: 'error'});
          }
        })
          .catch(error => {
            VXETable.modal.message({content: `加载数据出错之邮箱，原因是：${error.message}`, status: 'error'});
          })
      } else {
        this.emailFlag = false;
        return Promise.reject('邮箱格式有误');
      }
    },
    /* 提交 */
    doSubmit() {
      this.$refs.form.validate().then(() => {
        debugger
        this.loading = true;
        //验证码是否匹配
        if(this.emailFlag == true) {
          StudentInfoService.checkCode(this.form.code,this.form.email).then((res) => {
            if (res.data) {
              this.flag = true;
              if (this.flag) {
                // debugger

                UserService.updatePassword(this.form.email, this.form.password).then((res) => {
                  console.log(res.data);
                  //TODO:为编辑准备.
                }).catch(error => {
                  VXETable.modal.message({content: `保存密码出错，原因是：${error.message}`, status: 'error'});
                })

                setTimeout(() => {
                  this.$message.success('密码修改成功');
                  this.$router.push('/login');
                }, 1000);
              }
            } else {
              message.warn("验证码出错，请重新填写");
              this.loading = false;
            }
            //TODO:为编辑准备.


          }).catch(error => {
            VXETable.modal.message({content: `发送验证码出错，原因是：${error.message}`, status: 'error'});
          })
        } else {
          VXETable.modal.message({content: `该邮箱还未注册不能修改密码`, status: 'error'});
          this.loading = false;
        }

      }).catch(() => {
      });
    },
    /* 更换图形验证码 */
    changeImgCode() {
      // 这里演示的验证码是后端地址直接是图片的形式, 如果后端返回base64格式请参考登录页面
      this.v = new Date().getTime();
    },
    /* 显示发送邮箱验证码弹窗 */
    // showImgCodeCheck() {
    //   if (!this.form.email) {
    //     this.$message.error('请输入邮箱');
    //     return;
    //   }
    //   this.imgCode = '';
    //   this.changeImgCode();
    //   this.showImgCode = true;
    // },
    /* 发送邮箱验证码 */
    sendCheckCode() {
      // if (!this.imgCode) {
      //   this.$message.error('请输入图形验证码');
      //   return;
      // }
      this.codeLoading = true;

      StudentInfoService.sendCheckCode(this.form.email).then((res) => {
        console.log(res.data);
        //TODO:为编辑准备.
      }).catch(error => {
        VXETable.modal.message({content: `发送验证码出错，原因是：${error.message}`, status: 'error'});
      })
      setTimeout(() => {
        this.$message.success('短信验证码发送成功, 请注意查收!');
        // this.showImgCode = false;
        this.codeLoading = false;
        this.startCountdownTimer();
      }, 1000);
    },
    /* 开始对按钮进行倒计时 */
    startCountdownTimer() {
      this.countdownTime = 40;
      this.countdownTimer = setInterval(() => {
        if (this.countdownTime <= 1) {
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
        }
        this.countdownTime--;
      }, 1000);
    }
  },
  unmounted() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }
}
</script>

<style scoped>
/* 背景 */
.login-wrapper {
  padding: 48px 16px 0 16px;
  position: relative;
  box-sizing: border-box;
  background-image: url("~@/assets/bg-login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.login-wrapper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .2);
}

/* 卡片 */
.login-form {
  width: 360px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 28px 16px 28px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  position: relative;
  z-index: 2;
}

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

.login-form h4 {
  padding: 22px 0;
  text-align: center;
}

/* 验证码 */
.login-input-group {
  display: flex;
  align-items: center;
}

.login-input-group :deep(.ant-input-affix-wrapper) {
  flex: 1;
}

.login-input-group .login-captcha {
  width: 102px;
  height: 40px;
  margin-left: 10px;
  padding: 0;
}

.login-input-group .login-captcha > img {
  width: 100%;
  height: 100%;
}

/* 第三方登录图标 */
.login-oauth-icon {
  color: #fff;
  padding: 5px;
  margin: 0 12px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

/* 底部版权 */
.login-copyright {
  color: #eee;
  text-align: center;
  padding: 48px 0 22px 0;
  position: relative;
  z-index: 1;
}

/* 响应式 */
@media screen and (min-height: 640px) {
  .login-wrapper {
    padding-top: 0;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -230px;
  }

  .login-form-right .login-form,
  .login-form-left .login-form {
    left: auto;
    right: 15%;
    transform: translateX(0);
    margin: -230px auto auto auto;
  }

  .login-form-left .login-form {
    right: auto;
    left: 15%;
  }

  .login-copyright {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .login-form-right .login-form,
  .login-form-left .login-form {
    left: 50%;
    right: auto;
    margin-left: 0;
    margin-right: auto;
    transform: translateX(-50%);
  }
}
</style>
