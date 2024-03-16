<template>
  <div class="body">
    <div :class="['login-wrapper', ['', 'login-form-right', 'login-form-left'][direction]]">
      <div class="logo">
        <img class="logoimg" src="@/assets/CQNUImgs/logored.png">
      </div>
      <div class="bgdiv">
        <img class="bgimg" src="@/assets/CQNUImgs/img.png">
      </div>
      <div class="formdiv">
        <a-form
          ref="loginForm"
          :model="form"
          :rules="rules"
          layout="vertical"
          class="login-form">
          <h4>用户登录</h4>
          <a-form-item name="username" class="userform">
            <a-input
              placeholder="请输入登录账号"
              v-model:value="form.username"
              @keyup.enter="doSubmit()"
              allow-clear>
              <template #prefix>
                <user-outlined/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" class="passform">
            <a-input-password
              placeholder="请输入登录密码"
              v-model:value="form.password"
              @keyup.enter="doSubmit()">
              <template #prefix>
                <lock-outlined/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="code" v-show="rules.code.required">
            <div class="login-input-group">
              <a-input
                placeholder="请输入验证码"
                v-model:value="form.code"
                @keyup.enter="doSubmit()"
                allow-clear
                size="large">
                <template #prefix>
                  <safety-certificate-outlined/>
                </template>
              </a-input>
              <a-button class="login-captcha">
                <img
                  v-if="captcha"
                  :src="captcha"
                  alt=""
                  @click="changeCode"/>
              </a-button>
            </div>
          </a-form-item>
          <a-form-item class="passwordsform">
            <a-checkbox
              v-model:checked="form.remember">记住密码
            </a-checkbox>
            <router-link
              to="/forget"
              class="ele-pull-right"
              style="line-height: 22px;">忘记密码
            </router-link>
          </a-form-item>
          <a-form-item>
            <a-button
              block
              size="large"
              type="primary"
              :loading="loading"
              @keyup.enter="doSubmit()"
              @click="doSubmit"
              class="loginButton">
              {{ loading ? '登录中' : '登录' }}
            </a-button>

            <a-button
              block
              size="large"
              type="primary"
              class="stuRegisterButton">
              <router-link
                to="/stuRegister"
                style="line-height: 22px;">学生注册
              </router-link>
            </a-button>

          </a-form-item>

        </a-form>
      </div>

      <div class="login-copyright">Copyright © CQNU 计算机与信息科学学院-ICDIO实验室-DDD-Nu项目组</div>
    </div>

  </div>
</template>

<script>
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue';
import store from '@/store';

export default {
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
  },
  data() {
    return {
      // 登录框方向, 0居中, 1居右, 2居左
      direction: 0,
      // 加载状态
      loading: false,
      // 表单数据
      form: {
        username: '',
        password: '',
        code: '',
        remember: false
      },
      // 表单验证规则
      rules: {
        username: [
          {required: true, message: '请输入账号', type: 'string', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', type: 'string', trigger: 'blur'}
        ],
        code: [
          {required: false, message: '请输入验证码', type: 'string', trigger: 'blur'}
        ]
      },
      // 验证码base64数据
      captcha: '',
      // 验证码内容, 实际项目去掉
      text: ''
    };
  },
  mounted() {
    if (this.$setting.takeToken()) {
      this.goHome();
    }
    this.changeCode();
  },
  methods: {
    /* 提交 */
    doSubmit() {
      this.$refs.loginForm.validate().then(() => {
        this.loading = true;
        if (this.rules.code.required === true) {
          if (this.form.code.toLowerCase() !== this.text) {
            this.loading = false;
            this.$message.error('验证码错误');
            return;
          }
        }

        let formData = new FormData();
        for (let key in this.form) {
          formData.append(key, this.form[key]);
        }
        this.$http.post('/login', formData).then((res) => {
          // debugger
          this.loading = false;
          if (res.data.code === 0) {
            this.$message.success('登录成功');
            this.$store.dispatch('user/setToken', {
              token: res.data.access_token,
              remember: this.form.remember
            }).then(() => {
              //this.goHome();
              this.getUserInfo();
            });
          } else {
            this.loading = false;
            if (res.data.captchaStatus) {
              this.rules.code.required = true;
            }
            this.$message.error(res.data.msg);
          }
        }).catch((error) => {
          if (error.data.captchaStatus) {
            this.rules.code.required = true;
            this.changeCode();
          }
          this.loading = false;
          this.$message.error(error.message);
        });
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error.errorFields[0].errors);
      });
    },
    /* 获取当前用户信息 */
    getUserInfo() {
      console.log(process.env.VUE_APP_BASE_URL)
      console.log(process.env.VUE_SOCKET_BASE_URL)
      store.dispatch('user/getUser').then(() => {
        this.goHome();

        this.showContent = true;
      })

      // this.$http.get(setting.userUrl).then((res) => {
      //   const result = setting.parseUser ? setting.parseUser(res.data) : res.data;
      //
      //   if (result.code === 0) {
      //     const user = result.data;
      //     setting.loginUser(user);
      //     this.goHome();
      //   } else if (result.msg) {
      //     this.$message.error(result.msg);
      //   }
      //   // 在用户权限信息请求完成后再渲染主体部分, 以免权限控制指令不生效
      //   this.showContent = true;
      // }).catch((e) => {
      //   console.error(e);
      //   this.showContent = true;
      //   this.$message.error(e.message);
      // });
    },
    /* 跳转到首页 */
    goHome() {
      // const query = this.$route.query;
      // const path = query && query.from ? query.from : '/';
      // this.$router.push(path).catch(() => {
      // });
      this.$router.push('/dashboard/workplace')
    },
    /* 更换图形验证码 */
    changeCode() {
      this.form.code ="";
      // 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
      this.$http.get('/file/captcha?username=' + this.form.username).then(res => {
        if (res.data.code === 0) {
          this.captcha = res.data.data;
          // 实际项目后端一般会返回验证码的key而不是直接返回验证码的内容, 登录用key去验证, 你可以根据自己后端接口修改
          this.text = res.data.text;
          // 自动回填验证码, 实际项目去掉这个
          // this.form.code = this.text;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
.body{
  background: white;
}
/* 背景 */
.login-wrapper {
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
}
h4{
  font-size: 25px;
  letter-spacing: 5px;
}
.passwordsform{
  margin-top: -10px;
}
.userform{
  margin-top: 1px;
}

.passform{
  margin-top: 15px;
}

.login-wrapper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: inline-block;
}
/*重师logo*/
.logo{
  position:static;
  margin-top: 1%;
  margin-left: 18%;
  display: inline-block;
}
.logoimg{
  width: 100%;
  height: 100%;
}

/*重师背景*/
.bgdiv {
  position:static;
  margin-top: 1%;
  width: 100%;
  height: 100%;
  display: inline-block;
  z-index: -1;
}
.bgimg{
  width: 100%;
  height: 100%;
}

.login-form{
  width: 360px;
  height: 310px;
  background:rgba(255,255,255,0.8);
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 20px 17px 20px 30px;
  position: absolute;
  margin-top: -27%;
  margin-left: 60%;
  z-index: 2;
}

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

.login-form h4 {
  padding: 5px 0;
  text-align: center;
}

/* 验证码 */
.login-input-group {
  display: flex;
  align-items: center;
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


/* 底部版权 */
.login-copyright {
  color: #666972;
  text-align: center;
  padding: 48px 0 22px 0;
  position: relative;
  z-index: 1;
}

/*登录注册按钮*/
.loginButton{
  border-radius: 8px;
  width: 142px;
  height: 40px;
  margin-top: -0.5%;
}
.stuRegisterButton{
  border-radius: 8px;
  width: 142px;
  height: 40px;
  margin-left: 7%;
  margin-top: -0.5%;
}

/* 响应式 */
@media screen and (min-height: 640px) {
  .login-wrapper {
    padding-top: 0;
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
