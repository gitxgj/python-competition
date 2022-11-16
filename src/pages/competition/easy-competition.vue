<template>
  <div>
    <t-button type="submit" @click="testSubmit()">提交</t-button>
    <hr />
    <t-collapse>
      <t-collapse-panel
        v-for="(item, index) in choiceQuestionList"
        :key="index"
        :header="'题目' + numberToChinaNumber[parseInt(index)]"
      >
        <template #headerRightContent>
          <t-button v-if="item.choice != null && item.choice !== ''" theme="success" shape="circle">已答</t-button>
          <t-button v-if="item.choice == null || item.choice === ''" theme="warning" shape="circle">未答</t-button>
        </template>
        问题：{{ item.question }}
        <t-divider></t-divider>
        <t-space>
          <t-radio-group default-value="" v-model="item.choice" @change="onChange">
            <t-radio value="A">A.{{ item.choiceA }}</t-radio>
            <t-radio value="B">B.{{ item.choiceB }}</t-radio>
            <t-radio value="C">C.{{ item.choiceC }}</t-radio>
            <t-radio value="D">D.{{ item.choiceD }}</t-radio>
          </t-radio-group>
        </t-space>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script>
import axios from 'axios';
import { ViewModuleIcon, Edit1Icon, LayersIcon } from 'tdesign-icons-vue';
export default {
  inject: ['reload'],
  name: 'Brython',
  data() {
    return {
      choiceQuestionList: [],
      numberToChinaNumber: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    };
  },
  methods: {
    async testSubmit() {
      let routeUrl = this.$router.replace({
        path: '/result/success',
        query: { score: 90, isPass: 0 },
      });
      await window.open(routeUrl.href, '_self');
    },

    async onSubmit() {
      if (sessionStorage.getItem('user') == null) {
        await this.$message.error('登录已过期，请重新登录。');
        await this.$router.replace('/login');
      }
      let score = 0;
      for (let i = 0; i < this.choiceQuestionList.length; i++) {
        if (this.choiceQuestionList[i].answer === this.choiceQuestionList[i].choice) {
          score += 5;
        }
      }
      let isPass = 0;
      if (this.$route.query.id === '1') {
        if (score >= 40) {
          isPass = 1;
        }
      }
      if (this.$route.query.id === '2') {
        if (score >= 75) {
          isPass = 1;
        }
      }
      let now = new Date();
      let timeStr =
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1) +
        '-' +
        now.getDate() +
        ' ' +
        now.getHours() +
        ':' +
        now.getMinutes() +
        ':' +
        now.getSeconds();
      let params = {
        competitionSchemeId: this.$route.query.competitionSchemeId,
        competitionScore: score,
        jionTime: timeStr,
        pass: isPass,
        userAccount: JSON.parse(sessionStorage.getItem('user')).userAccount,
      };

      await this.$axiosPost('competitionRecord/add', params).then((res) => {
        if (res !== undefined && res.status.success === true) {
          this.$message.success('提交成功');
          let routeUrl = this.$router.resolve({
            path: '/result/success',
            query: { score: result },
          });
          window.open(routeUrl.href, '_self');
        } else {
          this.$message.error('提交失败');
        }
      });
    },
    onChange(checkedValues) {
      console.log('checkedValues:', this.value, checkedValues);
    },
    initData() {
      let questionType = 1; //todo 问题类型
      let param = {
        questionType: questionType,
      };
      this.$axiosPost('choiceQuestion/getQuestion', param).then((res) => {
        this.choiceQuestionList = res.result;
      });
      for (var i = 0; i < 10; i++) {
        this.choiceQuestionList.choice = '';
      }
    },

    onKeypress(value, e) {
      console.log('onKeypress: ', value, e);
    },
    onKeydown(value, e) {
      console.log('onKeydown: ', value, e);
    },
    onKeyup(value, e) {
      console.log('onKeyup: ', value, e);
    },
    onFocus(value, e) {
      console.log('onFocus: ', value, e);
    },
    onBlur(value, e) {
      console.log('onBlur: ', value, e);
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
