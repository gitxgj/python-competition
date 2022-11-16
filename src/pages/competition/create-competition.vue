<template>
  <div class="list-card">
    <!-- 搜索区域 -->
    <div class="list-card-operation">
      <t-button
        @click="
          formData = { ...INITIAL_DATA };
          formVisible = true;
          operation = 'create';
        "
        >创建比赛</t-button
      >
      <t-input v-model="searchValue" class="search-input" placeholder="请输入你需要搜索的内容" clearable>
        <template #suffix-icon>
          <search-icon v-if="searchValue === ''" size="20px" />
        </template>
      </t-input>
    </div>
    <!-- 卡片列表 -->
    <template v-if="pagination.total > 0 && !dataLoading">
      <div class="list-card-items">
        <t-row :gutter="[16, 16]">
          <t-col
            :lg="4"
            :xs="6"
            :xl="3"
            v-for="product in productList.slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current,
            )"
            :key="product.index"
          >
            <create-competition-card
              :product="product"
              @delete-item="handleDeleteItem"
              @manage-product="handleManageProduct"
            />
          </t-col>
        </t-row>
      </div>
      <div class="list-card-pagination">
        <t-pagination
          v-model="pagination.current"
          :total="pagination.total"
          :pageSizeOptions="[12, 24, 36]"
          :page-size.sync="pagination.pageSize"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </template>
    <div v-else-if="dataLoading" class="list-card-loading">
      <t-loading text="加载中..."></t-loading>
    </div>
    <!-- 产品管理弹窗 -->
    <t-dialog
      :header="operation === 'update' ? '修改赛事' : '创建赛事'"
      :visible.sync="formVisible"
      :width="680"
      :footer="false"
    >
      <div slot="body">
        <!-- 表单内容 -->
        <t-form :data="formData" ref="form" :rules="rules" @submit="onSubmit" :labelWidth="100">
          <!--          <t-form-item label="产品状态" name="status">-->
          <!--            <t-radio-group v-model="formData.status">-->
          <!--              <t-radio value="0">已停用</t-radio>-->
          <!--              <t-radio value="1">已启用</t-radio>-->
          <!--            </t-radio-group>-->
          <!--          </t-form-item>-->
          <t-form-item label="比赛类型" name="competitionId">
            <t-select v-model="formData.competitionId" clearable :style="{ width: '433px' }">
              <t-option v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="比赛开始时间" name="startDate">
            <t-date-picker
              v-model="formData.startDate"
              :style="{ width: '200px' }"
              theme="primary"
              mode="date"
              separator="/"
            />
            <t-timePicker v-model="formData.start" :style="{ width: '200px' }" theme="primary" />
          </t-form-item>
          <t-form-item label="比赛结束时间" name="endDate">
            <t-date-picker
              v-model="formData.endDate"
              :style="{ width: '200px' }"
              theme="primary"
              mode="date"
              separator="/"
            />
            <t-timePicker v-model="formData.end" :style="{ width: '200px' }" theme="primary" />
          </t-form-item>

          <t-form-item style="float: right">
            <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
            <t-button theme="primary" type="submit">确定</t-button>
          </t-form-item>
        </t-form>
      </div>
    </t-dialog>
    <!-- 删除操作弹窗 -->
    <t-dialog
      header="确认删除所选产品？"
      :body="confirmBody"
      :visible.sync="confirmVisible"
      @confirm="onConfirmDelete"
      :onCancel="onCancel"
    >
    </t-dialog>
  </div>
</template>
<script lang="ts">
import { prefix } from '@/config/global';
import { SearchIcon } from 'tdesign-icons-vue';
import CreateCompetitionCard from '../../components/product-card/create-competition-index.vue';

const INITIAL_DATA = {
  id: '',
  createUserId: '',
  start: '',
  end: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  competitionId: '',
};

export default {
  name: 'CreateCompetition',
  components: {
    CreateCompetitionCard,
    SearchIcon,
  },
  data() {
    return {
      operation: '',
      pagination: { current: 1, pageSize: 10, total: 0 },
      pageInfo: { current: 1, Size: 10 },
      prefix,
      productList: [],
      value: 'first',
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      bordered: true,
      hover: true,
      rowClassName: (rowKey) => `${rowKey}-class`,
      formData: { ...INITIAL_DATA },
      options: [
        { label: '入门挑战赛', value: 1 },
        { label: '菜鸟挑战赛', value: 2 },
        { label: '程序猿进阶赛', value: 3 },
        { label: '终极赛题目', value: 4 },
      ],
      formVisible: false,
      textareaValue: '',
      rules: {
        competitionId: [{ required: true, message: '请选择赛事类型', type: 'error' }],
        startDate: [{ required: true, message: '请输入开始时间', type: 'error' }],
        endDate: [{ required: true, message: '请输入结束时间', type: 'error' }],
      },
      searchValue: '',
      confirmVisible: false, // 控制确认弹窗
      deleteProduct: undefined,
      dataLoading: false,
    };
  },
  computed: {
    confirmBody(): string {
      const { deleteProduct } = this;
      return deleteProduct ? `删除后，${deleteProduct.competitionName}信息将被清空, 且无法恢复` : '';
    },
  },
  mounted() {
    if (sessionStorage.getItem('user') == null) {
      this.$message.error('用户未登录');
    } else {
      this.$message.success('查询成功');
    }
    this.formData.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    this.formData.createUserId = JSON.parse(sessionStorage.getItem('user')).id;
    this.initData();
  },
  methods: {
    initData() {
      this.dataLoading = true;
      this.$axiosPostWithQuery('competitionScheme/list', null, this.pageInfo).then((res) => {
        this.productList = res.result.data;
        this.pagination = {
          current: this.pageInfo.current,
          pageSize: this.pageInfo.Size,
          total: res.result.total,
        };
      });
      this.dataLoading = false;
    },
    onPageSizeChange(size: number): void {
      this.pagination.pageSize = size;
      this.pagination.current = 1;
    },
    onCurrentChange(current: number): void {
      this.pagination.current = current;
    },
    async onSubmit({ result, firstError }): void {
      if (!firstError && this.operation === 'create') {
        this.formData.createUserId = JSON.parse(sessionStorage.getItem('user')).id;
        this.formData.startTime = this.formData.startDate + ' ' + this.formData.start;
        this.formData.endTime = this.formData.endDate + ' ' + this.formData.end;
        await this.$axiosPost('competitionScheme/add', this.formData).then((res) => {
          if (res.status.success == true) {
            this.$message.success('提交成功');
            this.initData();
            this.formVisible = false;
          } else {
            this.$message.warning('提交失败');
          }
        });
      }

      if (!firstError && this.operation === 'update') {
        this.formData.startTime = this.formData.startDate + ' ' + this.formData.start;
        this.formData.endTime = this.formData.endDate + ' ' + this.formData.end;
        await this.$axiosPost('competitionScheme/update', this.formData).then((res) => {
          if (res.status.success == true) {
            this.$message.success('提交成功');
            this.initData();
            this.formVisible = false;
          } else {
            this.$message.warning('提交失败');
          }
        });
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
    async onConfirmDelete(): void {
      const { index } = this.deleteProduct;
      console.log(this.deleteProduct);
      await this.$axiosPost('competitionScheme/del', this.deleteProduct).then((res) => {
        if (res.status.success == true) {
          this.$message.success('删除成功');
        } else {
          this.$message.error('删除失败');
        }
      });
      this.productList.splice(index - 1, 1);
      this.confirmVisible = false;
    },
    onCancel(): void {
      this.deleteProduct = undefined;
      this.formData = {};
    },
    handleManageProduct(product) {
      this.operation = 'update';
      this.formVisible = true;
      this.formData.id = product.id;
      this.formData.createUserId = product.createUserId;
      this.formData.competitionId = product.competitionId;
      let starttime = product.startTime.split(' ');
      console.log(starttime);
      this.formData.startDate = starttime[0];
      this.formData.start = starttime[1];
      let endtime = product.endTime.split(' ');
      this.formData.endDate = endtime[0];
      this.formData.end = endtime[1];
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
