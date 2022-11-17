<template>
  <div>
    <div v-if="this.$route.query.isPass === '1'" class="result-success">
      <check-circle-icon class="result-success-icon" />
      <div class="result-success-title">比赛通过</div>

      <div class="result-success-describe">点击查看详情查看具体情况</div>
      <div>
        <t-button @click="() => this.$router.push('/form/base')">返回首页</t-button>
        <t-button @click="() => this.$router.push('/detail/advanced')" theme="default">查看结果</t-button>
      </div>
    </div>
    <div v-if="this.$route.query.isPass === '0'" v-else class="result-fail">
      <error-circle-icon class="result-fail-icon" />
      <div class="result-fail-title">未通过</div>
      <div class="result-fail-describe">点击查看详情查看具体情况</div>
      <div>
        <t-button theme="default" @click="() => this.$router.push('/form/base')">返回首页</t-button>
        <t-button @click="() => this.$router.push('/detail/advanced')" theme="default">查看结果</t-button>
      </div>
    </div>
    <div v-if="this.$route.query.isPass === '2'" class="result-success">
      <check-circle-icon class="result-success-icon" />
      <div class="result-success-title">提交成功</div>

      <div class="result-success-describe">请等待评审</div>
      <div>
        <t-button @click="() => this.$router.push('/form/base')">返回首页</t-button>
        <t-button @click="() => this.$router.push('/detail/advanced')" theme="default">查看评审进度</t-button>
      </div>
    </div>
    <div v-if="this.$route.query.isPass === '3'" class="result-fail">
      <check-circle-icon class="result-fail-icon" />
      <div class="result-fail-title">提交失败</div>

      <div class="result-fail-describe">请联系管理员处理</div>
      <div>
        <t-button @click="() => this.$router.push('/form/base')">返回首页</t-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from 'tdesign-icons-vue';
import { ErrorCircleIcon } from 'tdesign-icons-vue';
export default {
  name: 'ResultSuccess',
  components: {
    CheckCircleIcon,
    ErrorCircleIcon,
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';
.result-fail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &-icon {
    font-size: 72px;
    color: var(--td-text-color-secondary);
  }

  &-title {
    margin-top: 28px;
    font-size: 20px;
    color: var(--td-text-color-primary);
    text-align: center;
    line-height: 28px;
    font-weight: 500;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: var(--td-text-color-secondary);
    line-height: 22px;
  }
  .t-button + .t-button {
    margin-left: @spacer;
  }
}
.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &-icon {
    font-size: 72px;
    color: var(--td-text-color-secondary);
  }
  &-title {
    margin-top: 28px;
    font-size: 20px;
    color: var(--td-text-color-primary);
    text-align: center;
    line-height: 28px;
    font-weight: 500;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: var(--td-text-color-secondary);
    line-height: 22px;
  }
}

.t-button + .t-button {
  margin-left: @spacer;
}
</style>
