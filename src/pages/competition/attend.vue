<template>
  <div class="list-card">
    <!-- 卡片列表 -->
    <template v-if="!dataLoading">
      <div class="list-card-items">
        <t-row :gutter="[4, 1]">
          <t-col :lg="4" :xs="6" :xl="3" v-for="product in productList" :key="product.index">
            <product-card @click="clickCard(product.id)" :product="product" @manage-product="handleManageProduct" />
          </t-col>
        </t-row>
      </div>
    </template>

    <t-card v-if="formVisible" :title="recentProduct.competitionName" class="container-base-margin-top">
      <t-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :hover="hover"
        rowKey="index"
        @sort-change="sortChange"
        @change="rehandleChange"
      >
        <template #op="slotProps">
          <a class="t-button-link" @click="listClick(slotProps)">参赛</a>
        </template>
        <order-descending-icon slot="op-column" />
      </t-table>
    </t-card>

    <t-dialog
      theme="warning"
      header="警示"
      body="确定参加比赛？点击后进入比赛，并开始记时。"
      :visible.sync="conformAttend"
      @confirm="onConfirm"
      :onClose="close3"
      :cancelBtn="null"
    />
  </div>
</template>
<script lang="ts">
import { prefix } from '@/config/global';
import { SearchIcon } from 'tdesign-icons-vue';
import ProductCard from '@/components/product-card/attend-index.vue';
import { TableSort } from 'tdesign-vue';
import model from '@/pages/competition/service-competition';
export default {
  inject: ['reload'],
  name: 'MyCompetition',
  components: {
    SearchIcon,
    ProductCard,
  },

  data() {
    return {
      conformAttend: false,
      pagination: { defaultCurrent: 1, defaultPageSize: 5, total: 0 },
      prefix,
      productList: [],
      recentProduct: {
        competitionName: '',
      },
      pageInfo: {
        Size: 10,
        current: 1,
      },
      data: [],
      columns: model.getTableColumns(),
      value: 'first',
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      bordered: true,
      hover: true,
      rowClassName: (rowKey) => `${rowKey}-class`,
      formData: {},
      formVisible: false,
      textareaValue: '',
      rules: {
        name: [{ required: true, message: '请输入产品名称', type: 'error' }],
      },
      searchValue: '',
      confirmVisible: false, // 控制确认弹窗
      deleteProduct: undefined,
      dataLoading: false,
      competitionListById: [],
      competitionAttendRow: null,
    };
  },
  computed: {
    confirmBody(): string {
      const { deleteProduct } = this;
      return deleteProduct ? `删除后，${deleteProduct.name}的所有产品信息将被清空, 且无法恢复` : '';
    },
  },
  mounted() {
    this.dataLoading = true;
    this.$axiosPostWithQuery('/competitionDetail/list', null, this.pageInfo).then((res) => {
      this.productList = res.result.data.records;
    });
    this.dataLoading = false;
  },
  methods: {
    clickCard(id) {
      alert('点击id=' + id);
      //todo 展示考试内容
    },
    onPageSizeChange(size: number): void {
      this.pagination.pageSize = size;
      this.pagination.current = 1;
    },
    onCurrentChange(current: number): void {
      this.pagination.current = current;
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
    async listClick(e) {
      this.competitionAttendRow = e;
      this.conformAttend = true;
    },
    onConfirm() {
      this.confirmAttend(this.competitionAttendRow, true);
    },

    async confirmAttend(e, flag) {
      const that = this;
      console.log(e);
      let routeUrl;
      if (flag == true) {
        if (e.row.competitionId == 1) {
          routeUrl = this.$router.resolve({
            path: '/competition/EasyCompetition',
            query: { id: 1, competitionSchemeId: e.row.id },
          });
        }
        if (e.row.competitionId == 2) {
          routeUrl = this.$router.resolve({
            path: '/competition/EasyCompetition',
            query: { id: 2, competitionSchemeId: e.row.id },
          });
        }
        if (e.row.competitionId == 3) {
          routeUrl = this.$router.resolve({
            path: '/competition/Brython',
            query: { id: 3, competitionSchemeId: e.row.id },
          });
        }
        if (e.row.competitionId == 4) {
          routeUrl = this.$router.resolve({
            path: '/competition/Brython',
            query: { id: 4, competitionSchemeId: e.row.id },
          });
        }
        window.open(routeUrl.href, '_blank');
      } else {
        return null;
      }
    },
    onClickCloseBtn(): void {
      this.formVisible = false;
      this.formData = {};
    },
    handleDeleteItem(product): void {
      this.confirmVisible = true;
      this.deleteProduct = product;
    },
    onConfirmDelete(): void {
      const { index } = this.deleteProduct;
      this.productList.splice(index - 1, 1);
      this.confirmVisible = false;
      this.$message.success('删除成功');
    },
    onCancel(): void {
      this.deleteProduct = undefined;
      this.formData = {};
    },

    rehandleChange(changeParams, triggerAndData): void {
      console.log('统一Change', changeParams, triggerAndData);
    },
    async handleManageProduct(product): void {
      this.$message.success('请选择参赛场次');
      this.formVisible = true;
      this.recentProduct.competitionName = product.competitionName;
      let pageInfo = {
        Size: 5,
        current: 1,
      };
      console.log(product);
      let param = {
        competitionId: product.id,
      };
      await this.$axiosPostWithQuery('competitionScheme/listByType', param, pageInfo).then((res) => {
        if (res.result.total === 0) {
          this.data = [];
          this.pagination.total = 0;
          this.pagination.defaultPageSize = pageInfo.Size;
          this.pagination.defaultCurrent = pageInfo.current;
        } else {
          this.data = res.result.data.records;
          this.pagination.total = res.result.total;
          this.pagination.defaultPageSize = pageInfo.Size;
          this.pagination.defaultCurrent = pageInfo.current;
        }
      });
    },
    sortChange(val: TableSort): void {
      console.log(val);
    },
    requestCompetitinon(product) {
      this.$axiosPostWithQuery('/', product).then((res) => {});
    },
  },
};
</script>
<style scoped lang="less">
.list-card-operation {
  display: flex;
  justify-content: space-between;

  .search-input {
    width: 360px;
  }
}

.list-card-items {
  margin: 14px 0 24px 0;
}
</style>
