<template>
  <router-view :class="[mode]" />
</template>

<script>
import Vue from 'vue';
import config from '@/config/style';
import { axiosGet, axiosPost, axiosPostWithQuery } from './components/request/network.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$axiosGet = axiosGet;
Vue.prototype.$axiosPost = axiosPost;
Vue.prototype.$axiosPostWithQuery = axiosPostWithQuery;
export default Vue.extend({
  computed: {
    mode() {
      return this.$store.getters['setting/mode'];
    },
  },
  data() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {
    this.$store.dispatch('setting/changeTheme', { ...config });
  },
});
</script>
