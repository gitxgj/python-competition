<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="userAccount">
        <t-input v-model="formData.userAccount" size="large" placeholder="请输入账号：admin">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          key="password"
          placeholder="请输入登录密码：admin"
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
          <template #suffix-icon>
            <browse-icon v-if="showPsw" @click="showPsw = !showPsw" key="browse" />
            <browse-off-icon v-else @click="showPsw = !showPsw" key="browse-off" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>记住账号</t-checkbox>
        <span class="tip">忘记账号？</span>
      </div>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>

    <div class="switch-container">
      <span v-if="type !== 'password'" class="tip" @click="switchType('password')">使用账号密码登录</span>
    </div>
  </t-form>
</template>
<script lang="ts">
import Vue from 'vue';

import QrcodeVue from 'qrcode.vue';
import { UserIcon, LockOnIcon, BrowseOffIcon, BrowseIcon, RefreshIcon } from 'tdesign-icons-vue';

const INITIAL_DATA = {
  phone: '',
  userAccount: 'admin',
  userName: 'admin',
  password: 'admin',
  verifyCode: '',
  checked: false,
};

const FORM_RULES = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  userAccount: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};
/** 高级详情 */
export default ({
  name: 'Login',
  components: {
    QrcodeVue,
    UserIcon,
    LockOnIcon,
    BrowseOffIcon,
    BrowseIcon,
    RefreshIcon,
  },
  data() {
    return {
      FORM_RULES,
      type: 'password',

      formData: { ...INITIAL_DATA },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  },
  methods: {
    switchType(val) {
      this.type = val;
      this.$refs.form.reset();
    },
    async onSubmit({ validateResult }) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that= this
      let resp ;
      if (validateResult === true) {
        await that.$axiosPost("/user/login",this.formData).then(
           res =>{
             resp=res;
          }
        )
       if (resp.status.code==='0'){
         await this.$message.success(resp.status.message);
         await window.sessionStorage.setItem("user",JSON.stringify(resp.result));
         await that.$store.dispatch('user/login', that.formData);
        }else {
          this.$message.error(resp.status.message);
        }

        this.$router.replace('/').catch(() => '');
      }
    },
    handleCounter() {
      this.countDown = 60;
      this.intervalTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown -= 1;
        } else {
          clearInterval(this.intervalTimer);
          this.countDown = 0;
        }
      }, 1000);
    },
  },
});
</script>
