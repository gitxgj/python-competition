<template>
  <t-form
    ref="form"
    :class="['item-container', `register-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'phone'">
      <t-form-item name="userAccount">
        <t-input v-model="formData.userAccount" :maxlength="11" size="large" placeholder="请输入您的账号">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>
    </template>
    <template v-if="type == 'phone'">
      <t-form-item name="userName">
        <t-input v-model="formData.userName" :maxlength="11" size="large" placeholder="请输入您的用户名">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>
    </template>
    <template v-if="type == 'phone'">
      <t-form-item name="email">
        <t-input v-model="formData.email" :maxlength="11" size="large" placeholder="请输入您的邮箱">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <lock-on-icon />
        </template>
        <template #suffix-icon>
          <browse-icon v-if="showPsw" key="browse" @click="showPsw = !showPsw" />
          <browse-off-icon v-else key="browse-off" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>

  </t-form>
</template>
<script lang="ts">
import Vue from 'vue';
import { UserIcon, MailIcon, BrowseIcon, BrowseOffIcon, LockOnIcon } from 'tdesign-icons-vue';

const INITIAL_DATA = {
  userAccount:'',
  userName: '',
  email: '',
  password: '',
  verifyCode: '',
  checked: false,
};

const FORM_RULES = {
  userAccount: [{ required: true, message: '账号必填', type: 'error' }],
  userName: [{ required: true, message: '用户名必填', type: 'error' }],
  email: [{ required: true, email: true, message: '邮箱必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

/** 高级详情 */
export default Vue.extend({
  name: 'Register',
  components: {
    UserIcon,
    MailIcon,
    BrowseIcon,
    BrowseOffIcon,
    LockOnIcon,
  },
  data() {
    return {
      FORM_RULES,
      type: 'phone',
      emailOptions: [],
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
    onSubmit({ validateResult }: { validateResult: boolean }) {
      if (validateResult === true) {

        this.$axiosPost("user/register",this.formData).then(
          res =>{
            if (res.status.success===true){
              this.$message.success(res.status.message);
            }
            else{
              this.$message.success(res.status.message);
            }
          }
        )
        this.$emit('registerSuccess');
      }
    },
    switchType(val: 'email' | 'phone') {
      this.$refs.form.reset();
      this.type = val;
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
