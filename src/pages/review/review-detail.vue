<template>
  <div class="detail-advanced">
    <t-card title="当前进度" class="advanced-card">
      <t-steps :defaultCurrent="1" :current="activeForm" status="process">
        <t-step-item title="竞赛提交" content="已于12月21日提交"></t-step-item>
        <t-step-item title="竞赛评审" content="预计1～3个工作日"></t-step-item>
        <t-step-item title="完成" content=""></t-step-item>
      </t-steps>
    </t-card>

    <t-card title="基本信息" class="container-base-margin-top">
      <div class="info-block">
        <div v-for="(item, index) in baseInfoData" :key="index" class="info-item">
          <h1>{{ item.name }}</h1>
          <span
            :class="{
              ['inProgress']: item.type && item.type.value === 'inProgress',
              ['pdf']: item.type && item.type.value === 'pdf',
            }"
          >
            <i v-if="item.type && item.type.key === 'contractStatus'"></i>
            {{ item.value }}
          </span>
        </div>
      </div>
    </t-card>

    <t-dialog header="基本信息" :visible.sync="visible" @confirm="onConfirm">
      <div slot="body">
        <div class="dialog-info-block">
          <div v-for="(item, index) in baseInfoData" :key="index" class="info-item">
            <h1>{{ item.name }}</h1>
            <span
              :class="{
                ['inProgress']: item.type && item.type.value === 'inProgress',
                ['pdf']: item.type && item.type.value === 'pdf',
              }"
            >
              <i v-if="item.type && item.type.key === 'contractStatus'"></i>
              {{ item.value }}
            </span>
          </div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>
<script lang="ts">
import { TableChangeContext, TableChangeData, TableSort } from 'tdesign-vue';
import { OrderDescendingIcon, AddIcon } from 'tdesign-icons-vue';
import { prefix } from '@/config/global';
import model from '@/service/service-review-detail';
import Product from './components/Product.vue';

/** 高级详情 */
export default {
  name: 'ReviewDetail',
  components: { Product, OrderDescendingIcon, AddIcon },
  data() {
    return {
      data: [],
      prefix,
      activeForm: 0,
      updateCurrent: 0,
      columns: model.getTableColumns(),
      baseInfoData: model.getBaseInfoData(),
      bordered: true,
      hover: true,
      visible: false,
      pagination: {
        defaultPageSize: 10,
        total: 100,
        defaultCurrent: 1,
        pageSizeOptions: [],
      },
    };
  },
  async mounted() {
    // 模拟进度
    setInterval(() => {
      if (this.updateCurrent > 5) {
        this.updateCurrent = -1;
      }
      this.updateCurrent += 1;
    }, 2000);

    this.$request
      .get('/api/get-purchase-list')
      .then((res: { code: number; data: Record<string, any> }) => {
        if (res.code === 0) {
          const { list = [] } = res.data;
          this.data = list;
          this.pagination = {
            ...this.pagination,
            total: list.length,
          };
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
  methods: {
    initDate() {
      const recordId = this.id;
    },

    onAlertChange(val: string): void {
      console.log(val);
    },
    sortChange(val: TableSort): void {
      console.log(val);
    },
    rehandleChange(
      changeParams: TableChangeData,
      triggerAndData: TableChangeContext<Array<Record<string, string>>>,
    ): void {
      console.log('统一Change', changeParams, triggerAndData);
    },
    listClick(e: any): void {
      console.log(e);
      this.visible = true;
    },
    deleteClickOp(e: any): void {
      console.log(e, 'e');
      this.data.splice(e.rowIndex, 1);
    },
    onConfirm(): void {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import '../detail/advanced/index';
</style>
