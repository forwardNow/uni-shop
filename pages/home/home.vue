<template>
  <view class="home-page">
    <!-- 搜索 -->
    <view class="search-box">
      <my-search @click="handleClickSearch"></my-search>
    </view>
    
    <!-- 轮播图 -->
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="handleClickNavItem(item)">
        <image class="nav-img" :src="item.image_src"></image>
      </view>
    </view>
    
    <!-- 楼层 -->
    <view class="floor-list">
      
      <view class="floor-item" v-for="(floor, floorIndex) in floorList" :key="floorIndex">
        
        <image class="floor-title" :src="floor.floor_title.image_src" mode="heightFix"></image>
        
        <view class="floor-img-box">
          
          <navigator class="floor-left-img-box" :url="getGoodsListPageUrl(floor.product_list[0])">
            <image class="floor-left-img" :src="floor.product_list[0].image_src" :style="{ width: `${floor.product_list[0].image_width}rpx` }" mode="widthFix"></image>
          </navigator>
          
          <view class="floor-right-img-box">
            
            <navigator v-for="(product, productIndex) in floor.product_list.slice(1)" :key="productIndex" :url="getGoodsListPageUrl(product)">
              <image class="floor-right-img" :src="product.image_src" :style="{ width: `${product.image_width}rpx` }" mode="widthFix"></image>
            </navigator>
            
          </view>
          
        </view>
        
      </view>
      
    </view>
    
  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList();
    },
    
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: [],
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
      
      async getFloorList() {
        const { message: list, meta: { status, msg } } = await uni.$http.get('/api/public/v1/home/floordata');
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.floorList = list;
      },
      
      handleClickNavItem(navItem) {
        const { name, open_type, navigator_url } = navItem;
        
        // 分类
        if (name === '分类') {
          uni.switchTab({ url: '/pages/cate/cate' });
          return;
        }
        
        
      },
      
      getGoodsListPageUrl(product) {
        // /pages/goods_list?query=服饰
        const { navigator_url } = product;
        
        // query=服饰
        const queryString = navigator_url.substr(navigator_url.indexOf('?') + 1);
        
        return `/subpkg/goods_list/goods_list?${queryString}`
      },
      
      handleClickSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search',
        })
      },
    },
  }
</script>

<style lang="scss">
.home-page {
  image {
    display: block;
  }
}

.swiper {
  height: 330rpx;
  
  .swiper-item {
    height: 100%;
    
    image {
      width: 100%;
      height: 100%;
    }
  }
}


.nav-list {
  display: flex;
  justify-content: space-around;
  
  margin: 32rpx 0;
  
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}


.floor-list {
  
  .floor-item {
    margin-bottom: 48rpx;
  }
  
  .floor-title {
    width: 100%;
    height: 60rpx;
  }
  
  .floor-img-box {
    display: flex;
  }
  
  .floor-left-img-box {
    padding-left: 16rpx;
  }
  .floor-left-img {
    
  }
  .floor-right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .floor-right-img {
    
  }
  
}

.search-box {
  z-index: 999;
  position: sticky;
  top: 0;
}
</style>
