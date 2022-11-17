<template>
  <div>
    <t-button type="submit" @click="onSubmit()">提交</t-button>
    <hr />
    <t-collapse>
      <t-collapse-panel header="题目一">
        {{ questionList.length === 0 ? '' : questionList[0].question }}
        <t-textarea
          v-model="question1"
          placeholder="请在此处输入本题代码"
          @keypress="onKeypress"
          @keydown="onKeydown"
          @keyup="onKeyup"
          @focus="onFocus"
          @blur="onBlur"
          :autosize="{ minRows: 10 }"
        />
      </t-collapse-panel>
      <t-collapse-panel header="题目二">
        {{ questionList.length === 0 ? '' : questionList[1].question }}
        <t-textarea
          v-model="question2"
          placeholder="请在此处输入本题代码"
          @keypress="onKeypress"
          @keydown="onKeydown"
          @keyup="onKeyup"
          @focus="onFocus"
          @blur="onBlur"
          :autosize="{ minRows: 10 }"
        />
      </t-collapse-panel>
      <t-collapse-panel header="编译器">
        <iframe
          src="src/pages/competition/js/index.html"
          id="qt"
          scrolling="no"
          frameborder="0"
          style="position: relative; top: 64px; left: 0px; right: 0px; bottom: 100px"
        ></iframe>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  inject: ['reload'],
  name: 'Brython',
  data() {
    return {
      result: '',
      question1: '',
      question2: '',
      questionList: [],
      questionAObject: {
        answer: '',
        id: '',
        question: '',
        questionType: '',
      },
      questionBObject: {
        answer: '',
        id: '',
        question: '',
        questionType: '',
      },
    };
  },
  methods: {
    onSubmit() {
      if (sessionStorage.getItem('user') == null) {
        this.$message.success('用户未登录！');
        return;
      }
      let param = {
        commonUserId: JSON.parse(sessionStorage.getItem('user')).id,
        id: 0,
        questionAId: this.questionList[0].id,
        questionBId: this.questionList[1].id,
        questionAAnswer: this.question1,
        questionBAnswer: this.question2,
      };

      this.$axiosPost('reviewRecord/add', param).then((res) => {
        if (res.status != null && res.status.success === true) {
          this.$message.success('提交成功！');
          let routeUrl = this.$router.replace({
            path: '/result/success',
            query: { score: -1, isPass: 2 },
          });
          window.open(routeUrl.href, '_self');
        } else {
          this.$message.error('提交失败');
          let routeUrl = this.$router.replace({
            path: '/result/success',
            query: { score: -2, isPass: 3 },
          });
          window.open(routeUrl.href, '_self');
        }
      });
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
    async loadingQuestion(e) {
      let questionType = {
        questionType: e,
        //todo 判断questioon是3还是4
      };
      await this.$axiosPost('subjectiveQuestion/getQuestion', questionType).then((res) => {
        this.questionList = res.result;
      });
    },
  },
  created() {
    this.loadingQuestion(3);
  },
  mounted() {
    /** @click="loadingQuestion(3)"
     * iframe-宽高自适应显示
     */

    function changeqtIframe() {
      const qt = document.getElementById('qt');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      qt.style.width = Number(deviceWidth) + 'px'; // 数字是页面布局宽度差值
      qt.style.height = Number(deviceHeight) + 'px'; // 数字是页面布局高度差
    }
    changeqtIframe();
    window.onresize = function () {
      changeqtIframe();
    };
  },
};
</script>
