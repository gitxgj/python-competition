<template>
  <div>
    <template>

      <t-space direction="vertical" >
        <t-card title="标题" actions="操作" header bordered hover-shadow>
          仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
        </t-card>
        <t-card title="标题" actions="操作" header bordered hover-shadow>
          仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
        </t-card>
        <t-card title="标题" actions="操作" header bordered hover-shadow>
          仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
        </t-card>
      </t-space>
    </template>
    <t-space direction="vertical">
      <t-radio-group v-model="asyncLoadingRadio" variant="default-filled">
        <t-radio-button value="load-more">加载更多</t-radio-button>
        <t-radio-button value="loading">加载中</t-radio-button>
        <t-radio-button value="loading-custom">自定义加载更多</t-radio-button>
        <t-radio-button value="">加载完成</t-radio-button>
      </t-radio-group>

      <t-list :async-loading="asyncLoading" @load-more="loadMore" split stripe size="large">
        <t-list-item v-for="i in listCount" :key="i">
          <t-list-item-meta :image="imageUrl" title="列表标题" description="列表内容的描述性文字"></t-list-item-meta>
        </t-list-item>
      </t-list>
    </t-space>
  </div>

</template>


<script>
export default {
  name: 'Forum',
  data() {
    return {
      asyncLoadingRadio: 'load-more',
      asyncLoading: 'load-more',
      listCount: 10,
      imageUrl: 'https://tdesign.gtimg.com/site/avatar.jpg',
    };
  },
  watch: {
    // 也可以使用插槽自定义加载内容
    asyncLoadingRadio(val) {
      if (val === 'loading-custom') {
        this.asyncLoading = () => " 没有更多数据了 "
      } else {
        this.asyncLoading = this.asyncLoadingRadio;
      }
    },
  },
  methods: {
    // 点击加载更多，状态切换为「加载中」
    loadMore() {
      this.asyncLoadingRadio = 'loading';
    },
  },
};
</script>
