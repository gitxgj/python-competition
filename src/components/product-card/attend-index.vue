<template>
  <t-card theme="poster2"  :title=" product.competitionName " header-bordered>
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
    <template #status>
      <t-tag :theme= 'success' :disabled="false">{{
          '已启用'
        }}</t-tag>
    </template>
    <template #content>
      <p class="list-card-item_detail--name">规则如下</p>
      <p v-if="product.type===1||product.type===2" class="list-card-item_detail--desc">
        {{
          '客观题数量:'+product.questionNumber+'主观题数量：0'+
          '客观题每题'+product.choiceScore+'分'+
          '正确率:'+product.accuracyDemand+'通过'+
          '总分:'+product.totalScore+
          '考试时间:'+product.competitionTime
        }}</p>

      <p v-else class="list-card-item_detail--desc">
        {{
          '客观题数量:0   '+
          '主观题数量:'+product.questionNumber+
          '  主观题每题:'+product.subjectiveScore+'分'+
          '   正确率:'+product.accuracyDemand+'通过'+
          '   总分:'+product.totalScore+
          '   考试时间:'+product.competitionTime
        }}</p>
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
        :disabled="false"
        trigger="click"
        :options="[
          {
            content: '参赛',
            value: 'manage',
            onClick: () => handleManageProduct(product),
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
import {CalendarIcon, ServiceIcon, LaptopIcon, MoreIcon, AddIcon, ShopIcon, UserAvatarIcon} from 'tdesign-icons-vue';

export default {
  name: 'AttendListCard',
  components: {
    LaptopIcon,
    ShopIcon,
    CalendarIcon,
    ServiceIcon,
    UserAvatarIcon,

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
