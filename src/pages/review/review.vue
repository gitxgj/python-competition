<template>
  <div>
    <div class="secondary-notification">
      <t-tabs v-model="tabValue">
        <t-tab-panel v-for="(tab, tabIndex) in TAB_LIST" :key="tabIndex" :value="tab.value" :label="tab.label">
          <t-list v-if="msgDataList.length > 0" class="secondary-msg-list" :split="true">
            <t-list-item v-for="(item, index) in msgDataList" :key="index">
              <p :class="['content', { unread: item.pass }]" @click="setReadStatus(item)">
                <t-tag
                  size="small"
                  :theme="NOTIFICATION_TYPES[item.reviewUserId === null ? 'high' : 'low']"
                  variant="light"
                >
                  {{ item.reviewUserId === null ? '未评审' : '已评审' }}
                </t-tag>
                {{ '试卷编号:' + item.id }}
              </p>
              <p></p>
              <template #action>
                <span class="msg-date">{{ '提交人：' + item.commonUserId }}</span>
                <div class="msg-action">
                  <t-tooltip class="set-read-icon" :overlay-style="{ margin: '6px' }" content="查看">
                    <span class="msg-action-icon" @click="setReadStatus(item)">
                      <queue-icon v-if="!!item.status" size="16px" />
                      <chat-icon v-else />
                    </span>
                  </t-tooltip>
                  <t-tooltip content="审批" :overlay-style="{ margin: '6px' }">
                    <span @click="handleClickDeleteBtn(item)">
                      <edit1-icon size="16px" />
                    </span>
                  </t-tooltip>
                </div>
              </template>
            </t-list-item>
          </t-list>

          <div v-else class="secondary-msg-list__empty-list">
            <img src="https://tdesign.gtimg.com/pro-template/personal/nothing.png" alt="空" />
            <p>暂无通知</p>
          </div>
          <t-pagination
            v-model="pagination.current"
            :total="pagination.total"
            :pageSizeOptions="[3, 16, 24]"
            :page-size.sync="pagination.pageSize"
            @page-size-change="onPageSizeChange"
            @current-change="onCurrentChange"
          />
        </t-tab-panel>
      </t-tabs>
    </div>
    <t-dialog
      header="删除通知"
      :body="`确认删除通知：${selectedItem && selectedItem.content}吗？`"
      :visible.sync="visible"
      :onConfirm="deleteMsg"
    ></t-dialog>
  </div>
</template>
<script lang="ts">
import { mapState, mapGetters } from 'vuex';
import { QueueIcon, DeleteIcon, ChatIcon, Edit1Icon } from 'tdesign-icons-vue';
import { prefix } from '@/config/global';
import { NOTIFICATION_TYPES } from '@/constants';
import { msgDataItem } from '@/store/modules/review-record';

const TAB_LIST = [
  {
    label: '全部评审记录',
    value: 'msgData',
  },
  {
    label: '未评审记录',
    value: 'unreadMsg',
  },
  {
    label: '已评审记录',
    value: 'readMsg',
  },
];

export default {
  name: 'DetailSecondary',
  components: {
    QueueIcon,
    Edit1Icon,

    ChatIcon,
  },
  data() {
    return {
      pagination: { current: 1, pageSize: 8, total: 0 },
      pageInfo: { current: 1, Size: 10 },
      NOTIFICATION_TYPES,
      TAB_LIST,
      prefix,
      data: [],
      tabValue: 'msgData',
      msgData: [],
      unreadMsg: [],
      readMsg: [],
      visible: false,
      selectedItem: undefined,
    };
  },

  computed: {
    msgDataList() {
      if (this.tabValue === 'msgData') return this.msgData;
      if (this.tabValue === 'unreadMsg') return this.unreadMsg;
      if (this.tabValue === 'readMsg') return this.readMsg;
      return [];
    },
  },
  mounted() {
    this.initAllReview();
  },
  methods: {
    initAllReview() {
      this.$axiosPostWithQuery('reviewRecord/list', null, this.pageInfo).then((res) => {
        this.msgData = res.result.data.records;
        this.pagination.current = this.pageInfo.current;
        this.pagination.pageSize = this.pageInfo.Size;
        this.pagination.total = res.result.total;
      });
    },
    onCurrentChange(current: number): void {
      this.pagination.current = current;
      this.pageInfo = {
        current,
        Size: this.pagination.pageSize,
      };
      this.initAllReview();
    },
    onPageSizeChange(size: number): void {
      this.pageInfo = {
        current: 1,
        Size: size,
      };
      this.initAllReview();
    },
    onSubmit({ result, firstError }): void {
      if (!firstError) {
        this.$message.success('提交成功');
        this.formVisible = false;
      } else {
        console.log('Errors: ', result);
        this.$message.warning(firstError);
      }
    },
    initUnreadReview() {},
    initReadReview() {},
    handleClickDeleteBtn(item: msgDataItem): void {
      this.visible = true;
      this.selectedItem = item;
    },
    async setReadStatus(item: msgDataItem): void {
      const routeUrl = this.$router.replace({
        path: '/review/ReviewDetail',
        query: { id: item.id },
      });
      await window.open(routeUrl.href, '_self');
    },
    deleteMsg(): void {
      const item = this.selectedItem;
      const changeMsg = this.msgData;
      changeMsg.forEach((e, index) => {
        if (e.id === item.id) {
          changeMsg.splice(index, 1);
        }
      });
      this.visible = false;
      this.$store.commit('notification/setMsgData', changeMsg);
    },
  },
};
</script>
<style lang="less" scoped>
@import '../detail/secondary/index';
</style>
