<template>
  <t-card>
    <t-form
      ref="form"
      :data="formData"
      :rules="FORM_RULES"
      label-align="top"
      :label-width="100"
      @reset="onReset"
      @submit="onSubmit"
    >
      <div class="form-basic-container">
        <div class="form-basic-item">
          <div class="form-basic-container-title">新增用户</div>
          <!-- 表单内容 -->

          <t-row class="row-gap" :gutter="[16, 24]">

            <t-col :span="6">
              <t-form-item label="用户名" name="userName">
                <t-input v-model="formData.userName" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="用户角色" name="roleId">
                <t-select
                  v-model="formData.roleId"
                  :style="{ width: '322px' }"
                  placeholder="请选择角色类型"
                  class="demo-select-base"
                  clearable
                >
                  <t-option v-for="(item, index) in typeOptions" :key="index" :value="item.value" :label="item.label">
                    {{ item.label }}
                  </t-option>
                </t-select>
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="用户账号" name="userAccount">
                <t-input v-model="formData.userAccount" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="密码" name="password">
                <t-input type="password" v-model="formData.password" :style="{ width: '322px' }" placeholder="请输入密码" />
              </t-form-item>
            </t-col>

            <!-- 合同收付类型 -->
            <t-col :span="8">
              <t-form-item label="性别" name="sex">
                <t-radio-group v-model="formData.sex">
                  <t-radio value="男"> 男 </t-radio>
                  <t-radio value="女"> 女 </t-radio>
                </t-radio-group>
                <span class="space-item" />
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="邮箱" name="email">
                <t-input v-model="formData.email" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>

          </t-row>

          <div class="form-basic-container-title form-title-gap">其它信息</div>

          <t-form-item label="备注" name="comment">
            <t-textarea v-model="formData.comment" :height="124" placeholder="请输入备注" />
          </t-form-item>

        </div>
      </div>

      <div class="form-submit-container">
        <div class="form-submit-sub">
          <div class="form-submit-left">
            <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交 </t-button>
            <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消 </t-button>
          </div>
        </div>
      </div>
    </t-form>
  </t-card>
</template>
<script>
import { prefix } from '@/config/global';

const INITIAL_DATA = {
  name: '',
  type: '',
  partyA: '',
  partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',
  payment: '1',
  amount: 0,
  comment: '',
  files: [],
};
const FORM_RULES = {
  userAccount: [{ required: true, message: '请输入账号', type: 'error' }],
  userName: [{ required: true, message: '请输入用户名', type: 'error' }],
  roleId: [{ required: true, message: '请选择用户角色', type: 'error' }],
  sex: [{ required: true, message: '请选择性别', type: 'error' }],
  email: [{ required: true, message: '请输入邮箱', type: 'error' }],
  password: [{ required: true, message: '请输入密码', type: 'error' }],
};

export default {
  name: 'UserCreate',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,
      typeOptions: [
        { label: '普通用户', value: '1' },
        { label: '评审用户', value: '2' },
        { label: '管理员用户', value: '3' },
      ],
      textareaValue: '',
      rules: {
        userAccount: [{ required: true, message: '请输入账号', type: 'error' }],
        userName: [{ required: true, message: '请输入用户名', type: 'error' }],
        roleId: [{ required: true, message: '请选择用户角色', type: 'error' }],
        sex: [{ required: true, message: '请选择性别', type: 'error' }],
        email: [{ required: true, message: '请输入邮箱', type: 'error' }],
        password: [{ required: true, message: '请输入密码', type: 'error' }],
      },
    };
  },
  methods: {
    handleFail({ file }) {
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
    beforeUpload(file) {
      if (!/\.(pdf)$/.test(file.name)) {
        this.$message.warning('请上传pdf文件');
        return false;
      }
      return true;
    },
    // 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
    formatResponse(res) {
      return { ...res, error: '上传失败，请重试', url: res.url };
    },
    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消新建');
    },
    onSubmit({ validateResult }) {


      if (validateResult === true) {

        this.$axiosPost('/user/register',this.formData).then(
          res =>{

            if (res.status.success==true){

              this.$message.success("新增成功");
            }else{
              this.$message.error(res.status.message);
            }
          }
        )
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '../form/base/index';
</style>
