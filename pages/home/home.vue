<template>
  <view>
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="handleClickNavItem(navItem)">
        <image class="nav-img" :src="item.image_src"></image>
      </view>
    </view>
    
  </view>
  
</template>

<script>
  export default {
    onLoad() {
      this.getSwiperList();
      this.getNavList();
    },
    
    data() {
      return {
        swiperList: [],
        navList: [],
      };
    },
    
    methods: {
      async getSwiperList() {
        const { message: list, meta: { status, msg } } = await uni.$http.get('/api/public/v1/home/swiperdata');
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.swiperList = list;
      },
      
      async getNavList() {
        const { message: list, meta: { status, msg } } = await uni.$http.get('/api/public/v1/home/catitems');
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.navList = list;
      },
      
      handleClickNavItem(navItem) {
        const { name, open_type, navigator_url } = navItem;
        
        // 分类
        if (open_type === 'switchTab' && navigator_url) {
          uni.switchTab({ url: navigator_url });
          return;
        }
        
        
      }
    },
  }
</script>

<style lang="scss">
.swiper {
  height: 330rpx;
  
  .swiper-item {
    height: 100%;
    
    image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}


.nav-list {
  display: flex;
  justify-content: space-around;
  
  margin: 32rpx 0;
  
  .nav-item {
    
  }
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
</style>
