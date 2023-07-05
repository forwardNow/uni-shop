<template>
  <view>
    <swiper class="swiper" :indicator-dots="true" :autoplay="false" :duration="500" :circular="true">
      <swiper-item class="swiper-item" v-for="(item, i) in goodsDetail.pics" :key="i" @click="preview(i)">
        <image class="swiper-image" :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      const { goods_id } = options;
      
      this.getGoodsDetail(goods_id);
    },
    data() {
      return {
        goodsDetail: {},
      }
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const { message: detail, meta: { status, msg } } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.goodsDetail = detail;
      },
      
      preview(i) {
        const { pics } = this.goodsDetail;
        const urls = pics.map((pic) => pic.pics_big);
        
        uni.previewImage({
          current: i,
          urls,
        });
      },
      
    }
  }
</script>

<style lang="scss">
.swiper {
  height: 750rpx;
  
  .swiper-item {
    
  }
  .swiper-image {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
