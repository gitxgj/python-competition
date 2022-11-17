<template>
  <t-card theme="poster2">
    <template #avatar>
      <t-avatar size="56px">
        <template #icon>
          <shop-icon v-if="product.type === 1" />
          <calendar-icon v-if="product.type === 2" />
          <service-icon style="color: #10e51a" v-if="product.type === 3" />
          <close-circle-icon style="color: #fa051a" v-if="product.pass === 0" />
          <check-circle-icon style="color: #10e51a" v-if="product.pass === 1" />
          <user-avatar-icon v-if="product.type === 4" />
        </template>
      </t-avatar>
    </template>
    <template #status>
      <t-tag :theme="success" :disabled="false">{{ product.pass === 0 ? '未通过' : '已通过' }}</t-tag>
    </template>
    <template #content>
      <p class="list-card-item_detail--name">
        {{ '比赛编号：' + product.competitionSchemeId }} {{ '\t参赛者：' + product.userAccount }}
      </p>
      <p class="list-card-item_detail--name">{{ '得分：' + product.competitionScore }}</p>
      <p class="list-card-item_detail--desc" style="color: #10e51a" v-if="product.pass === 1">
        {{ '得分已转化成相应积分' }}
      </p>
      <p class="list-card-item_detail--desc" style="color: #d70c1d" v-if="product.pass === 0">
        {{ '比赛未通过，未获得积分' }}
      </p>
      <p class="list-card-item_detail--desc">{{ '考试时间：' + product.jionTime }}</p>
    </template>
    <template #footer>
      <t-avatar-group cascading="left-up" :max="2">
        <t-avatar>{{ typeMap[product.type - 1] }}</t-avatar>
        <t-avatar
        ><template #icon>
          <add-icon />
        </template>
        </t-avatar>
      </t-avatar-group>
    </template>
    <template #actions>
      <t-dropdown
        :disabled="!product.isSetup"
        trigger="click"
        :options="[
          {
            content: '管理',
            value: 'manage',
            onClick: () => handleManageProduct(product),
          },
          {
            content: '删除',
            value: 'delete',
            onClick: () => handleDeleteItem(product),
          },
        ]"
      >
        <t-button theme="default" :disabled="!product.isSetup" shape="square" variant="text">
          <more-icon />
        </t-button>
      </t-dropdown>
    </template>
  </t-card>
</template>
<script lang="ts">
import {
  ShopIcon,
  CalendarIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  ServiceIcon,
  UserAvatarIcon,
  LaptopIcon,
  MoreIcon,
  AddIcon,
} from 'tdesign-icons-vue';

export default {
  name: 'ListCard',
  components: {
    ShopIcon,
    CheckCircleIcon,
    CloseCircleIcon,
    CalendarIcon,
    ServiceIcon,
    UserAvatarIcon,
    LaptopIcon,
    MoreIcon,
    AddIcon,
  },
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return { typeMap: ['A', 'B', 'C', 'D'] };
  },
  methods: {
    handleManageProduct(product) {
      this.$emit('manage-product', product);
    },
    handleDeleteItem(product) {
      this.$emit('delete-item', product);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables';

.list-card-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &_detail {
    min-height: 140px;

    &--name {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 400;
      color: var(--td-text-color-primary);
    }

    &--desc {
      color: var(--td-text-color-secondary);
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 40px;
    }
  }
}
</style>
