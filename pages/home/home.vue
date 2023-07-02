<template>
  <view>
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getSwiperList();
    },
    
    data() {
      return {
        swiperList: [],
      };
    },
    
    methods: {
      async getSwiperList() {
        const { message: swiperList } = await uni.$http.get('/home/swiperdata');
        
        this.swiperList = swiperList;
      },
    },
  }
</script>

<style lang="scss">
.swiper {
  height: 330rpx;
}

.swiper-item {
  height: 100%;
  
  image {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
