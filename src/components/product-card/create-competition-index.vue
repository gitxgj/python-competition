<template>
  <t-card theme="poster2" :title=" product.competitionName " header-bordered>

    <template #avatar>
      <t-avatar size="56px">
        <template #icon>
          <shop-icon v-if="product.type === 1" />
          <calendar-icon v-if="product.type === 2" />
          <service-icon v-if="product.type === 3" />
          <user-avatar-icon v-if="product.type === 4" />
        </template>
      </t-avatar>
    </template>
    <template>

    </template>
    <template #status>
      <t-tag :theme= 'success' :disabled="false">{{
        '已启用'
      }}</t-tag>
    </template>
    <template #content>

<!--      <p class="list-card-item_detail&#45;&#45;name"></p>-->

      <p class="list-card-item_detail--name">{{ '赛事创建人：'+product.createUserId }}</p>
      <p class="list-card-item_detail--desc">{{
           '赛事开始时间：'+ product.startTime
        }}</p>
      <p class="list-card-item_detail--desc">{{
        '赛事结束时间：'+product.endTime

        }}</p>
    </template>

    <template #actions>
      <t-dropdown
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
        <t-button theme="default" :disabled="false" shape="square" variant="text">
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
  ServiceIcon,
  UserAvatarIcon,
  LaptopIcon,
  MoreIcon,
  AddIcon,
  ShareIcon, ChatIcon, ThumbUpIcon
} from 'tdesign-icons-vue';

export default {
  name: 'CreateCompetitionCard',
  components: {
    ShopIcon,
    CalendarIcon,
    ServiceIcon,
    UserAvatarIcon,
    LaptopIcon,
    MoreIcon,
    ThumbUpIcon,
    ChatIcon,
    ShareIcon,
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
